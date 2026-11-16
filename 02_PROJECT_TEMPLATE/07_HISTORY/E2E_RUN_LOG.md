# E2E run log

## Funzione

Log di esecuzione a checkpoint per l'audit del flusso. Serve a ricostruire a posteriori dove un dato si e perso o dove il flusso ha deviato. Non sostituisce `WORKFLOW_STATUS.md`: lo status dice dove sei, il run log dice cosa e successo.

## Regole

- Append-only: aggiungere righe, mai modificare o cancellare quelle precedenti.
- Una riga per checkpoint, al momento in cui avviene, non a fine fase.
- Checkpoint obbligatori:
  - superamento di un gate (1-5), come evento storico; la validita corrente resta in `WORKFLOW_STATUS.md`;
  - `context_load` Impeccable una volta per sessione, con versione, target, cwd, client root ed estratto `RESOLVED_CONTEXT`;
  - `bridge_preflight` prima del primo comando Impeccable e dopo ogni aggiornamento dei bridge, con path e hash dei bridge/canonici richiesti;
  - `render_preflight` all'inizio di ogni ciclo render, dopo verifica HTTP di status/firme e prima degli screenshot; evidenze precedenti al checkpoint o checkpoint ricostruiti a posteriori non sono validi;
  - ogni comando Impeccable lanciato (comando, working directory, esito) e ogni comando della sequenza standard saltato (esito `saltato`, con motivo);
  - eventuale pilot hook advisory: checkpoint `hook_pilot` per ogni transizione `on` o `off`, solo nel progetto test autorizzato e dopo Gate 4;
  - se si usa Fast Lane: checkpoint `home_lock` dopo `craft home` e checkpoint `family_assessment` per capability preflight, batch signature, rappresentante, coverage e fallback;
  - catena ordinata prima di `handoff_qa`, sulle pagine valutate direttamente: `shape` riuscito prima del mock; `craft` riuscito; per ogni pagina `polish` e `adapt` riusciti o `saltato` con motivo; critique realmente eseguito; score prodotto da quel critique. Per le route in `family_coverage` la catena e il checkpoint `family_assessment` del batch piu `adapt` riuscito o `saltato` con motivo, perche `adapt` resta valutato su ogni pagina consegnata. Ogni checkpoint pagina riporta route/path e resta distinto, mai aggregato;
  - score netto di chiusura del loop di rifinitura, uno per ogni pagina valutata direttamente (tipo `score`: pagina, score netto, euristiche escluse e finding detector ignorati con riferimento puntuale alla lacuna, oppure deviazione `score sotto soglia` con riferimento in `DECISION_LOG.md`); senza questi checkpoint la chiusura build non e valida. Producono `score` in build le route `direct`, il rappresentante di ogni layout family, le route `direct_only`, le route Classic Lane e i fallback Classic. Non lo producono le route in `family_coverage`: la loro prova di chiusura build e il checkpoint `family_assessment` con `coverage_status: verified` e `coverage_ref` al batch corrente, e uno `score` registrato su una di esse e uno score ereditato, quindi una non conformita. In sessione QA fresca il perimetro cambia: ogni route consegnata, `family_coverage` incluse, riceve critique, detector e score autonomi. Perimetro vincolante in `00_SYSTEM/GATING_RULES.md`, Gate 5;
  - chiusura della Build checklist di `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md` (tipo `build_checklist`: stato `chiusa`, data, eventuali `n/a` motivati e riferimento allo spec), dopo le catene pagina e prima di `handoff_qa`;
  - compilazione o aggiornamento dei bridge `PRODUCT.md` e `DESIGN.md` (fonti usate);
  - apertura o risoluzione di un blocco;
  - handoff QA dopo build completata e prima del QA finale, con successivo ID semplice `QA-NNN`;
  - ogni ripresa di sessione: `ripresa ordinaria` se non segue un confine sanzionato, oppure `ripresa da reset Gate 3`, `ripresa da reset Gate 4` o `ripresa da reset handoff_qa`; quest'ultima cita ciclo `QA-NNN` e ID handoff;
  - reset di sessione declinato dall'utente ai gate 3 o 4 (tipo `sessione`, dettaglio specifico del gate); all'handoff QA il reset non e declinabile;
  - invalidazione dopo Gate 5 (tipo `blocco`: fase riaperta, ciclo QA superseded, Gate 5 non corrente, consegna sospesa, nuovo handoff obbligatorio).
