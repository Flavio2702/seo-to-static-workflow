# Accessibility and performance rules

## Funzione del file

Mantenere i siti locali leggeri, leggibili, mobile-friendly e accessibili in modo basilare.

## Regole operative

- Usare HTML semantico: header, nav, main, section, footer.
- Mantenere gerarchia heading coerente.
- Ogni immagine informativa deve avere `alt` utile.
- CTA e link devono essere riconoscibili e attivabili da tastiera.
- Il contrasto minimo e 4.5:1 per testo normale e 3:1 per testo grande (almeno 24 px regolare oppure 18.66 px bold) e per componenti essenziali, inclusi bordi, icone e stati necessari a riconoscere o usare il controllo.
- Evitare librerie pesanti e animazioni non necessarie.
- Ottimizzare immagini prima della consegna.
- Non mettere testo SEO, NAP, orari o CTA solo dentro immagini.
- Usare immagini con dimensioni adeguate al layout e vicino al contenuto che spiegano.
- Evitare interazioni che impediscono accesso a contenuti o contatti senza mouse.
- Preferire HTML e CSS semplici per siti vetrina locali; JavaScript deve essere progressivo.
- Le animazioni di comparsa (reveal/fade-on-scroll) sono enhancement su un contenuto gia
  visibile: mai nascondere contenuto in attesa di uno stato JS o di una transizione. Contenuto
  in `opacity:0`/`visibility:hidden` sbloccato solo da JS o da IntersectionObserver e vietato,
  perche in rendering headless, tab in background o con JS disattivato la sezione resta vuota.
- Trattare accessibilita e performance come qualita di base, non come ottimizzazioni successive.

## Euristiche minime

- Alt text: descrive la funzione dell'immagine nel contesto, non ripete keyword.
- Contrasto: misurare 4.5:1 per testo normale e 3:1 per testo grande e componenti essenziali su mobile e desktop. Eseguire spot-check sulle combinazioni effettive di hero/collage, CTA e relativi stati, sezioni scure, footer e testo muted; una dichiarazione generica di leggibilita non vale.
- Navigazione: menu, link, form e CTA devono funzionare con tastiera.
- Performance: immagini compresse, asset essenziali, niente librerie senza ruolo chiaro.
- Layout mobile: informazioni locali e CTA primarie devono apparire senza sovraccarico visivo.

## Controlli minimi

- [ ] Layout mobile leggibile.
- [ ] Contrasto misurato: almeno 4.5:1 per testo normale e 3:1 per testo grande e componenti essenziali; spot-check documentati per hero/collage, CTA, sezioni scure, footer e testo muted.
- [ ] Navigazione utilizzabile da tastiera.
- [ ] Alt text presente dove serve.
- [ ] Nessun testo critico in immagine.
- [ ] JavaScript opzionale per navigazione e contenuto.
- [ ] Render headless full-page (desktop e mobile): tutte le sezioni sono popolate; nessun
  contenuto critico resta nascosto da animazioni reveal o da stati JS.
- [ ] Sticky header verificato nel viewport dopo reload, route/firma e scroll iniziale `0,0`: una duplicazione visibile solo nello stitching full-page non e un finding senza conferma viewport o geometrica.
- [ ] Peso asset compatibile con sito vetrina locale.
- [ ] CTA e contatti sono raggiungibili e attivabili senza mouse.
- [ ] Immagini reali sono ottimizzate e contestualizzate.
- [ ] Heading e landmark aiutano scansione umana e tecnica.

## Fonti e data di consultazione

- Google Search Central, Page experience documentation hub: https://developers.google.com/search/docs/appearance/page-experience
- Google Search Central, JavaScript SEO basics: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google Search Central, Image SEO best practices: https://developers.google.com/search/docs/appearance/google-images
- W3C, WCAG 2.2 Quick Reference: https://www.w3.org/WAI/WCAG22/quickref/
- Data consultazione: 2026-07-07.
