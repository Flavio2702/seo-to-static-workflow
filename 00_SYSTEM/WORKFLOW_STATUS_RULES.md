# Regole stato workflow

Ogni progetto cliente deve avere `WORKFLOW_STATUS.md`.

## Campi minimi

- fase corrente;
- origine progetto e slug cliente;
- primo prompt o brief persistito;
- allegati e materiali visuali inventariati;
- artifact presenti;
- artifact mancanti;
- bridge Impeccable locali presenti o mancanti (`PRODUCT.md`, `DESIGN.md` nella root cliente);
- step SEO/GEO completati;
- validita corrente dei gate, con stato `non superato`, `corrente` o `non corrente` e checkpoint storico di riferimento;
- stato consegna: `non pronta`, `pronta`, `consegnata` o `sospesa`;
- ciclo QA corrente nel formato semplice `QA-NNN`, con ID del checkpoint `handoff_qa` e della ripresa `sessione` collegati, oppure `n/a` prima del primo handoff;
- validita corrente di `06_QA/QA_REPORT.md` (`non verificato`, `corrente` o `superseded`) e `06_QA/FINAL_CHECKLIST.md` (`non corrente` o `corrente`);
- stato pilot hook advisory: `vietato`, `pendente - slug non fornito`, `autorizzato`, `attivo`, `disattivato` o `interrotto`, con slug test e ultimo checkpoint `hook_pilot` quando applicabili;
- stato Fast Lane: `non usata`, `candidata`, `preflight fallito`, `attiva`, `fallback classic`, `chiusa`, con ultimo checkpoint `home_lock` e `family_assessment` quando applicabili;
- blocchi aperti;
- assunzioni critiche;
- decisioni aperte;
- prossima verifica dati locali;
- prossima azione;
- data ultimo aggiornamento.

## Stati consigliati

- `waiting_for_brief`
- `product_compilation`
- `product_blocked`
- `seo_geo_in_progress`
- `seo_geo_blocked`
- `ready_for_design`
- `design_in_progress`
- `ready_for_static_build`
- `site_build_in_progress`
- `qa_in_progress`
- `qa_blocked`
- `ready_for_delivery`

## Regola

Se un file obbligatorio manca, lo stato deve dichiararlo esplicitamente. Non assumere che una fase sia completa perche e stata discussa in chat.

Le decisioni aperte e i dati locali da verificare devono restare visibili nello stato finche non sono risolti o accettati come rischio.

Per un cliente, lo stato vale solo dentro `projects/<cliente>/`. Non usare `docs/LIMITI.md` root per tracciare avanzamento cliente.

Il run log conserva lo storico append-only: un checkpoint gate resta vero come evento anche se il gate non e piu valido. `WORKFLOW_STATUS.md` dichiara invece la validita corrente. La presenza di un vecchio checkpoint `Gate 5` non autorizza una nuova consegna se lo status lo marca `non corrente`.

## Riapertura dopo Gate 5

Qualunque modifica successiva a Gate 5 che cambia sito, strategia, design, dati pubblicati o condizioni verificate riapre la fase pertinente. Nello stesso passaggio:

- impostare la fase corrente alla fase riaperta;
- marcare Gate 5 `non corrente`, senza cancellarne il checkpoint storico;
- impostare la consegna a `sospesa`;
- marcare `06_QA/QA_REPORT.md` come `superseded` e `06_QA/FINAL_CHECKLIST.md` come `non corrente`;
- aprire un blocco `nuovo handoff QA obbligatorio`;
- registrare un checkpoint `blocco` nel run log con il ciclo QA invalidato e il motivo.

Dopo le correzioni serve un nuovo ciclo `QA-NNN`, con numero incrementato, un nuovo checkpoint `handoff_qa`, una nuova ripresa QA da reset sanzionato e un nuovo Gate 5. Non riusare handoff, sessione, evidenze o checklist del ciclo superseded come prova corrente.

Lo status deve segnalare come blocco:

