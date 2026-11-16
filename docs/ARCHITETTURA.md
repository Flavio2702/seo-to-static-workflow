# Architettura e scelte

Questa guida pubblica sostituisce il riferimento al documento Word privato nella
distribuzione. I contratti operativi completi restano in `00_SYSTEM/`.

| Modulo | Responsabilita |
| --- | --- |
| 00_SYSTEM | Pipeline, gate, contratti, stato, rendering e procedure design/QA |
| 01_KNOWLEDGE_BASE | Regole SEO, local, GEO, accessibilita e quattro archetipi |
| 02_PROJECT_TEMPLATE | Input, contesto, sette step, strategia, design, sito, QA e storico vuoti |
| 03_SHARED_ASSETS | Spazio per asset riutilizzabili con provenienza; nessun asset obbligatorio |
| 04_TOOLS | Preflight PowerShell e verificatore DOM Fast Lane originale adattato |
| scripts | Nuovi strumenti limitati a bootstrap e riproduzione della demo |
| demo | Nuovo brief sintetico, elaborati assistiti, contratto e sito renderizzato |
| tests | Controlli aggiunti su propagazione, errori, file e isolamento |

## Ordine e contratto di handoff

Normalizzazione -> intenti -> sitemap -> blueprint -> heading -> segnali -> QA
strategico -> SITE_STRATEGY -> design -> sito -> QA. Ogni passaggio usa output
persistenti. Lo stato e per progetto; PRODUCT e DESIGN nella root cliente sono
bridge dell'integrazione design, non fonti canoniche.

Nel progetto originario la propagazione e una procedura assistita documentale.
Nella demo aggiungiamo `strategy.json` come contratto esplicito, con intenti, fonti,
URL, testi, metadati e link. Il renderer lo consuma e i test confrontano il risultato.
Questo dimostra la propagazione del caso sintetico; non rende automatici gli step SEO.

## Scelte della distribuzione

Nessun framework, database, backend o integrazione marketing aggiunta. HTML/CSS e
JSON-LD senza JavaScript eseguibile nella demo. Navigazione sempre visibile.
Font di sistema: nessun download o tracking. Illustrazione decorativa originale in CSS.
No LocalBusiness fittizio, no moduli, no analytics. Noindex intenzionale.

Fast Lane controlla il DOM e decide quando una route richiede una verifica diretta.
Il punteggio costante dell'originale e stato eliminato: una misura strutturale non
puo attribuire un voto visivo. Lo strumento mantiene il limite di site_root interno
al proprio spazio; per clienti reali resta necessario gestire consapevolmente il mirror.

## Modifiche mirate al codice conservato

- Comandi di test e launcher del verifier compatibili con Windows e Linux.
- Dipendenza Playwright fissata con lockfile.
- Rifiuto di input top-level malformati e percorso sibling fuori perimetro.
- Gestione URI malformate nei server locali e confinamento dei percorsi.
- Chiusura browser/server prima del termine del batch.
- Wrapper design configurabile e compatibile con launcher precedente e attuale.

Non sono stati riscritti il sistema SEO, il modello a gate o il verificatore DOM.
