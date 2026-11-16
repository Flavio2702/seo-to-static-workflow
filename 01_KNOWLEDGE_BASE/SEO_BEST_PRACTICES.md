# SEO best practices

## Funzione del file

Guidare struttura, contenuti, URL, title, meta description e linking per siti vetrina locali statici.

## Regole operative

- La conformita alle best practice migliora crawlability, comprensione e qualita di partenza, ma non garantisce indicizzazione, posizionamento o tempi di risultato.
- Creare una struttura logica, navigabile e comprensibile senza JavaScript.
- Usare URL descrittivi e stabili.
- Ogni pagina deve avere intento chiaro, title coerente, meta description utile e un solo H1.
- I contenuti devono essere unici, utili, leggibili e aggiornabili; devono rispondere a bisogni reali dell'utente, non solo a keyword.
- Le sezioni principali devono essere leggibili in HTML.
- I link interni devono essere elementi `a` con `href` valido, usare anchor descrittivi e portare a pagine realmente utili; ogni pagina pubblicabile deve essere raggiungibile da almeno un'altra pagina trovabile.
- Evitare contenuto duplicato, keyword stuffing e pagine create solo per intercettare query.
- Non creare pagine per varianti di query se l'intento, l'offerta e il contenuto sarebbero sostanzialmente uguali.
- Collegare ogni pagina a una decisione utente: capire, valutare, visitare, contattare, prenotare o acquistare.
- Mantenere coerenza tra title, H1, heading, contenuto visibile e intento. Il title deve essere chiaro, conciso, univoco e fedele alla pagina.
- Usare la meta description come sintesi breve e univoca, non come contenitore di keyword; Google puo generare lo snippet dal contenuto visibile della pagina.
- Mettere informazioni distintive, prove e dettagli pratici nel contenuto visibile, non solo in markup o attributi.
- Usare immagini nitide e pertinenti vicino al testo che le spiega, con alt descrittivo quando l'immagine informa; una foto generica non sostituisce una prova reale dell'attivita.

## URL a cartella e preview locale

- Ogni pagina interna vive in una directory con `index.html` interno; l'URL canonico e la directory con trailing slash (es. `/contatti/`).
- I link interni puntano sempre alla directory con trailing slash, mai a `index.html` esplicito: `/contatti/` e `/contatti/index.html` sarebbero due URL distinti per la stessa pagina e creerebbero contenuto duplicato.
- La preview locale degli URL a cartella richiede un server HTTP: il protocollo `file://` non risolve le directory con trailing slash. Procedura canonica: `00_SYSTEM/LOCAL_RENDER_PLAYBOOK.md`.

## Euristiche per siti retail locali

- Home: deve chiarire categoria, citta/area, proposta principale, differenziatori e CTA primaria.
- Pagine categoria/servizio: ammesse solo se esistono offerta reale, intento distinto, contenuto specifico e CTA coerente.
- Pagina contatti/location: deve rendere immediati NAP, orari, indicazioni e azioni di contatto quando disponibili.
- FAQ: usare domande reali di clienti locali; evitare FAQ create solo per intercettare long-tail keyword.
- Immagini: usare foto pertinenti vicino al testo relativo e alt text descrittivo quando l'immagine informa.

## Controlli minimi

- [ ] Ogni pagina ha una funzione distinta.
- [ ] Title, H1, heading e contenuto visibile descrivono lo stesso intento.
- [ ] Ogni meta description riassume il valore della pagina.
- [ ] Ogni link interno e crawlable, ha destinazione valida e motivo.
- [ ] Non ci sono pagine orfane.
- [ ] Nessuna pagina replica lo stesso intento con cambio di citta, quartiere o keyword.
- [ ] Le informazioni importanti sono visibili nel corpo pagina.
- [ ] Le immagini informative sono pertinenti, hanno contesto testuale e alt utile.

## Fonti e data di consultazione

- Google Search Central, SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central, Search Essentials: https://developers.google.com/search/docs/essentials
- Google Search Central, Title links: https://developers.google.com/search/docs/appearance/title-link
- Google Search Central, Snippets: https://developers.google.com/search/docs/appearance/snippet
- Google Search Central, Image SEO best practices: https://developers.google.com/search/docs/appearance/google-images
- Google Search Central, Get started with Search for developers: https://developers.google.com/search/docs/fundamentals/get-started-developers
- Data consultazione: 2026-07-24.