- progetto non creato da `02_PROJECT_TEMPLATE/`;
- primo prompt o brief non persistito in `01_INPUT/CLIENT_BRIEF.md`;
- allegati o reference visuali non inventariati;
- `Keyword per pagina` non coincidente con lo snapshot sitemap approvato o senza fonti prima di Gate 3;
- selezione archetipo assente o invalida: primario mancante, piu di un secondario, secondario non documentato, modificatori fuori registro o delta non propagato in `SITE_STRATEGY.md`;
- modificatore non supportato rilevato: settore regolato, sedi multiple o modello operativo ibrido. Il progetto non prosegue oltre Gate 1 senza decisione utente in `07_HISTORY/DECISION_LOG.md`; il blocco resta aperto anche se il ramo emerge dopo Gate 1 (vedi `00_SYSTEM/GATING_RULES.md`, Gate 1);
- selezione archetipo con confidenza bassa o primario ambiguo senza decisione utente: due percorsi di pari peso dichiarati dal brief oppure `Confidenza: bassa` nello step 01 senza decisione aperta con owner Utente. Blocca Gate 3;
- brief di persuasione pagina mancante prima di Gate 3 o contaminato da modalita, mood, palette, font, componenti, layout o direzione visuale derivati dal preset;
- stato del sito precedente non noto: lacuna ammessa fino a Gate 3 ma blocco della consegna reale a Gate 5, salvo run di test dichiarata;
- working directory non dentro `projects/<cliente>/` durante design/Impeccable;
- bridge locali mancanti o non coerenti con gli artifact canonici;
- evidenze QA salvate fuori da `06_QA/evidence/` quando devono essere conservate.
- qualunque evidenza nuova in `06_QA/evidence/` priva di un checkpoint contemporaneo e precedente che ne spieghi produzione, ciclo QA e origine; e un blocco di audit: registrare path e motivo, rimuovere il file non valido dalla cartella di consegna, ripetere correttamente il ciclo e chiudere il blocco con un nuovo checkpoint; non associarla retroattivamente;
- mock non salvato in `04_DESIGN/reference_assets/` senza deviazione `mock assente` approvata dall'utente e tracciata in `07_HISTORY/DECISION_LOG.md`;
- `MOCK_IMPLEMENTATION_SPEC.md` mancante o non compilato (sempre, con o senza mock);
- preflight Impeccable incompleto o fallito: `context_load` assente nella sessione corrente, target/cwd/versione non conformi, un campo obbligatorio (versione Impeccable, target, working directory, client root, estratto `RESOLVED_CONTEXT`) vuoto o valorizzato `non letto`, `non letta` o `n.d.`, product risolto sul canonico `01_INPUT/PRODUCT.md` o su un path della root condivisa invece che sul bridge `PRODUCT.md` della root cliente, oppure `bridge_preflight` assente o precedente all'ultima compilazione o aggiornamento dei bridge; dopo un bridge update si ripete `bridge_preflight`, non `context.mjs`;
- catena Impeccable non verificabile prima di `handoff_qa` sulle pagine valutate direttamente: `shape` o `craft` non eseguiti, checkpoint `polish`/`adapt` mancanti per pagina, critique reale assente, score non collegato al critique, oppure Build checklist di `MOCK_IMPLEMENTATION_SPEC.md` non chiusa. Per le route `family_coverage` manca invece il batch `family_assessment` corrente o il checkpoint `adapt`;
- comando della sequenza standard Impeccable non eseguito senza checkpoint `saltato` con motivo; il critique QA e saltabile solo con la decisione separata prevista da Gate 5;
- score build mancante o sotto soglia senza deviazione `score sotto soglia` per una pagina valutata direttamente (route `direct`, rappresentante di layout family, `direct_only`, Classic Lane, fallback), oppure score QA mancante o sotto soglia senza la distinta decisione `score QA sotto soglia` riferita al checkpoint fresco per una qualunque route consegnata. In build le route `family_coverage` sono fuori dal perimetro dello score, in QA sono dentro: perimetro vincolante in `00_SYSTEM/GATING_RULES.md`, Gate 5;
- gate, `context_load`, `bridge_preflight` o comando Impeccable eseguito senza checkpoint in `07_HISTORY/E2E_RUN_LOG.md`.
- campi `new-work` mancanti nei canonici prima di Gate 4, oppure direction contract, seed/key, challenger o note di processo presenti nei commenti o nel copy di `05_SITE/`;
- checkpoint `craft` privo del dettaglio `upstream_flow: new-work`;
- Fast Lane candidata senza Design Delta, layout family candidate, signature, rappresentante o route `direct_only` registrati nei canonici;
- Fast Lane attiva senza capability preflight riuscito su DOM renderizzato, checkpoint `home_lock` corrente o checkpoint `family_assessment` corrente;
- pagina consegnata con `coverage_status: failed`, `promotion_required` non risolto, `blocked_pending_classic` aperto, score ereditato dal rappresentante, oppure QA fresco senza rerun batch/signature su tutte le URL;
- score build preteso o registrato su una route `family_coverage`, oppure rappresentante di layout family non risultante `assessment_mode: direct` nell'output del verifier;
- score QA mancante su una route `family_coverage`: la copertura familiare vale solo per la build e non esonera nessuna route dal critique, dal detector e dallo score della sessione QA fresca;
- pilot hook attivo fuori da un progetto test autorizzato, prima di Gate 4, durante design, handoff o QA, privo di checkpoint `hook_pilot`, usato come detector/score/evidenza, oppure non confermato `off` prima di `handoff_qa`;
- stato corrente che dichiara Gate 5 valido o consegna pronta mentre QA report e checklist non sono entrambi `corrente`;
- ciclo QA, handoff o ripresa QA mancanti o non concordanti fra status, run log e QA report.
