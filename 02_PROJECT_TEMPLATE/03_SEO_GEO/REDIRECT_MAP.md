# Redirect map

## Funzione

Mappa redirect 301 vecchio -> nuovo per i progetti che sostituiscono un sito esistente. Artifact condizionale: compilare solo se esiste un sito precedente. Se e confermato che non esiste, tracciare il fatto in `01_INPUT/CLIENT_BRIEF.md` e lasciare questo file non compilato: solo questo caso esenta dalla mappa. Se l'esistenza non e nota, tracciare la lacuna in `01_INPUT/MISSING_INFO.md`: la consegna reale resta bloccata finche il cliente non conferma oppure non si compilano inventario e mappa (per le run dichiarate di test vale l'eccezione di `00_SYSTEM/GATING_RULES.md`, Gate 5).

## Input richiesti

- Inventario URL del sito precedente (fase brief: `01_INPUT/CLIENT_BRIEF.md`, altrimenti lacuna in `01_INPUT/MISSING_INFO.md`)
- Sitemap approvata (`03_SITEMAP_DECISION_ENGINE.md`, sezione Approvazione utente)

## Mappa redirect

Una riga per ogni URL vecchia raggiungibile o indicizzata. Le URL vecchie senza equivalente diretto puntano alla pagina piu pertinente, mai tutte alla home per default; le esclusioni (410 o nessun redirect) vanno motivate.

| URL vecchia | URL nuova | Tipo | Motivo/note |
| --- | --- | --- | --- |
|  |  | 301 |  |

## Decisioni prese

- 

## Assunzioni e rischi

- 

## Criterio di completezza

Ogni URL dell'inventario ha una destinazione o una esclusione motivata; nessuna URL vecchia senza decisione. Il formato deployabile (es. `_redirects`, `.htaccess`) e un derivato di questa mappa in base all'hosting scelto, mai la fonte.
