"""Render the frozen synthetic assistant output. No AI or network calls."""
from pathlib import Path
from html import escape
from urllib.parse import urlsplit
import argparse
import hashlib
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]


def validate(data):
    if not isinstance(data, dict) or data.get('schema_version') != 1 or data.get('synthetic') is not True:
        raise ValueError('Expected synthetic strategy schema_version=1')
    base = urlsplit(data.get('base_url', ''))
    if base.scheme != 'https' or not base.hostname or base.username or base.password or base.query or base.fragment:
        raise ValueError('base_url must be HTTPS without credentials, query or fragment')
    pages = data.get('pages')
    if not isinstance(pages, list) or not pages:
        raise ValueError('pages must be a nonempty list')
    slugs = []
    for page in pages:
        if not isinstance(page, dict):
            raise ValueError('page must be an object')
        slug = page.get('slug')
        if not isinstance(slug, str) or (slug and not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', slug)):
            raise ValueError('Invalid page slug')
        slugs.append(slug)
        for key in ['label', 'intent', 'title', 'h1', 'description', 'intro', 'source']:
            if not isinstance(page.get(key), str) or not page[key].strip():
                raise ValueError('Missing page field: ' + key)
        if not isinstance(page.get('sections'), list) or not page['sections']:
            raise ValueError('Missing sections')
        for section in page['sections']:
            if not isinstance(section, dict) or not all(isinstance(section.get(k), str) and section[k].strip() for k in ['heading', 'text']):
                raise ValueError('Invalid section')
        if not isinstance(page.get('links'), list) or not all(isinstance(x, str) for x in page['links']):
            raise ValueError('Invalid links')
    if len(set(slugs)) != len(slugs) or '' not in slugs:
        raise ValueError('Need one home and unique slugs')
    if any(link not in slugs for page in pages for link in page['links']):
        raise ValueError('Unknown internal link')
    if len({p['title'] for p in pages}) != len(pages):
        raise ValueError('Duplicate titles')
    return data


def render(data):
    validate(data)
    base = data['base_url'].rstrip('/') + '/'
    out = {'assets/style.css': (ROOT / 'demo/source/style.css').read_text(encoding='utf-8')}
    by_slug = {p['slug']: p for p in data['pages']}
    urls = []
    for page in data['pages']:
        slug = page['slug']
        prefix = '../' if slug else './'
        def link(target):
            return prefix + (target + '/' if target else '')
        canonical = base + (slug + '/' if slug else '')
        urls.append(canonical)
        nav = ''.join(f'<a href="{link(p["slug"])}"' + (' aria-current="page"' if p['slug'] == slug else '') + f'>{escape(p["label"])}</a>' for p in data['pages'])
        sections = ''.join(f'<section><h2>{escape(s["heading"])}</h2><p>{escape(s["text"])}</p></section>' for s in page['sections'])
        related = ''.join(f'<a href="{link(target)}">{escape(by_slug[target]["label"])} <span aria-hidden="true">↗</span></a>' for target in page['links'])
        schema = json.dumps({'@context': 'https://schema.org', '@type': 'WebPage', 'name': page['title'], 'url': canonical, 'description': page['description'], 'inLanguage': 'it'}, ensure_ascii=False).replace('<', '\\u003c')
        art = '<div class="paper-work" aria-hidden="true"><div class="sheet sheet-back"></div><div class="sheet sheet-front"><span>Trama<br>Minuta</span><i></i></div><div class="thread"></div><span class="paper-note">Carta. Filo. Nuove storie.</span></div>' if not slug else ''
        h1 = '<br>'.join(escape(part) for part in page['h1'].split('\n'))
        out[(slug + '/' if slug else '') + 'index.html'] = f'''<!doctype html>
<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{escape(page['title'])}</title><meta name="description" content="{escape(page['description'], quote=True)}">
<meta name="robots" content="noindex,follow"><link rel="canonical" href="{escape(canonical, quote=True)}">
<link rel="stylesheet" href="{prefix}assets/style.css"><script type="application/ld+json">{schema}</script></head>
<body><a class="skip" href="#main">Vai al contenuto</a>
<aside class="demo-note" aria-label="Avviso demo">Attivita e localita inventate. Demo portfolio, nessun invio di dati.</aside>
<header><a class="brand" href="{prefix}">Trama Minuta<span>Rilegatura artigianale</span></a><nav aria-label="Navigazione principale">{nav}</nav></header>
<main id="main"><div class="hero {'home' if not slug else 'inner'}"><div class="hero-copy"><h1>{h1}</h1><p class="intro">{escape(page['intro'])}</p><a class="button" href="{link('richiesta') if slug != 'richiesta' else '#details'}">{'Prepara la richiesta' if slug != 'richiesta' else 'Leggi la traccia'} <span aria-hidden="true">↗</span></a></div>{art}</div>
<div class="sections" id="details">{sections}</div><nav class="related" aria-label="Approfondimenti">{related}</nav></main>
<footer><p class="footer-brand">Le cose fatte per restare.</p><p>Trama Minuta · Borgo Carta<br>Laboratorio immaginario. Nessun recapito reale.</p><a href="https://github.com/Flavio2702/seo-to-static-workflow/tree/main/demo">Dal brief a questo sito: esplora la demo</a></footer></body></html>
'''
    out['sitemap.xml'] = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(f'<url><loc>{escape(url)}</loc></url>\n' for url in urls) + '</urlset>\n'
    out['robots.txt'] = 'User-agent: *\nAllow: /\nSitemap: ' + base + 'sitemap.xml\n'
    return out


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    parser.add_argument('--strategy', type=Path, default=ROOT / 'demo/strategy.json')
    args = parser.parse_args()
    try:
        files = render(json.loads(args.strategy.read_text(encoding='utf-8')))
        if args.check:
            dest = ROOT / 'demo/site'
            actual = {p.relative_to(dest).as_posix() for p in dest.rglob('*') if p.is_file()}
            if actual != set(files) or any((dest / name).read_bytes() != text.encode('utf-8') for name, text in files.items()):
                raise ValueError('Published demo differs from reproducible output')
            print(f'PASS: {len(files)} demo files exactly reproduced; no network or model')
        else:
            dest = ROOT / 'runtime/demo-site'
            for name, text in files.items():
                p = dest / name
                p.parent.mkdir(parents=True, exist_ok=True)
                p.write_bytes(text.encode('utf-8'))
            print('Rendered synthetic output in runtime/demo-site')
    except (OSError, ValueError, TypeError, KeyError) as exc:
        print(f'Demo failed: {type(exc).__name__}. Check input and local files.', file=sys.stderr)
        return 2
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
