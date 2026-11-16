# 05 Heading and Content Depth Planner

## Funzione

Validare e dettagliare gerarchia heading e profondita contenuto attesa per evitare pagine sottili o disordinate, usando la keyword research v1 gia approvata nello step 03 e i blueprint dello step 04.

## Input richiesti

- `04_PAGE_BLUEPRINT_GENERATOR.md`
- `03_SITEMAP_DECISION_ENGINE.md` (sitemap approvata dall'utente)
- `02_CONTEXT/TARGET_KEYWORDS.md` (sezione `Keyword per pagina` compilata nello step 03)
- `01_INPUT/PRODUCT.md`
- `02_CONTEXT/BRAND_VOICE.md`
- `01_KNOWLEDGE_BASE/SEO_BEST_PRACTICES.md`

## Output atteso

- Verifica di coincidenza tra snapshot sitemap approvato, `Keyword per pagina` e blueprint dello step 04.
- H1, H2, H3 previsti per ogni pagina.
- Profondita informativa ragionevole.
- Sezioni minime.
- Blocchi esplicativi.
- Note su contenuti da non inventare.

## Criteri minimi di qualita

- Ogni pagina approvata con intento di ricerca ha keyword primaria e 2-5 secondarie con fonte di verifica datata; le pagine navigazionali hanno stato `n/a - pagina navigazionale` con intento, motivazione e fonte, mai query inventate.
- Nessuna keyword inventata: ogni riga di `Keyword per pagina` ha fonte (ricerca browser con data, dato del brief, o riferimento puntuale a una riga di `Keyword principali` gia verificata con fonte e data originali riportate).
- Un solo H1 per pagina: coerente con la keyword primaria registrata per le pagine con intento di ricerca; coerente con intento e blueprint per le pagine navigazionali con keyword primaria `n/a - pagina navigazionale`.
- Heading ordinati e non usati solo per stile.
- Contenuto proporzionato all'intento.
- Niente soglie rigide di keyword o parole.

## Blocchi che impediscono lo step successivo

- Sezione `Keyword per pagina` assente o con righe senza fonte.
- Pagine aggiunte alla sitemap sulla base delle sole keyword, senza test doorway e approvazione utente (step 03).
- H1 multipli o assenti.
- Heading incoerenti con blueprint.
- Sezioni troppo generiche.
- Profondita insufficiente per pagina autonoma.

## Metodo

1. Confrontare le pagine dello snapshot sitemap approvato con `Keyword per pagina` e con i blueprint: insiemi di pagine e URL devono coincidere. Se manca una riga, cambia una keyword primaria che impatta lo slug o emerge una nuova pagina candidata, tornare allo step 03 e ottenere un nuovo snapshot prima di proseguire.
2. Verificare che H1 e title dello step 04 seguano la keyword primaria e le note d'uso registrate; per le pagine navigazionali verificare coerenza con intento e classificazione, senza forzare keyword.
3. Per ogni pagina del blueprint, confermare un solo H1 e definire la sequenza H2/H3 che rispecchia le sezioni approvate.
4. Usare heading in forma di domanda dove la sezione risponde a una domanda reale dei clienti.
5. Indicare per ogni sezione la profondita attesa e il tipo di blocco dal menu nelle euristiche sotto.
6. Annotare i contenuti che non possono essere scritti senza dati cliente: diventano placeholder semantici, non testo inventato. Se la sola descrizione dell'atteso sarebbe gia un'affermazione (caso tipico: prestazioni o qualifiche in settore regolato), il contenuto e `non pubblicabile` e non diventa placeholder: marcarlo con motivazione e lacuna collegata, ed escluderlo dal piano heading. Vedi `00_SYSTEM/ARTIFACT_CONTRACTS.md`, sezione `Stati del contenuto`.
7. Verificare che heading e profondita sostengano il brief di persuasione dello step 04 senza trasformare gli obblighi informativi in componenti o layout obbligatori.

## Euristiche operative

Ordini di grandezza per orientare la profondita, non soglie vincolanti (vedi Criteri minimi di qualita).

- Blocco risposta autonomo: risposta diretta nelle prime 1-2 frasi, poi il dettaglio; comprensibile fuori contesto.
- Corpi sezione brevi e specifici (~80-160 parole come orientamento); meglio una sezione in meno che una generica.
- Paragrafi corti (2-4 frasi) e liste dove aiutano la lettura.
- Menu blocchi contenuto: definizione, passi/come funziona, confronto, FAQ, risposta autonoma, dato con fonte. Usare solo dove serve all'intento.
- Le euristiche di citabilita complete sono in `01_KNOWLEDGE_BASE/GEO_AI_SEARCH_RULES.md`.

## Piano heading

| Pagina | H1 | H2 principali | H3 opzionali | Origine | Note profondita |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

`Origine` si eredita dal blocco pagina dello step 04 (`primario`, `secondario`, `delta cliente`). Se una sezione nasce in questo step, l'origine e `delta cliente`.

## Decisioni prese

- 

## Assunzioni e rischi

- 

## Collegamento a SITE_STRATEGY.md

Questo step alimenta `Page Blueprints` e il controllo QA su H1/heading/content depth.
