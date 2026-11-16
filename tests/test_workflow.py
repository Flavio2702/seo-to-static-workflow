import copy
import importlib.util
import json
from html.parser import HTMLParser
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from urllib.parse import urlsplit, unquote
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from demo import render, validate
from prepara import prepare


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(); self.tags=[]; self.text=[]
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))
    def handle_data(self, text):
        self.text.append(text)


class WorkflowTests(unittest.TestCase):
    def setUp(self):
        self.data=json.loads((ROOT/'demo/strategy.json').read_text(encoding='utf-8'))

    def test_demo_exactly_reproduced(self):
        files=render(self.data)
        actual={p.relative_to(ROOT/'demo/site').as_posix() for p in (ROOT/'demo/site').rglob('*') if p.is_file()}
        self.assertEqual(actual,set(files))
        for name,text in files.items(): self.assertEqual((ROOT/'demo/site'/name).read_bytes(),text.encode())

    def test_seo_contract_reaches_all_pages(self):
        files=render(self.data)
        for p in self.data['pages']:
            name=(p['slug']+'/' if p['slug'] else '')+'index.html'
            html=files[name]; parsed=Page(html)
            self.assertEqual(sum(t=='h1' for t,a in parsed.tags),1)
            self.assertEqual(sum(t=='h2' for t,a in parsed.tags),len(p['sections']))
            self.assertIn(p['title'], ''.join(parsed.text))
            self.assertIn(('meta',{'name':'description','content':p['description']}),parsed.tags)
            self.assertIn(('meta',{'name':'robots','content':'noindex,follow'}),parsed.tags)
            canonical=self.data['base_url']+(p['slug']+'/' if p['slug'] else '')
            self.assertIn(('link',{'rel':'canonical','href':canonical}),parsed.tags)
            for line in p['h1'].split('\n'): self.assertIn(line, ''.join(parsed.text))
            for section in p['sections']:
                self.assertIn(section['heading'], ''.join(parsed.text))
                self.assertIn(section['text'], ''.join(parsed.text))
            self.assertNotIn('LocalBusiness',html)
            self.assertNotIn('<form',html)
            schema=json.loads(html.split('<script type="application/ld+json">')[1].split('</script>')[0])
            self.assertEqual(schema['url'],canonical)
            self.assertEqual(schema['name'],p['title'])

    def test_all_links_assets_and_fragments(self):
        root=ROOT/'demo/site'
        for file in root.rglob('*.html'):
            page=Page(file.read_text(encoding='utf-8'))
            for tag,attrs in page.tags:
                for attr in ['href','src']:
                    if attr not in attrs: continue
                    url=urlsplit(attrs[attr])
                    if url.scheme or url.netloc: continue
                    target=(file.parent/unquote(url.path)).resolve() if url.path else file
                    if target.is_dir(): target=target/'index.html'
                    self.assertTrue(target.is_relative_to(root.resolve()))
                    self.assertTrue(target.is_file(), str(file.relative_to(ROOT)))
                    if url.fragment:
                        ids={a.get('id') for t,a in Page(target.read_text(encoding='utf-8')).tags}
                        self.assertIn(url.fragment,ids)

    def test_sitemap_matches_strategy(self):
        xml=ET.fromstring(render(self.data)['sitemap.xml'])
        urls=[n.text for n in xml.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
        self.assertEqual(urls,[self.data['base_url']+(p['slug']+'/' if p['slug'] else '') for p in self.data['pages']])

    def test_custom_configuration_propagates(self):
        self.data['base_url']='https://example.org/custom/'
        self.data['pages'][0]['title']='Titolo personalizzato'
        out=render(self.data)
        self.assertIn('https://example.org/custom/richiesta/',out['richiesta/index.html'])
        self.assertIn('<title>Titolo personalizzato</title>',out['index.html'])

    def test_missing_malformed_inputs_rejected(self):
        for value in [None,[],{}, {'schema_version':1,'synthetic':True}]:
            with self.subTest(value=type(value).__name__),self.assertRaises(ValueError):validate(value)
        for key in ['title','links','sections','slug','source']:
            bad=copy.deepcopy(self.data); del bad['pages'][0][key]
            with self.subTest(key=key),self.assertRaises(ValueError):validate(bad)

    def test_path_and_url_injection_rejected(self):
        for slug in ['../private','/absolute','a/b','a?b','..','C:']:
            bad=copy.deepcopy(self.data);bad['pages'][0]['slug']=slug
            with self.subTest(slug=slug),self.assertRaises(ValueError):validate(bad)
        for url in ['javascript:alert(1)','https://user:password@example.org','https://example.org/?token=x']:
            bad=copy.deepcopy(self.data);bad['base_url']=url
            with self.assertRaises(ValueError):validate(bad)

    def test_unknown_links_duplicates_and_markup(self):
        bad=copy.deepcopy(self.data);bad['pages'][0]['links']=['absent']
        with self.assertRaises(ValueError):validate(bad)
        bad=copy.deepcopy(self.data);bad['pages'][1]['slug']=''
        with self.assertRaises(ValueError):validate(bad)
        self.data['pages'][0]['intro']='<script>alert(1)</script>'
        self.assertIn('&lt;script&gt;',render(self.data)['index.html'])

    def test_preparation_preserves_template_and_existing_project(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);(root/'02_PROJECT_TEMPLATE').mkdir()
            (root/'02_PROJECT_TEMPLATE/brief.md').write_text('empty')
            dest=prepare(root,'nuovo-progetto')
            (dest/'brief.md').write_text('private')
            with self.assertRaises(FileExistsError):prepare(root,'nuovo-progetto')
            self.assertEqual((dest/'brief.md').read_text(),'private')
            self.assertEqual((root/'02_PROJECT_TEMPLATE/brief.md').read_text(),'empty')
            for slug in ['../escape','a/b','A B','']:
                with self.assertRaises(ValueError):prepare(root,slug)

    def test_missing_template_fails(self):
        with tempfile.TemporaryDirectory() as tmp:
            with self.assertRaises(FileNotFoundError):prepare(Path(tmp),'nuovo')

    def test_cli_missing_or_bad_json_no_input_echo(self):
        with tempfile.TemporaryDirectory() as tmp:
            p=Path(tmp)/'bad.json';p.write_text('sensitive-synthetic-marker')
            for target in [p,p.parent/'absent.json']:
                result=subprocess.run([sys.executable,str(ROOT/'scripts/demo.py'),'--strategy',str(target)],capture_output=True,text=True)
                self.assertEqual(result.returncode,2)
                self.assertNotIn('sensitive-synthetic-marker',result.stderr)

    def test_seven_original_steps_retained(self):
        steps=sorted((ROOT/'02_PROJECT_TEMPLATE/03_SEO_GEO').glob('[0-9][0-9]_*.md'))
        self.assertEqual(len(steps),7)
        for step in steps:
            self.assertTrue((ROOT/'demo/03_SEO_GEO'/step.name).is_file())
            text=step.read_text(encoding='utf-8')
            for heading in ['## Input richiesti','## Metodo','## Output atteso']:
                self.assertIn(heading,text)


if __name__=='__main__':unittest.main()
