# 02 Local Intent Mapper

## Funzione

Mappare intenti di ricerca locali, commerciali, informativi, trust e visita/contatto.

## Input richiesti

- `01_BRIEF_NORMALIZER.md`
- `01_INPUT/PRODUCT.md`
- `02_CONTEXT/TARGET_KEYWORDS.md`
- `01_KNOWLEDGE_BASE/SEO_BEST_PRACTICES.md`
- `01_KNOWLEDGE_BASE/LOCAL_SEO_PLAYBOOK.md`
- preset primario e secondario selezionati in `01_BRIEF_NORMALIZER.md`

## Output atteso

Search Intent Map con:

- intenti principali;
- intenti secondari;
- intenti informativi;
- intenti trust;
- intenti visita/contatto;
- query locali possibili;
- pagine candidate o sezioni candidate;
- motivo per cui l'intento richiede una pagina autonoma oppure una sezione;
- rischi di duplicazione, thin content o doorway.

## Criteri minimi di qualita

- Ogni keyword o query e collegata a un intento.
- Gli intenti sono descritti dal punto di vista utente.
- Non si propone una pagina autonoma senza motivo.
- Le query locali sono raggruppate per bisogno reale, non per semplice variazione lessicale.
- Ogni intento candidato ha un comportamento atteso: visita, chiamata, WhatsApp, preventivo, prenotazione, acquisto o approfondimento.
- Gli intenti trust distinguono prove verificabili da claim da confermare.
- Le domande informative sono utili a clienti locali reali, non solo a coprire keyword long-tail.

## Blocchi che impediscono lo step successivo

- Elenco keyword senza interpretazione.
- Intenti duplicati o indistinguibili.
- Query locali non coerenti con la sede o l'area reale.
- Intenti creati solo per citta, quartieri o keyword varianti senza contenuto specifico.
- Intenti basati su servizi, prodotti o aree non presenti in `PRODUCT.md` o non dichiarati come lacuna.
- Mancata distinzione tra pagina candidata e sezione candidata.

## Metodo

1. Partire dalla Business Entity Summary e mappare i bisogni reali: cosa cerca un cliente locale prima di chiamare, visitare o comprare.
2. Classificare l'intento primario come commerciale o transazionale locale; gli intenti informativi restano di supporto, mai primari.
3. Raggruppare le query per bisogno, non per variante lessicale; le query long-tail (4-7 parole) diventano candidate FAQ, non pagine.
4. Compilare `Query da non inseguire` con le query adiacenti che attirano il pubblico sbagliato: curiosi, fai-da-te, fuori area.
5. Assegnare a ogni intento un comportamento atteso e una pagina o sezione candidata con motivo.
6. Usare gli intenti del preset solo come candidati. Segnalare nella colonna `Origine` se una riga deriva dal primario, dal secondario o dal delta cliente; scartare ogni candidato non sostenuto dagli input reali.

## Search Intent Map

| Intento | Tipo | Query possibili | Bisogno utente | Comportamento atteso | Pagina/sezione candidata | Origine | Motivo | Rischio |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |

## Query da non inseguire

| Query/intento escluso | Motivo esclusione | Rischio evitato |
| --- | --- | --- |
|  |  |  |

## Decisioni prese

- 

## Assunzioni e rischi

- 

## Collegamento a SITE_STRATEGY.md

Questo step alimenta `Search Intent Map`, `Sitemap` e `Page Blueprints`.
