# GEO and AI search rules

## Funzione del file

Orientare contenuti e struttura per essere chiari, crawlable, citabili e utili anche nelle esperienze AI search.

## Regole operative

- Trattare GEO come buona SEO applicata con maggiore chiarezza, non come disciplina separata.
- Non creare template o markup separati con la promessa di apparire nelle esperienze generative: valgono prima crawlability, indicizzabilita, contenuto utile, entita chiare e informazioni verificabili.
- Rendere l'entita business chiara: nome, categoria, sede, area, offerta, prove di fiducia.
- Usare blocchi informativi brevi, specifici e citabili.
- Rispondere a domande reali di clienti locali.
- Evitare contenuti commodity, vaghi o replicabili su qualunque attivita.
- Non nascondere informazioni chiave in immagini, slider o JavaScript.
- Per apparire in esperienze AI di Search, la pagina deve prima essere tecnicamente idonea a indicizzazione e snippet.
- Organizzare contenuti con sezioni e heading chiari, in modo che persone e sistemi capiscano relazione tra entita, offerta e luogo.
- Non creare contenuti separati per ogni possibile variazione di query o fan-out se il valore per l'utente non cambia.
- Usare immagini e video reali quando aiutano a valutare negozio, prodotti, staff, sede o risultato del servizio.
- Se si usano strumenti AI per assistere la scrittura, il contenuto finale deve essere verificato, specifico e utile per clienti reali.
- Structured data, blocchi citabili e formati template aiutano la comprensione ma non garantiscono ranking, rich result, citazioni o inclusione nelle esperienze AI.

## Blocchi citabili consigliati

- Business Entity Summary: chi e l'attivita, cosa offre, dove opera e per chi.
- Local proof block: prove concrete, foto reali, recensioni o certificazioni verificabili.
- Visit/Contact block: indirizzo, orari, indicazioni, canali e CTA.
- Service/category answer: cosa include, per chi e utile, limiti, tempi o modalita reali.
- FAQ locali: domande di pre-visita, disponibilita, prenotazione, preventivo, parcheggio o assistenza.

## Euristiche di citabilita

Euristiche operative, non soglie vincolanti.

- Ogni blocco citabile deve essere comprensibile fuori contesto: entita, offerta e luogo espliciti (~100-170 parole come orientamento).
- La risposta diretta sta nelle prime 1-2 frasi del blocco (~40-60 parole come orientamento); il dettaglio segue.
- Usare H2/H3 in forma di domanda quando la sezione risponde a una domanda reale dei clienti locali.
- Mettere l'informazione chiave all'inizio della sezione, non alla fine.
- Rendere visibile la data di aggiornamento quando la freschezza conta: orari, prezzi, stagionalita.
- `robots.txt` non deve bloccare i crawler necessari alle esperienze AI in cui il cliente vuole comparire; la scelta sui crawler di training AI spetta al cliente e va registrata in `DECISION_LOG.md`.

## Controlli minimi

- [ ] La Business Entity Summary e chiara.
- [ ] Le FAQ rispondono a domande reali, non a keyword forzate.
- [ ] Le affermazioni di fiducia sono verificabili.
- [ ] Le informazioni locali sono in HTML.
- [ ] I blocchi citabili non contengono claim generici o non verificati.
- [ ] Nessun contenuto GEO replica pagine/keyword solo per manipolare AI search.
- [ ] La struttura tecnica resta crawlable e indicizzabile.
- [ ] Nessuna promessa di citazione o visibilita AI deriva dal solo template o structured data.

## Fonti e data di consultazione

- Google Search Central, Optimizing for generative AI features: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central, Creating helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central, Search Essentials: https://developers.google.com/search/docs/essentials
- Google Search Central, SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- claude-seo (licenza MIT), euristiche di citabilita adattate come fonte secondaria: https://github.com/AgriciDaniel/claude-seo
- Data consultazione: 2026-07-24.
