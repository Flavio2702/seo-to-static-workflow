# 05_SITE

Struttura pronta per il sito statico. Non e un sito finale finche mancano brief, strategia e design.

## Convenzioni

- `index.html`: home page.
- `pages/`: pagine interne.
- `css/`: CSS custom o output Tailwind se deciso in futuro.
- `js/`: JavaScript vanilla.
- `assets/`: immagini e icone.
- `data/`: dati strutturati o file dati piccoli.
- `sitemap.xml` e `robots.txt`: da aggiornare solo quando URL e dominio sono noti.

## Regole static-first

- Le pagine devono essere HTML statico leggibile senza dipendere da JavaScript per contenuti SEO/GEO critici.
- Le animazioni di comparsa sono enhancement: il contenuto e visibile di default, mai gated da uno stato JS o da una transizione. Niente `opacity:0`/`visibility:hidden` sbloccato solo da JS o IntersectionObserver.
- I dati business verificati stanno nel contenuto visibile e, quando utile, in `data/`.
- I dati strutturati confermano informazioni gia visibili; non aggiungono claim, recensioni, rating, aree o orari non verificati.
- FAQ, breadcrumb e related links sono componenti SEO opzionali: usarli solo se previsti in `SITE_STRATEGY.md`.
- Non generare pagine servizio-area, citta o quartiere con formula automatica. Ogni URL deve essere approvato nella sitemap strategica.

## Dati e componenti opzionali

- `data/localbusiness.schema.json`: template JSON-LD da compilare solo con dati confermati.
- Campi opzionali `description`, `image`, `postalCode`, `areaServed`, `openingHoursSpecification` e `sameAs`: aggiungerli solo se confermati e visibili o coerenti con la pagina.
- I campi opzionali non confermati vanno rimossi dal JSON prima della consegna, non lasciati come placeholder.
- FAQ: domande reali, risposte visibili in pagina e schema `FAQPage` solo se coerente.
- Breadcrumb: utile per pagine interne approvate; evitare se la struttura e single-page.
- Related links: usare solo per collegare pagine realmente utili e crawlable.

## Verifiche prima della consegna

- Sitemap contiene solo URL pubblicabili.
- `robots.txt` non blocca pagine indicizzabili.
- Link interni e CTA sono elementi `a` con `href` valido.
- Schema passa validazione sintattica e non contiene placeholder.
- Non restano pagine orfane, link rotti o asset critici mancanti.
- Contrasto misurato: almeno 4.5:1 per testo normale e 3:1 per testo grande e componenti essenziali; spot-check su hero/collage, CTA e relativi stati, sezioni scure, footer e testo muted.
- Nessuna meta-copy, nota interna, etichetta dello spec o istruzione di layout/tono resta nel copy visibile.
- Screenshot headless full-page (desktop e mobile): ogni sezione e popolata; nessun contenuto critico resta nascosto da animazioni reveal o da JavaScript. Per sticky header, confermare nel viewport o con geometria browser dopo reload, firma route e scroll `0,0` qualunque anomalia visibile solo nello stitching full-page.
- Preview utente pronta via server HTTP secondo `00_SYSTEM/LOCAL_RENDER_PLAYBOOK.md`, con comando dalla root cliente e URL iniziale completo `http://localhost:<porta>/`; mai consegnare `file://` o il solo `index.html`.
