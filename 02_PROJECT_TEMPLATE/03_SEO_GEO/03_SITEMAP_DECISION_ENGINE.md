# 03 Sitemap Decision Engine

## Funzione

Decidere quali pagine creare, quali evitare e perche.

## Input richiesti

- `02_LOCAL_INTENT_MAPPER.md`
- `01_INPUT/PRODUCT.md`
- `02_CONTEXT/TARGET_KEYWORDS.md`
- `02_CONTEXT/SEO_GEO_GUIDELINES.md`
- `01_KNOWLEDGE_BASE/SITE_STRATEGY_RULES.md`

## Output atteso

- Sitemap ragionata.
- Menu primario.
- Pagine obbligatorie.
- Pagine opzionali.
- Pagine da evitare.
- URL proposti.
- Motivazione per ogni URL.
- Sezione `Keyword per pagina` di `02_CONTEXT/TARGET_KEYWORDS.md` compilata prima della proposta URL e allineata allo snapshot approvato.
- Trasformazioni da pagina candidata a sezione, quando l'intento non basta per un URL autonomo.

## Criteri minimi di qualita

- Ogni pagina ha intento distinto.
- Ogni pagina candidata con intento di ricerca ha keyword primaria e 2-5 secondarie verificate con fonte e data prima della definizione dello slug; le pagine navigazionali hanno classificazione `n/a - pagina navigazionale` motivata e con fonte.
- Ogni URL ha una motivazione.
- Ogni URL rispetta le "Regole di naming URL" di `01_KNOWLEDGE_BASE/SITE_STRATEGY_RULES.md`.
- La sitemap e stata presentata all'utente e approvata; la decisione e registrata in `07_HISTORY/DECISION_LOG.md` con owner Utente.
- Le pagine escluse sono documentate.
- Il menu non contiene pagine riempitive.
- Ogni pagina ha contenuto specifico ricavabile da `PRODUCT.md`, contesto o step precedenti.
- Ogni pagina ha CTA coerente con comportamento reale del cliente.
- Le pagine locali/area sono ammesse solo se hanno prova operativa e contenuto differenziabile.
- La sitemap resta proporzionata a un sito vetrina retail statico.

## Blocchi che impediscono lo step successivo

- Pagine citta/quartiere duplicate.
- Pagine servizio/area senza contenuto specifico reale.
- Pagine candidate senza CTA o intento.
- Assenza di `Pages Not To Create`.
- URL creati per varianti keyword senza utilita autonoma.
- Menu primario con pagine non necessarie o non linkabili naturalmente.
- Pagine senza fonte dati verificabile nel brief, contesto o assunzioni.
- Sitemap non approvata dall'utente: l'agente non puo auto-approvarla.
- `Keyword per pagina` assente, senza fonti o non coincidente con le pagine dello snapshot approvato.

## Metodo

1. Partire dalla Search Intent Map: ogni pagina candidata deve coprire un intento distinto gia mappato.
2. Applicare i criteri della sezione seguente per decidere URL autonomo, sezione o esclusione.
3. Applicare il test doorway in 4 domande di `01_KNOWLEDGE_BASE/SITE_STRATEGY_RULES.md` a ogni pagina locale, servizio o area candidata.
4. Sulla lista di pagine candidate eseguire la keyword research v1 e compilare `02_CONTEXT/TARGET_KEYWORDS.md`, sezione `Keyword per pagina`: keyword primaria, 2-5 secondarie, intento, fonte con data e note d'uso per le pagine con intento di ricerca; classificazione navigazionale motivata e con fonte per le altre. Le keyword non autorizzano nuove pagine: una nuova candidata torna ai punti 2-3 prima di proseguire.
5. Definire lo slug solo dopo il punto 4 e verificarlo con le "Regole di naming URL" di `01_KNOWLEDGE_BASE/SITE_STRATEGY_RULES.md`; dove la keyword primaria e locale-commerciale, valutare l'opzione suffisso citta da proporre all'utente.
6. Compilare sitemap, menu, pagine opzionali e `Pages Not To Create` con motivazione per ogni riga.
7. Presentare all'utente una proposta unica con entrambe le liste che dovra approvare: per ogni URL proposto, motivazione (perche questo e non altro), esito del test doorway, conformita alle regole di naming e opzione citta se pertinente; per ogni voce di `Pages Not To Create`, motivo dell'esclusione e rischio evitato. Nessuna delle due liste puo essere aggiunta alla decisione senza essere stata mostrata.
8. Registrare l'approvazione esplicita di entrambe le liste in `07_HISTORY/DECISION_LOG.md` con owner Utente e riportarla nella sezione `Approvazione utente`. Se l'utente modifica le liste, riallineare prima sitemap e `Keyword per pagina` al payload approvato. Senza coincidenza esatta e approvazione di entrambe lo step non e chiuso e Gate 3 non passa.

## Criteri per decidere una pagina

- Creare URL se intento, contenuto, CTA e linking interno sono distinti.
- Accorpare in sezione se cambia solo la keyword, la micro-area o il modo di dire la stessa offerta.
- Escludere se richiede dati inventati, duplicazione locale o contenuto generico.
- Documentare sempre l'esclusione per evitare che la pagina rientri nelle fasi successive.

## Sitemap proposta

| Pagina | URL | Priorita | Intento | Fonte dati | CTA | Motivo | Esito doorway | Opzione citta |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | `/` | Alta |  |  |  |  |  |  |

Colonna `Esito doorway`: esito del test in 4 domande (`passa` o motivo del declassamento); `n/a` solo per pagine non locali/servizio/area. Colonna `Opzione citta`: proposta motivata di suffisso citta se la query e locale-commerciale primaria, altrimenti `no`.

## Approvazione utente

- ID snapshot approvazione (`SITEMAP-YYYY-MM-DD-N`):
- Data proposta:
- Esito (approvata / approvata con modifiche / respinta):
- Modifiche richieste:
- Riferimento decisione in `07_HISTORY/DECISION_LOG.md` (owner Utente):

### Snapshot URL approvati

| Pagina | URL | Motivo approvato | Esito doorway approvato | Opzione citta approvata |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

### Snapshot pagine escluse

| Pagina esclusa | Motivo approvato | Rischio evitato approvato |
| --- | --- | --- |
|  |  |  |

Regola di validita: l'approvazione vale solo per lo snapshot identificato dall'ID sopra. La voce nella tabella principale del `DECISION_LOG.md` deve citare lo stesso ID; la sezione append-only `Snapshot approvazione sitemap` dello stesso file deve copiare integralmente le righe di entrambe le tabelle, inclusi motivi, esiti doorway, opzioni citta e rischi evitati. Un semplice riferimento al path non basta. Qualunque modifica a uno di questi campi invalida l'approvazione; serve una nuova proposta sintetica all'utente (solo il delta), un nuovo ID snapshot e una nuova decisione. Conservare questo blocco e aggiungerne uno nuovo: non sovrascrivere uno snapshot gia approvato.

## Menu primario

- 

## Pagine opzionali

| Pagina | Condizione per crearla | Alternativa se non basta |
| --- | --- | --- |
|  |  |  |

## Pages Not To Create

| Pagina esclusa | Motivo | Rischio evitato |
| --- | --- | --- |
|  |  |  |

## Decisioni prese

- 

## Assunzioni e rischi

- 

## Collegamento a SITE_STRATEGY.md

Questo step alimenta `Sitemap`, `Navigation Strategy` e `Pages Not To Create`.