- Per ogni `context_load` incollare l'estratto `RESOLVED_CONTEXT` dell'output di `context.mjs` nella sezione `Estratti context load e bridge preflight` e citarne l'ID nella riga del checkpoint. E la prova del target, della versione e dei bridge caricati nella sessione corrente.
- Formato del dettaglio per `context_load`: `versione Impeccable; target cliente-relative; working directory effettiva; client root; product risolto: bridge cliente si / no; esito; ID estratto RESOLVED_CONTEXT`. Tutti i campi sono obbligatori e vanno risolti dall'output reale di `context.mjs`: un campo vuoto o valorizzato `non letto`, `non letta` o `n.d.` rende il checkpoint `fallito`, non e una nota informativa e non passa Gate 4 ne Gate 5. Il campo `product risolto` vale `si` solo se `RESOLVED_CONTEXT` mostra come product il bridge `PRODUCT.md` della root del progetto cliente; `01_INPUT/PRODUCT.md`, un altro canonico o un path della root condivisa valgono `no` e rendono il checkpoint `fallito`. E una sola esecuzione per sessione. Se fallisce, registrare il checkpoint e aprire un blocco; non rilanciarlo per correggere bridge aggiornati nella stessa sessione.
- Formato del dettaglio per `bridge_preflight`: `target cliente-relative; working directory; design richiesto si|no; product bridge path + sha256; product canonico path + sha256; design bridge/canonico/spec path + sha256 se richiesti; identita cliente coerente si|no`. Ripeterlo dopo ogni modifica ai bridge e prima del comando successivo. Non esegue `context.mjs`.
- Formato del dettaglio per `craft`: includere sempre `upstream_flow: new-work` oltre a comando, target, working directory ed esito.
- Formato del dettaglio per `home_lock`: `home_lock_id; checkpoint craft origine; CSS globale hash/id; JS condiviso hash/id; header hash/id; footer hash/id; componenti e asset portanti; invalidatori; esito corrente|invalidato`.
- Formato del dettaglio per `family_assessment`: `batch/run ID; capability preflight esito; output verifier; rappresentante; route -> assessment_mode, visual_score, coverage_status, coverage_ref, promotion_required, fallback Classic; determinismo; esito`. Le pagine con `family_coverage` hanno `visual_score: n.a.`, non producono checkpoint `score` in build e passano solo con `coverage_status: verified` piu `coverage_ref` a questo batch; uno score ereditato dal rappresentante invalida il batch. Il rappresentante deve comparire come `assessment_mode: direct` nell'output del verifier riportato nel checkpoint: se il ruolo risulta solo da una dichiarazione dell'orchestratore o da una reinterpretazione manuale dell'output, la copertura familiare del batch non vale.
- Formato del dettaglio per `hook_pilot`: `transizione on|off; versione; target; working directory; config path; manifest path; finding rule + file; evento Stop osservabile si|no; confronto detector esplicito; ignore decisione + scope oppure n.a.`. Un finding privo di `rule` o `file`, una scrittura fuori cliente o uno Stop non osservabile interrompono il pilot e richiedono `off` e blocco. Il checkpoint non produce score o prova di consegna.
- Compatibilita storica: le righe gia registrate con tipo `preflight` restano valide per le run precedenti e non si riscrivono. Le nuove run usano `context_load` e `bridge_preflight` distinti.
- Formato del dettaglio per `render_preflight`: `fase build|qa; ciclo QA-NNN|n.a.; run-ts; interprete comando/path + versione; browser strumento/path + versione o esito check; modalita shell_persistente|ciclo_atomico; working directory; escalation non richiesta|richiesta + esito; porta; route -> firma attesa e verificata`. Se fallisce, registrare il campo mancante o l'errore osservato con esito `fallito`, poi aprire il checkpoint `blocco` previsto dal playbook.
- Formato del dettaglio per i checkpoint `score` (rubrica canonica: 10 euristiche di Nielsen del critique Impeccable, 0-4 ciascuna, vedi `00_SYSTEM/IMPECCABLE_PLAYBOOK.md`): `pagina; critique origine: ID checkpoint realmente eseguito; punteggi 4,3,3,2,4,3,3,4,2,3; media X.X su N valutabili; esclusioni: euristica -> lacuna (rif.) oppure falso positivo strumentale -> prova file:riga; detector: pulito/finding esclusi (rif.) + path o estratto output detect.mjs; decisione: chiusa / blocco / deviazione score sotto soglia (rif. DECISION_LOG)`. Un esito detector senza output conservato non vale. Lo score va registrato subito dopo il critique che lo produce, mai ricostruito a posteriori.
- Punteggi fotocopia sono un finding: una sequenza identica su pagine diverse o identica tra build e QA richiede motivazione puntuale nel checkpoint; senza motivazione la valutazione va rifatta. `Falso positivo strumentale` vale solo con prova tecnica puntuale nei file e conta nel tetto di esclusioni del playbook.
- Il checkpoint `handoff_qa` cita ciclo `QA-NNN`, stato `chiusa`, data e checkpoint della Build checklist in `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md`; se la checklist non e chiusa o la catena pagina non e completa, non va registrato. Ogni nuovo handoff incrementa `NNN`, anche dopo un ciclo superseded.
- La deviazione `score sotto soglia` del checkpoint `score` riguarda solo la chiusura build. Se il critique QA fresco e sotto soglia, il checkpoint `impeccable` viene registrato subito con esito bloccante; l'eventuale decisione successiva `score QA sotto soglia` cita pagina, score QA e ID di quel checkpoint. Il run log e append-only: non modificare retroattivamente il checkpoint. La decisione build non e riutilizzabile.
- Ogni file nuovo in `06_QA/evidence/` deve essere riconducibile a un checkpoint precedente e contemporaneo, con ciclo/fase e origine. Una evidenza orfana apre subito un checkpoint `blocco` con path e motivo; dopo la registrazione va rimossa dalla cartella di consegna, il ciclo va ripetuto e un nuovo checkpoint deve chiudere il blocco citando le prove valide. Non cancellare la riga storica e non creare un checkpoint retroattivo per sanare il file originario.

