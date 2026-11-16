# Target keywords

## Funzione

Separare keyword e query dagli intenti. Le keyword non decidono da sole la sitemap.

Il file lavora in due momenti:

- prima della sitemap: cluster e query grezze alimentano `03_SEO_GEO/02_LOCAL_INTENT_MAPPER.md`;
- durante lo step 03: dopo la selezione delle pagine candidate e prima di definire gli URL da proporre, la keyword research v1 compila `Keyword per pagina`; alla chiusura la sezione deve coincidere con lo snapshot sitemap approvato.

## Input usati

-

## Keyword principali

| Cluster | Keyword/query | Intento | Bisogno utente | Pagina/sezione candidata | Evidenza | Note |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## Query locali

| Query | Citta/zona | Intento | Bisogno utente | Creare pagina? | Motivo | Rischio |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## Cluster intenti

| Cluster | Intento dominante | Query incluse | Output atteso | Note |
| --- | --- | --- | --- | --- |
|  |  |  | pagina/sezione/FAQ/esclusa |  |

## Keyword per pagina

Compilata nello step 03 prima della proposta finale degli URL. Durante la proposta copre le pagine candidate; alla chiusura contiene esattamente una riga per ogni pagina dello snapshot sitemap approvato.

| Pagina | URL | Keyword primaria | Keyword secondarie (2-5) | Intento | Motivazione classificazione | Fonte verifica e data | Note d'uso (H1/title/testi) |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |

## Keyword escluse

| Keyword/query | Motivo esclusione | Rischio evitato |
| --- | --- | --- |
|  |  |  |

## Regole

- Le keyword non decidono da sole sitemap, title o sezioni.
- Le keyword trovate non aggiungono URL alla sitemap da sole: ogni nuova pagina candidata passa dal test doorway e viene inclusa nella proposta esplicita dello step `03_SITEMAP_DECISION_ENGINE.md`; dopo l'approvazione ogni modifica richiede un nuovo snapshot.
- Nessuna keyword senza fonte: ricerca browser con data di consultazione, dato del brief, oppure riferimento puntuale a una riga di `Keyword principali` gia verificata, riportando fonte e data originali (la riga citata deve avere a sua volta fonte browser o brief, niente catene di rimandi); niente query o volumi inventati.
- Una run dichiarata di test o E2E non e esente da queste tre fonti. Non esiste uno stato di fonte sintetica: se l'attivita e fittizia, la ricerca browser si esegue comunque sulle query reali del settore e della citta della fixture, con la data vera di consultazione. L'eccezione run di test di Gate 5 riguarda solo dominio e sito precedente.
- Quando la fonte e la ricerca browser, conservare nel progetto un evidence pack datato: query eseguite, data, fonte consultata e righe prodotte. Le righe non verificabili da un'altra sessione non chiudono lo step 03.
- Pagine navigazionali (contatti, chi-siamo, privacy e simili): riga di `Keyword per pagina` con stato `n/a - pagina navigazionale` nella colonna keyword primaria, piu intento, motivazione della classificazione e fonte; keyword primaria e 2-5 secondarie sono obbligatorie solo per pagine SEO o commerciali. Mai inventare query per pagine navigazionali.
- Raggruppare variazioni lessicali se rispondono allo stesso bisogno.
- Non creare pagine autonome per micro-aree, quartieri o sinonimi senza contenuto specifico reale.
- Ogni cluster deve alimentare `02_LOCAL_INTENT_MAPPER.md` oppure essere escluso con motivo.

## Decisioni prese

-

## Assunzioni e rischi

-

## Criterio di completezza

La sezione `Keyword per pagina` e completa quando coincide con le pagine dello snapshot sitemap approvato e ogni pagina ha keyword primaria, 2-5 secondarie, intento, fonte con data e note d'uso, oppure, per le pagine navigazionali, stato `n/a - pagina navigazionale` con intento, motivazione e fonte della classificazione; nessuna riga senza fonte. Se una o piu righe hanno fonte `ricerca browser`, serve anche l'evidence pack datato conservato nel progetto, altrimenti la sezione non e completa.

## Evidence pack keyword

Compilare quando la fonte di almeno una riga e la ricerca browser. Vale anche per le run di test.

| Query eseguita | Data | Fonte consultata | Righe prodotte | Path evidenza |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Predisposizione futura

La sezione `Keyword per pagina` e gia input di slug, H1, title e piano contenuti. Eventuali automazioni future di generazione testi dovranno consumare la stessa sezione senza cambiarne il contratto.
