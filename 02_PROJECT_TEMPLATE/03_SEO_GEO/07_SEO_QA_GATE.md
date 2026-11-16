# 07 SEO QA Gate

## Funzione

Controllare la strategia prima del design e decidere se il progetto e ok per design.

## Input richiesti

- `01_BRIEF_NORMALIZER.md`
- `02_LOCAL_INTENT_MAPPER.md`
- `03_SITEMAP_DECISION_ENGINE.md`
- `04_PAGE_BLUEPRINT_GENERATOR.md`
- `05_HEADING_CONTENT_DEPTH_PLANNER.md`
- `06_LOCAL_SEO_GEO_SIGNALS_PLANNER.md`
- `SITE_STRATEGY.md` se gia consolidato

## Output atteso

Pre-QA strategico con:

- criticita;
- pagine deboli;
- rischi doorway;
- incoerenze;
- dati mancanti;
- decisioni da confermare;
- stato `ok per design` oppure `bloccato`.

## Criteri minimi di qualita

- Ogni problema ha severita, evidenza e correzione.
- I rischi doorway sono esplicitamente controllati.
- Le pagine escluse sono presenti.
- Il design non parte se lo stato e `bloccato`.
- Ogni pagina in sitemap ha intento, fonte dati, CTA e contenuto previsto.
- Ogni dato locale critico e presente, dichiarato mancante o escluso dallo schema.
- Ogni blocco GEO/AI search e leggibile in HTML e basato su informazioni verificabili.
- Ogni rischio di contenuto generico, duplicato o inventato ha una correzione esplicita.
- Ogni correzione proposta indica come verificare che il problema sia chiuso.
- Selezione archetipo, modificatori e delta sono presenti e coerenti negli step e in `SITE_STRATEGY.md`.
- Ogni pagina ha un brief di persuasione completo ma privo di prescrizioni estetiche da preset.

## Blocchi che impediscono il design

- `SITE_STRATEGY.md` mancante.
- Sitemap non approvata dall'utente: manca la decisione in `07_HISTORY/DECISION_LOG.md` con owner Utente richiesta dallo step `03_SITEMAP_DECISION_ENGINE.md`; un'approvazione con owner agente non vale.
- `02_CONTEXT/TARGET_KEYWORDS.md`, sezione `Keyword per pagina`, non coincide per pagina e URL con lo snapshot sitemap approvato, contiene righe senza fonte o non sostiene il naming degli URL con intento di ricerca.
- Bridge locale `PRODUCT.md` mancante nella root cliente.
- Bridge locale `DESIGN.md` mancante nella root cliente.
- Working directory non dentro `projects/<cliente>/` se si usa Impeccable.
- Uso previsto di Impeccable dalla root della repo, anche con `--target projects/<cliente>`.
- Pagine senza intento distinto.
- Pagine locali duplicate.
- CTA principali non definite.
- Dati locali critici mancanti senza assunzione.
- `Pages Not To Create` assente o incompleto.
- Pagine candidate basate solo su keyword, citta o quartieri senza contenuto specifico.
- Schema LocalBusiness previsto con dati non visibili, non verificati o incoerenti.
- NAP, orari, area servita, recensioni o prove di fiducia inventate.
- Contenuti SEO/GEO critici previsti solo in immagini, slider o JavaScript.
- FAQ create per keyword e non per domande reali.
- Archetipo primario assente, piu di un secondario, secondario non documentato o modificatori fuori registro.
- Brief di persuasione mancante, incoerente con la pagina o contaminato da palette, font, mood, componenti o layout imposti dall'archetipo.

## Metodo

1. Rileggere gli output degli step 01-06 e verificare coerenza tra intenti, sitemap, blueprint e segnali locali.
2. Applicare la checklist pre-design e registrare ogni problema con severita, evidenza, impatto e correzione.
3. Applicare il test doorway in 4 domande di `01_KNOWLEDGE_BASE/SITE_STRATEGY_RULES.md` a ogni pagina locale o area rimasta in sitemap.
4. Dichiarare l'esito del gate: `ok per design` solo se non restano blocchi aperti.

## Checklist pre-design

- [ ] Business Entity Summary completa o lacune dichiarate.
- [ ] Search Intent Map senza duplicati sostanziali.
- [ ] Sitemap proporzionata al business e motivata per ogni URL.
- [ ] Sitemap approvata dall'utente (sezione `Approvazione utente` dello step 03 compilata, decisione in `07_HISTORY/DECISION_LOG.md` con owner Utente).
- [ ] `Keyword per pagina` coincide con lo snapshot approvato; fonti presenti e slug delle pagine con intento di ricerca coerenti con la keyword primaria verificata.
- [ ] Pages Not To Create compilato con rischio evitato.
- [ ] Bridge locali `PRODUCT.md` e `DESIGN.md` presenti nella root cliente.
- [ ] Impeccable previsto solo con working directory dentro `projects/<cliente>/`.
- [ ] Local/GEO Signals con fonte, stato verifica e posizione HTML.
- [ ] Structured data limitato a dati visibili e verificati.
- [ ] Nessun rischio doorway, thin content o keyword stuffing aperto.
- [ ] CTA primarie e secondarie coerenti con il comportamento reale del cliente.
- [ ] Test doorway in 4 domande applicato a ogni pagina locale/area (`01_KNOWLEDGE_BASE/SITE_STRATEGY_RULES.md`).
- [ ] Un archetipo primario, massimo un secondario documentato, modificatori e delta coincidono tra step 01 e `SITE_STRATEGY.md`.
- [ ] Ogni pagina ha azione, convinzione, obiezione, prova, asset e verita del primo viewport; nessun preset prescrive la direzione visuale.

## Esito gate

- Stato: `bloccato`
- Motivo:
- Condizioni per passare a `ok per design`:

## Problemi rilevati

| Severita | Evidenza | Impatto | Correzione | Stato |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Decisioni prese

- 

## Assunzioni e rischi

- 

## Collegamento a SITE_STRATEGY.md

Questo step alimenta `SEO QA Pre-Design` e decide l'accesso a `04_DESIGN/`.