## Checkpoint

| ID | Data | Tipo | Dettaglio | Esito | Evidenza/fonte |
| --- | --- | --- | --- | --- | --- |
|  |  | gate / context_load / bridge_preflight / preflight (solo storico) / render_preflight / impeccable / home_lock / family_assessment / hook_pilot / score / build_checklist / bridge / blocco / handoff_qa / sessione |  | ok / fallito / bloccato / saltato |  |

## Estratti context load e bridge preflight

Un blocco per checkpoint, con ID citato nella tabella. `context_load` conserva `RESOLVED_CONTEXT`; `bridge_preflight` conserva path e hash stampati dal wrapper.

Nel blocco `context_load` tutte le voci sono obbligatorie e vanno riempite con quanto stampato dallo strumento. Una voce lasciata vuota o compilata `non letto`, `non letta` o `n.d.` rende il checkpoint `fallito`: non si prosegue leggendo il dato a mano e non si passa Gate 4 o Gate 5.

### CL-001

- Data:
- Versione Impeccable:
- Target:
- Working directory:
- Client root:
- Product risolto: bridge cliente si / no (`no` se risolve `01_INPUT/PRODUCT.md`, un altro canonico o un path della root condivisa: checkpoint `fallito`)
- Output `context.mjs` (`RESOLVED_CONTEXT`):

```
(incollare qui)
```

- Nome attivita nel bridge stampato coerente con questo cliente: si / no

### BP-001

- Data:
- Target:
- Working directory:
- Design richiesto: si / no
- Output `bridge_preflight`:

```
(incollare path e hash stampati dal wrapper)
```

- Nome attivita e fonti dei bridge coerenti con questo cliente: si / no
