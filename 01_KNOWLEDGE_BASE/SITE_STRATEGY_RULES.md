# Site strategy rules

## Funzione del file

Guidare la decisione su pagine, sitemap, navigazione, esclusioni e linking.

## Regole operative

- Una pagina merita un URL solo se ha intento distinto, utilita reale e contenuto specifico.
- La sitemap deve nascere da `PRODUCT.md` e dalla Search Intent Map, non da un menu standard.
- Le pagine escluse devono essere documentate in `Pages Not To Create`.
- Le pagine servizio/area sono ammesse solo se il business ha servizi e aree reali, differenziabili e documentabili.
- Per attivita retail a sede singola, preferire pagine poche e forti: home, chi siamo, servizi/categorie reali, contatti/location, eventuali pagine specifiche motivate.
- Ogni pagina deve avere CTA coerente con il comportamento reale del cliente.
- Ogni URL deve avere una fonte dati nel brief o nel contesto: offerta, sede, area, prova, servizio o bisogno utente.
- Se una pagina candidata non puo avere contenuto specifico, va trasformata in sezione di una pagina piu forte.
- Le aree servite possono apparire come segnali locali solo se reali; non bastano come motivo per creare URL autonomi.
- Sinonimi e varianti lessicali dello stesso bisogno devono convergere sulla stessa pagina. Separare due servizi in URL distinti solo se cambiano offerta reale, intento, contenuto specifico e percorso di conversione.
- Una pagina location e ammessa solo con presenza fisica o servizio reale documentabile e contenuto locale originale; sostituire soltanto il nome della localita non crea utilita autonoma.
- Le pagine escluse devono indicare il rischio evitato: doorway, duplicazione, contenuto thin, dato non verificato o incoerenza CTA.
- Sedi multiple e modello operativo ibrido sono rami `non supportati` del workflow: non si pianificano location page ne separazione fra segnali di sede e di area, il progetto si ferma prima. Regola e blocco in `01_KNOWLEDGE_BASE/SEO_GEO_ARCHETYPES/README.md`, sezione `Rami non supportati`, e in `00_SYSTEM/GATING_RULES.md`, Gate 1.

## Criteri per creare un URL

- Intento utente distinto e non gia coperto da una pagina esistente.
- Contenuto originale basato su dati reali del cliente.
- CTA primaria o secondaria chiara.
- Collegamento interno naturale dalla navigazione, da una pagina correlata o dal footer.
- Valore per un visitatore diretto, anche senza traffico da motore di ricerca.
- Per gli intenti dichiarati locali, verifica della SERP corrente come evidenza euristica: local pack, mappa o risultati organici locali. L'esito non sostituisce fonte cliente, contenuto specifico e test doorway.

## Test doorway in 4 domande

Euristica operativa da applicare a ogni pagina locale, servizio o area candidata prima di confermarla in sitemap.

1. Questa pagina aiuta davvero qualcuno che cerca in questa zona?
2. Il contenuto va oltre la sostituzione del nome di citta o quartiere?
3. Esiste una domanda di ricerca reale e distinta per questa pagina?
4. La mostreresti al team webspam di Google senza imbarazzo?

Un solo "no": declassare la pagina a sezione di una pagina piu forte oppure registrarla in `Pages Not To Create` con il rischio evitato.

## Regole di naming URL

Si applicano a ogni URL confermato in sitemap, dopo il test doorway. Non sostituiscono i criteri per creare un URL: decidono solo come si chiama, non se esiste.

- Slug in kebab-case minuscolo, solo caratteri ASCII. Per le pagine con intento di ricerca (landing SEO/commerciali) la keyword principale deve essere presente nello slug e verso l'inizio. Per home (`/`) e pagine navigazionali (contatti, chi-siamo, privacy e simili) valgono gli slug standard, con intento motivato nel blueprint: mai forzare keyword dove l'intento e navigazionale.
- URL brevi. Niente parametri, simboli, numeri casuali o suffissi tecnici.
- Stop words rimosse dallo slug, salvo quando fanno parte della keyword phrase esatta: `abiti-da-cerimonia` mantiene `da` perche la query e quella.
- Struttura flat di default per siti vetrina fino a circa 7 pagine. Una gerarchia padre-figlio e ammessa solo quando esiste un albero reale di servizi, categorie o sedi con piu pagine per ramo; una sottocartella con una sola pagina e struttura finta.
- Suffisso citta nello slug ammesso solo su pagine con query locale-commerciale primaria, e solo come opzione proposta e motivata in sede di approvazione sitemap, mai come default. Mai su pagine di servizio come `/contatti/`.
- URL a directory con trailing slash e `index.html` interno; mai linkare `index.html` esplicito. Regola e motivazione anti-duplicazione: `SEO_BEST_PRACTICES.md`, sezione "URL a cartella e preview locale".
- Redirect 301: se il progetto sostituisce un sito esistente, inventariare le URL vecchie in fase brief e produrre la mappa redirect vecchio -> nuovo nell'artifact canonico `03_SEO_GEO/REDIRECT_MAP.md` (contratto in `00_SYSTEM/ARTIFACT_CONTRACTS.md`); i formati deployabili (es. `_redirects`, `.htaccess`) sono derivati della mappa in base all'hosting, mai la fonte. Se non e noto se esista un sito precedente, registrare la lacuna in `MISSING_INFO.md`.

## Anti-pattern da bloccare

- Pagine citta/quartiere duplicate.
- Keyword list senza interpretazione dell'intento.
- Menu riempitivo.
- Pagine thin con contenuto generico.
- Copy definitivo prima del blueprint.
- Pagine create per coprire varianti lessicali della stessa query.
- Pagine area/servizio senza prova operativa reale.
- Pagine location senza presenza, servizio o contenuto locale originale.
- Sitemap piu ampia della capacita informativa del cliente.

## Fonti e data di consultazione

- Google Search Central, Search Essentials: https://developers.google.com/search/docs/essentials
- Google Search Central, Spam Policies: https://developers.google.com/search/docs/essentials/spam-policies
- Google Search Central, Creating helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central, SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- localseoskills (licenza MIT), test doorway in 4 domande adattato: https://github.com/garrettjsmith/localseoskills
- Ahrefs, Location Landing Pages: https://ahrefs.com/blog/location-pages/ (euristica secondaria)
- Ahrefs, Local SEO: https://ahrefs.com/seo/local-seo (euristica secondaria per verifica intento e clustering query)
- Regole di naming URL: convenzioni locali conservate; fonte personale non redistribuita.
- Data consultazione: 2026-07-24.
