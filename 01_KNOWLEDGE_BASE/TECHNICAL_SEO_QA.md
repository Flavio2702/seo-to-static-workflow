# Technical SEO QA

## Funzione del file

Definire controlli tecnici minimi per sito statico locale.

## Regole operative

- I contenuti importanti devono essere presenti nel markup HTML iniziale.
- I link devono essere elementi `a` con `href` valido.
- La sitemap deve elencare solo URL pubblicabili e coerenti con la strategia.
- `robots.txt` non deve bloccare pagine destinate all'indicizzazione.
- I dati strutturati devono essere validabili e coerenti con contenuto visibile.
- JavaScript deve supportare interazioni leggere, non generare contenuto critico.
- Ogni pagina indicizzabile deve avere title, meta description, heading principale e contenuto coerenti tra loro.
- Lo schema deve usare il tipo piu specifico corretto solo quando i dati sono confermati.
- URL in sitemap, link interni, canonical e pagine generate devono descrivere lo stesso set pubblicabile.
- Le risorse necessarie a comprendere la pagina non devono essere bloccate ai crawler.
- I contenuti caricati lazy devono avere fallback o non essere critici per SEO/local/GEO.
- La validita sintattica schema.org e l'eleggibilita a una funzionalita Google sono controlli distinti: markup valido non garantisce rich result o visibilita.
- Usare solo tipi e proprieta pertinenti al contenuto visibile; la presenza di un tipo nella Search Gallery non autorizza markup non sostenuto dalla pagina.

## Controlli dati strutturati

- [ ] `LocalBusiness` o sottotipo usato solo se business, sede e contatti sono verificati.
- [ ] Per l'eleggibilita al rich result `LocalBusiness` di Google sono presenti almeno `name` e `address`; se un service-area business non pubblica un indirizzo reale, non inventarlo e registrare `LocalBusiness rich result non eleggibile` oppure motivare un tipo alternativo pertinente.
- [ ] Ogni sede fisica e rappresentata come entita `LocalBusiness` distinta; reparti e sedi non vengono fusi in un'unica entita generica.
- [ ] Il sottotipo `LocalBusiness` e il piu specifico supportato dai dati confermati; categorie dubbie restano escluse o richiedono conferma.
- [ ] Nome, indirizzo, telefono, orari e URL nello schema sono identici carattere per carattere al contenuto visibile e al Google Business Profile.
- [ ] Rating, review, geo, price range e area servita sono omessi se non verificati.
- [ ] `aggregateRating` non e autorizzato automaticamente per recensioni sull'attivita che pubblica il proprio sito; l'eventuale uso richiede verifica separata delle linee guida Google sui review snippet e del modello editoriale del sito.
- [ ] Il markup passa validazione sintattica e non usa dati nascosti per ampliare artificialmente la copertura.
- [ ] Nessun markup `FAQPage` o `HowTo` pianificato in funzione di rich results: Google li ha deprecati. Le FAQ restano valide come contenuto visibile in HTML.
- [ ] Lo schema usa URL assoluti, date e orari in formato ISO-8601, `@id` unico e stabile per pagina, telefono in formato internazionale (`+39...`) e nessun tag HTML nei testi.
- [ ] Prima della consegna, il markup applicabile passa il Rich Results Test; dopo la pubblicazione, l'handoff richiede verifica URL in Search Console senza rendere Search Console una dipendenza della build locale.

## Controlli minimi

- [ ] Link navigabili e crawlable.
- [ ] Sitemap coerente con pagine generate.
- [ ] Title/meta presenti.
- [ ] Schema LocalBusiness valido se usato.
- [ ] Eleggibilita Google dello schema valutata separatamente dalla validita sintattica.
- [ ] Nessun contenuto SEO critico dipende solo da JS.
- [ ] Asset con nomi comprensibili e dimensioni ragionevoli.
- [ ] `robots.txt` e meta robots non bloccano pagine destinate all'indicizzazione.
- [ ] Non ci sono pagine orfane o URL in sitemap non raggiungibili da link interni.
- [ ] Le informazioni locali/GEO critiche sono nel markup iniziale.

## Fonti e data di consultazione

- Google Search Central, Link best practices: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Google Search Central, Sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Google Search Central, JavaScript SEO basics: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google Search Central, Intro to structured data: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Google Search Central, General structured data guidelines: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Google Search Central, LocalBusiness structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google Search Central, Structured data Search Gallery: https://developers.google.com/search/docs/appearance/structured-data/search-gallery
- Google Search Central, Get started with Search for developers: https://developers.google.com/search/docs/fundamentals/get-started-developers
- Google Search Central Blog, Changes to HowTo and FAQ rich results: https://developers.google.com/search/blog/2023/08/howto-faq-changes
- Data consultazione: 2026-07-24.
