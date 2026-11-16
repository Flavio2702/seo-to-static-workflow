# 06 Local SEO / GEO Signals Planner

## Funzione

Definire segnali locali e segnali utili alla comprensione da parte di search e AI search.

## Input richiesti

- `04_PAGE_BLUEPRINT_GENERATOR.md`
- `05_HEADING_CONTENT_DEPTH_PLANNER.md`
- `02_CONTEXT/LOCAL_CONTEXT.md`
- `01_KNOWLEDGE_BASE/LOCAL_SEO_PLAYBOOK.md`
- `01_KNOWLEDGE_BASE/GEO_AI_SEARCH_RULES.md`

## Output atteso

- Piano NAP.
- Orari.
- Mappa e indicazioni.
- Zone servite reali.
- Prove di fiducia.
- Schema LocalBusiness.
- FAQ locali.
- Entita e blocchi citabili.
- Stato di verifica per ogni segnale locale.
- Decisione su inclusione in HTML, schema o entrambi.
- Segnali esclusi per dato mancante o non verificato.
- Coerenza dei segnali con archetipo, modificatori e delta cliente registrati nello step 01.

## Criteri minimi di qualita

- I segnali locali sono veri o dichiarati come mancanti.
- Le informazioni importanti sono previste in HTML.
- I dati strutturati non aggiungono dati invisibili o inventati.
- FAQ e blocchi citabili rispondono a domande reali.
- Ogni segnale ha una fonte: `PRODUCT.md`, `LOCAL_CONTEXT.md`, cliente, Google Business Profile o assunzione dichiarata.
- Le prove di fiducia sono concrete e verificabili.
- Le aree servite non diventano pagine doorway.
- Lo schema usa solo proprieta coerenti con contenuto visibile e tipo di business.
- I blocchi GEO sono utili a persone e sistemi: brevi, specifici, verificabili.

## Blocchi che impediscono lo step successivo

- NAP inventato.
- Aree servite non reali.
- Schema non coerente con contenuto visibile.
- Dati locali nascosti in immagini o script.
- Recensioni, rating, anni di attivita, certificazioni o coordinate non verificati.
- FAQ locali generate da keyword e non da bisogni reali.
- Mancata indicazione di quali segnali vanno in HTML e quali nello schema.

## Metodo

1. Compilare il piano segnali partendo da dati verificati: `PRODUCT.md`, `LOCAL_CONTEXT.md` o conferma cliente; il resto va in segnali esclusi o da verificare.
2. Decidere per ogni segnale dove vive: HTML visibile, schema o entrambi; l'HTML viene prima dello schema.
3. Mantenere il NAP identico carattere per carattere tra HTML, schema e Google Business Profile.
4. Escludere markup deprecati e rispettare i vincoli in `01_KNOWLEDGE_BASE/TECHNICAL_SEO_QA.md`, sezione controlli dati strutturati.
5. Pianificare i blocchi citabili GEO con fonte e pagina di destinazione.
6. Usare i segnali candidati del preset solo quando compatibili con modello operativo, sedi e dati verificati; il preset non rende automaticamente idoneo alcun tipo di schema.

## Euristiche operative

- `@context` obbligatorio: `https://schema.org`.
- Usare il sottotipo LocalBusiness piu specifico solo se la categoria e confermata; altrimenti restare su `LocalBusiness`.
- Telefono in formato internazionale (`+39...`).
- Nessun tag HTML dentro i testi dello schema.
- Breadcrumb solo per pagine interne approvate (Home, sezione, pagina), mai su siti single-page.

## Piano segnali locali/GEO

| Segnale | Dove appare in HTML | Fonte dato | Stato verifica | Origine | Idoneo per schema | Note |
| --- | --- | --- | --- | --- | --- | --- |
| NAP |  |  |  |  |  |  |
| Orari |  |  |  |  |  |  |
| Area servita |  |  |  |  |  |  |
| Prove di fiducia |  |  |  |  |  |  |
| LocalBusiness schema |  |  |  |  |  |  |

`Stato verifica` ammette anche `non pubblicabile` (vedi `00_SYSTEM/ARTIFACT_CONTRACTS.md`, sezione `Stati del contenuto`): il segnale non entra ne in HTML ne nello schema. `Origine` vale `primario`, `secondario` o `delta cliente` e dichiara se il segnale e un candidato del preset o nasce dai dati reali del cliente.

## Blocchi citabili GEO

| Blocco | Pagina/sezione | Informazione chiave | Fonte | Rischio/nota |
| --- | --- | --- | --- | --- |
| Business Entity Summary |  |  |  |  |
| Visit/Contact block |  |  |  |  |
| FAQ locale |  |  |  |  |

## Segnali esclusi o da verificare

| Segnale | Motivo | Azione richiesta |
| --- | --- | --- |
|  |  |  |

## Decisioni prese

- 

## Assunzioni e rischi

- 

## Collegamento a SITE_STRATEGY.md

Questo step alimenta `Local/GEO Signals`, dati strutturati, FAQ e QA tecnico.
