# Gating rules

## Registrazione dei gate

Il superamento di ogni gate va registrato con una riga di checkpoint in `07_HISTORY/E2E_RUN_LOG.md` (data, gate, artifact verificati) e, nello stesso passaggio, la sua validita va aggiornata in `WORKFLOW_STATUS.md`. Il run log conserva lo storico degli eventi; lo status dichiara la validita corrente. Un gate senza riga nel run log non e considerato superato, ma una vecchia riga non rende il gate corrente se lo status lo marca `non corrente`.

Ai gate 3 e 4, dopo la registrazione, l'orchestratore segnala all'utente il punto di reset di sessione secondo `00_SYSTEM/WORKFLOW_OVERVIEW.md` (sezione Confini di sessione). Dopo la build e prima del QA finale, il reset avviene tramite checkpoint `handoff_qa`, non dopo Gate 5. Il checkpoint `handoff_qa` va registrato solo a chiusura build completa secondo `00_SYSTEM/IMPECCABLE_PLAYBOOK.md` (sezione Chiusura fase build): catena ordinata `shape -> craft -> polish/adapt per pagina -> critique reale -> score` sulle pagine valutate direttamente, eventuale Fast Lane con coverage ledger valido e fallback Classic risolti, score netto sopra soglia o deviazione approvata per ogni pagina valutata direttamente (le route `family_coverage` chiudono con `coverage_status: verified` e `coverage_ref`, senza score build: vedi Gate 5), e Build checklist di `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md` chiusa con stato, data e checkpoint.

## Gate 1: avvio SEO/GEO

Non iniziare `03_SEO_GEO/` se:

- il progetto cliente non vive in `projects/<cliente>/`;
- il progetto e stato copiato da un cliente precedente invece che da `02_PROJECT_TEMPLATE/`;
- il primo prompt o brief ricevuto non e stato persistito in `01_INPUT/CLIENT_BRIEF.md`;
- allegati, link o materiali visuali ricevuti non sono inventariati in `01_INPUT/CLIENT_BRIEF.md`;
- `01_INPUT/PRODUCT.md` manca;
- Identita attivita, offerta, target o CTA primaria sono assenti.
- I dati locali sono assenti e non sono dichiarati in `MISSING_INFO.md`.
- Le assunzioni critiche non sono esplicite.

### Rami non supportati rilevati dal brief

I rami `Settore: regolato`, `Sedi: multipla` e `Modello operativo: ibrido` sono dichiarati `non supportato` in `01_KNOWLEDGE_BASE/SEO_GEO_ARCHETYPES/README.md`, sezione `Rami non supportati`. La condizione si valuta qui sui segnali del brief, non sul modificatore registrato: il modificatore nasce nello step 01, che e gia dentro `03_SEO_GEO/`, quindi a valle di questo gate.

Non iniziare `03_SEO_GEO/` se il brief o i materiali ricevuti descrivono:

- un'attivita in settore regolato, cioe che per esercitare richiede autorizzazione, abilitazione, iscrizione a un albo o vigilanza di un'autorita: farmacia o parafarmacia, ambulatorio, studio o servizio sanitario, servizi finanziari, creditizi o assicurativi, studio legale o notarile, formazione accreditata e casi analoghi. Ramo `Settore: regolato`;
- piu di un indirizzo operativo aperto al pubblico, anche se le sedi sono nella stessa citta. Ramo `Sedi: multipla`;
- insieme una sede visitabile e un servizio erogato su area senza indirizzo proprio (domicilio, cantiere, intervento presso il cliente). Ramo `Modello operativo: ibrido`.

In tutti e tre i casi il progetto non prosegue oltre Gate 1. Nello stesso passaggio: registrare in `WORKFLOW_STATUS.md` il blocco `modificatore non supportato rilevato` con il ramo coinvolto e il segnale del brief che lo ha attivato, registrare il checkpoint `blocco` nel run log e chiedere all'utente la decisione. Le uscite ammesse sono tre: rinunciare al progetto, ridurre il perimetro reale a un ramo supportato (per esempio una sola sede, oppure sede senza servizio su area) con la riduzione documentata dal cliente, oppure estendere il workflow prima di procedere. La decisione va registrata in `07_HISTORY/DECISION_LOG.md` con owner Utente. Nessuna delle tre puo essere presa dall'agente.

## Gate 2: step SEO/GEO sequenziali

Ogni step deve essere completato prima del successivo. Un file di step e completo solo se contiene:

- input usati;
- output prodotto;
- criteri qualita verificati;
- blocchi o errori;
- decisioni prese;
- assunzioni e rischi;
- impatto su `SITE_STRATEGY.md`.

Inoltre lo step 01 non e completo se manca un archetipo primario, contiene piu di un secondario, usa un secondario senza secondo percorso documentato o usa modificatori fuori dal registro `01_KNOWLEDGE_BASE/SEO_GEO_ARCHETYPES/`. La selezione e automatica, non richiede approvazione utente e non introduce un nuovo gate.

Lo step 01 non e completo, e nessuno step successivo puo iniziare, anche se:

- un modificatore registrato vale `regolato`, `multipla` o `ibrido` senza il blocco `modificatore non supportato rilevato` aperto in `WORKFLOW_STATUS.md` e senza la decisione utente in `07_HISTORY/DECISION_LOG.md`. E la rete di sicurezza di Gate 1 per il ramo non supportato che emerge solo leggendo il brief a fondo;
- il brief dichiara due percorsi di pari peso e lo step sceglie comunque un primario con un criterio proprio, oppure la `Confidenza` della selezione e `bassa`, senza che lo step si chiuda con blocco tracciato e decisione aperta con owner Utente in `07_HISTORY/DECISION_LOG.md`. Una confidenza `bassa` non e una nota informativa: e una condizione di stop. La scelta del percorso primario appartiene al cliente, non all'agente.

## Gate 3: avvio design

Non iniziare `04_DESIGN/` se:

- `03_SEO_GEO/SITE_STRATEGY.md` manca;
- `07_SEO_QA_GATE.md` non indica "ok per design";
- sitemap, CTA e pagine escluse non sono definite.
- `SITE_STRATEGY.md` non riporta la stessa applicazione archetipo dello step 01, inclusi versioni, modificatori e delta cliente;
- un modificatore registrato nello step 01 o propagato in `SITE_STRATEGY.md` vale `regolato`, `multipla` o `ibrido`: sono rami `non supportati` (vedi Gate 1). Il design non parte senza la decisione utente in `07_HISTORY/DECISION_LOG.md` che riduce il perimetro a un ramo supportato o autorizza esplicitamente l'estensione del workflow;
- la `Confidenza` della selezione archetipo e `bassa`, oppure il brief dichiara due percorsi di pari peso, e manca la decisione con owner Utente in `07_HISTORY/DECISION_LOG.md` che fissa il primario. La firma dell'utente e obbligatoria prima di Gate 3: senza, il gate non passa, anche se tutti gli altri artifact sono completi;
- una pagina della sitemap non ha il brief di persuasione completo con azione, convinzione, obiezione, prova, asset e verita del primo viewport;
- l'archetipo o il brief di persuasione prescrive modalita Impeccable, mood, palette, font, componenti, layout o direzione visuale;
- la sitemap non risulta approvata dall'utente: serve la decisione in `07_HISTORY/DECISION_LOG.md` con owner Utente, come da step `03_SITEMAP_DECISION_ENGINE.md`; un'approvazione con owner agente non vale;
- lo snapshot di approvazione in `03_SITEMAP_DECISION_ENGINE.md` non ha ID univoco, la riga della decisione non cita lo stesso ID, la sezione append-only `Snapshot approvazione sitemap` del `DECISION_LOG.md` non contiene la copia integrale delle due tabelle approvate, oppure gli snapshot divergono in qualunque campo (pagina, URL, motivo, esito doorway, opzione citta, pagina esclusa o rischio evitato): un riferimento al solo path non vale;
- sitemap, motivazioni o esclusioni di `03_SEO_GEO/SITE_STRATEGY.md` non coincidono con i relativi campi dello snapshot approvato: qualunque modifica invalida l'approvazione e richiede una proposta sintetica del delta all'utente, un nuovo ID snapshot e una nuova decisione; uno snapshot approvato non va sovrascritto;
- `02_CONTEXT/TARGET_KEYWORDS.md`, sezione `Keyword per pagina`, non coincide per pagina e URL con lo snapshot sitemap approvato, contiene righe senza fonte oppure uno slug con intento di ricerca non e coerente con la keyword primaria verificata; la keyword research v1 deve chiudersi nello step 03 prima dell'approvazione;
- l'esistenza di un sito precedente non e registrata: serve nel brief l'esito della domanda (esiste con inventario URL, non esiste confermato) oppure la lacuna aperta in `01_INPUT/MISSING_INFO.md`, come da step `01_BRIEF_NORMALIZER.md`;
- la working directory operativa non e dentro `projects/<cliente>/`;
- si prevede di usare Impeccable dalla root della repo, anche con `--target projects/<cliente>`;
- manca il bridge locale `PRODUCT.md` nella root del progetto cliente;
- manca il bridge locale `DESIGN.md` nella root del progetto cliente;
- sono state ricevute reference visuali ma non sono registrate in `04_DESIGN/REFERENCE_AESTHETICS.md`;
- sono stati ricevuti file reference disponibili ma non sono locali in `04_DESIGN/reference_assets/`;
- reference visuali, screenshot o asset provengono da `docs/` o da un altro cliente in `projects/`;
- i bridge locali non dichiarano che le fonti canoniche sono `01_INPUT/PRODUCT.md`, `03_SEO_GEO/SITE_STRATEGY.md` e `04_DESIGN/DESIGN.md`;
- esistono o vengono usati bridge cliente in `docs/`.

Dopo il superamento di Gate 3, la fase design puo eseguire nell'ordine `shape -> new-work design -> contract canonico -> Design Delta -> iterazioni mock -> approvazione mock finale`. `shape/new-work` usa i brief di persuasione per capire meccanismo, scena, azione e prova, ma sceglie la modalita per la singola superficie e mantiene piena autorita su mondo visuale, forma e composizione. Il round di direzione e le iterazioni intermedie sono decisioni progettuali tracciate, non nuovi gate e non approvazioni bloccanti. La parte design di `new-work` non autorizza Gate 4, build, scritture in `05_SITE/`, `handoff_qa` o QA finale.

La Fast Lane e disponibile solo dopo il `go` dello sprint Design/QA Fast Lane e usa `00_SYSTEM/DESIGN_QA_FAST_LANE_KERNEL.md` come Kernel tecnico. In Gate 3 l'archetipo SEO/GEO puo informare il ruolo funzionale della pagina, ma non assegna layout family, componenti, mood o forma. La layout family candidata nasce nel Design Delta cliente-specifico e resta modificabile finche il mock/spec non chiude Gate 4.

## Gate 4: avvio sito statico

Non iniziare `05_SITE/` se:

- `04_DESIGN/DESIGN.md` manca;
- il design contraddice `03_SEO_GEO/SITE_STRATEGY.md`;
- il bridge locale `DESIGN.md` non e coerente con `04_DESIGN/DESIGN.md`;
- il bridge locale `PRODUCT.md` non e coerente con `01_INPUT/PRODUCT.md` e `03_SEO_GEO/SITE_STRATEGY.md`;
- bridge, `04_DESIGN/DESIGN.md` e `03_SEO_GEO/SITE_STRATEGY.md` non concordano su sitemap, CTA, segnali locali, Pages Not To Create e limiti sui claim;
- contenuti SEO critici non sono stati definiti almeno come placeholder semantici.
- il candidato mock finale approvato non e salvato in `04_DESIGN/reference_assets/` e l'assenza non e registrata come deviazione `mock assente` in `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md` approvata esplicitamente dall'utente e tracciata in `07_HISTORY/DECISION_LOG.md`;
- con mock presente, il candidato mock finale non ha un ID univoco nello spec o non risulta approvato esplicitamente dall'utente in `07_HISTORY/DECISION_LOG.md` con lo stesso ID; bozze e iterazioni intermedie non richiedono approvazione e non sono condizioni di gate;
- `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md` manca o non e compilato (sempre, con o senza mock);
- `04_DESIGN/DESIGN.md`, sezione `Impeccable new-work`, non indica modalita della superficie, direzione scelta, fonte della scelta e rischio dichiarato, oppure la sezione `Direction contract` non contiene `THESIS`, `OWN-WORLD`, `STORY`, `FIRST VIEWPORT` e `FORM`;
- `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md`, sezioni `New-work reproducibility` e `Direction round`, non indica scope, modalita, comando di generazione, seed/key riproducibile, direzione assegnata e challenger realmente presentati, oppure `Mock source` non collega contract, iterazioni e candidato finale;
- se si prevede Fast Lane, `04_DESIGN/DESIGN.md` non dichiara Design Delta, layout family candidate, rappresentante e pagine `direct_only`, oppure `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md` non contiene signature semantica, home lock previsto, assessment ledger e regole di fallback Classic;
- il bridge locale `DESIGN.md` non cita `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md` tra le fonti;
- il preflight di `00_SYSTEM/IMPECCABLE_PLAYBOOK.md` non e completo: manca il checkpoint `context_load` della sessione corrente con versione, target, cwd ed estratto `RESOLVED_CONTEXT`, oppure manca un checkpoint `bridge_preflight -RequireDesign` successivo all'ultima compilazione o aggiornamento dei bridge `PRODUCT.md` e `DESIGN.md`. Dopo una modifica ai bridge si ripete solo `bridge_preflight`, senza rilanciare `context.mjs` nella stessa sessione;
- il checkpoint `context_load` esiste ma ha un campo obbligatorio non risolto. I campi obbligatori sono versione Impeccable, target cliente-relative, working directory effettiva, client root ed estratto `RESOLVED_CONTEXT`. Un campo vuoto, assente o valorizzato `non letto`, `non letta`, `n.d.` o equivalente non soddisfa il preflight: e un fallimento del checkpoint, non una nota informativa. Il checkpoint va registrato con esito `fallito` e il gate non passa;
- l'estratto `RESOLVED_CONTEXT` non mostra come product risolto il bridge `PRODUCT.md` della root del progetto cliente. Se risolve `01_INPUT/PRODUCT.md`, un altro artifact canonico o un path della root condivisa del workflow, il preflight e fallito anche se tutti gli altri campi sono compilati.

## Gate 5: consegna

Non consegnare se:

- `WORKFLOW_STATUS.md` non indica fase `ready_for_delivery`, Gate 5 `non superato` al primo passaggio oppure `non corrente` dopo una invalidazione, consegna `pronta`, ciclo QA `QA-NNN`, checkpoint `handoff_qa` e checkpoint `sessione` di ripresa QA concordanti con il run log; dopo il nuovo checkpoint Gate 5, aggiornare Gate 5 a `corrente` e consegna a `consegnata`;
- nella sessione QA fresca manca il checkpoint `context_load` con versione, target, cwd ed estratto `RESOLVED_CONTEXT`, oppure manca un checkpoint `bridge_preflight -RequireDesign` successivo all'ultimo aggiornamento dei bridge. Un `context_load` della build o un vecchio checkpoint generico `preflight` non soddisfano la sessione QA corrente;
- il `context_load` della sessione QA fresca ha un campo obbligatorio vuoto, assente o valorizzato `non letto`, `non letta` o `n.d.`, oppure il suo `RESOLVED_CONTEXT` non risolve come product il bridge `PRODUCT.md` della root cliente: valgono le stesse due condizioni di Gate 4, senza attenuazioni per la sessione QA;
- `06_QA/QA_REPORT.md` manca;
- `06_QA/FINAL_CHECKLIST.md` non e completata;
- `06_QA/QA_REPORT.md` non indica stato `corrente` e lo stesso ciclo `QA-NNN`, handoff e ripresa QA dello status; anche lo status deve indicare report e checklist `corrente` per lo stesso ciclo;
- la Build checklist di `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md` non risulta chiusa prima del checkpoint `handoff_qa`, oppure ha voci vuote o `n/a` senza motivo e riferimento;
- i controlli contrasto non riportano misure almeno 4.5:1 per testo normale e 3:1 per testo grande e componenti essenziali, inclusi spot-check su hero/collage, CTA, sezioni scure, footer e testo muted; un esito solo descrittivo non basta;
- nel copy visibile resta meta-copy o linguaggio di processo: etichette dello spec, note interne, testo "da confermare", istruzioni di layout o tono;
- ci sono errori critici aperti;
- esistono pagine duplicate, doorway, senza intento o non linkate.
- il progetto sostituisce un sito esistente e `03_SEO_GEO/REDIRECT_MAP.md` manca, e incompleto o non copre l'inventario delle URL vecchie. Esenta solo l'assenza confermata di un sito precedente, tracciata in `01_INPUT/CLIENT_BRIEF.md`. Se l'esistenza non e nota, la lacuna in `01_INPUT/MISSING_INFO.md` non basta: la consegna reale resta bloccata finche il cliente non conferma oppure non si producono inventario e mappa (vale l'eccezione run di test sotto).
- le evidenze QA da conservare sono fuori da `06_QA/evidence/` o non sono citate in `QA_REPORT.md`.
- in `06_QA/evidence/` esiste una evidenza nuova priva di checkpoint contemporaneo e precedente che ne identifichi origine e ciclo QA: un checkpoint ricostruito dopo il file non vale. Per risolvere, registrare il blocco con path e motivo, rimuovere il file non valido dalla cartella di consegna, ripetere correttamente il ciclo e registrare la risoluzione; fino ad allora l'audit resta bloccato;
- la sezione `Mock fidelity QA` di `06_QA/QA_REPORT.md` non e compilata (se il mock e assente per deviazione approvata, va compilata dichiarando la deviazione, non lasciata vuota);
- mancano in `06_QA/evidence/` screenshot desktop e mobile confrontabili con il mock oppure, con deviazione `mock assente` approvata, con `04_DESIGN/DESIGN.md` e `MOCK_IMPLEMENTATION_SPEC.md`;
- esistono sezioni del mock eliminate senza deviazione registrata in `MOCK_IMPLEMENTATION_SPEC.md`.
- nel run log manca un checkpoint `handoff_qa` dopo la build seguito da un checkpoint `sessione` con dettaglio `ripresa da reset handoff_qa`, da sessione o agente fresco prima del QA finale; `ripresa ordinaria` e reset Gate 3/4 declinato non soddisfano questo requisito;
- `handoff_qa`, ripresa `sessione`, QA report, checklist ed evidenze non citano lo stesso ciclo `QA-NNN`; il checkpoint di ripresa deve citare anche l'ID dell'handoff corrente;
- prima di `handoff_qa` il run log non rende ricostruibile la catena `shape -> craft -> polish/adapt per pagina -> critique reale -> score` sulle pagine valutate direttamente: manca `shape` riuscito prima del mock, manca `craft` riuscito con dettaglio `upstream_flow: new-work`, una pagina valutata direttamente non ha checkpoint distinti di `polish` e `adapt` (riusciti o `saltato` con motivo), il critique che produce lo score non risulta realmente eseguito, oppure lo score non cita quel critique. Per le route `family_coverage` la catena richiesta e il checkpoint `family_assessment` del batch piu `adapt` (riuscito o `saltato` con motivo), che resta valutato su ogni pagina consegnata;
- un pilot hook risulta attivo, non ha un checkpoint `hook_pilot` di disattivazione precedente a `handoff_qa`, oppure un suo finding e stato usato come detector, score o prova di consegna;
- nel run log manca un checkpoint `impeccable` per `critique` di ogni pagina consegnata (eseguita nella sessione QA fresca) o, se saltata, manca il checkpoint con esito `saltato`, motivo e approvazione utente;
- nel run log manca, per una o piu pagine consegnate valutate direttamente, lo score netto di chiusura build sopra soglia (media >= 3.0 sulle euristiche valutabili) con eventuali euristiche escluse e riferimento alla lacuna, oppure, per le pagine sotto soglia, la deviazione `score sotto soglia` approvata dall'utente in `07_HISTORY/DECISION_LOG.md` (vedi `00_SYSTEM/IMPECCABLE_PLAYBOOK.md`, sezione Score netto e chiusura pagina). Perimetro dello score build, definizione vincolante per tutto il workflow: sono valutate direttamente le route con `assessment_mode: direct`, il rappresentante di ogni layout family, le route `direct_only`, le route Classic Lane e i fallback Classic. Le route in `family_coverage` non richiedono score build e non richiedono critique diretto: sono coperte da `visual_score: n.a.`, `coverage_status: verified` e `coverage_ref` al batch corrente. Pretendere uno score build su una route `family_coverage`, o accettarne uno ereditato dal rappresentante, e a sua volta una non conformita. Questa riga e la fonte unica del perimetro: playbook, contratti, status rules e template la citano e non la riformulano;
- per una o piu route consegnate manca lo score di verifica del critique QA fresco oppure lo score e sotto soglia (media < 3.0 sulle euristiche valutabili). In QA il perimetro e ogni route consegnata, incluse le route che in build erano in `family_coverage`: la copertura familiare vale solo per la build e non esonera nessuna route dal critique, dal detector e dallo score QA autonomi. Build e QA divergono qui per contratto, non per omissione. Lo score di build da solo non basta. Uno score QA sotto soglia passa solo con una nuova decisione `score QA sotto soglia`, presa dopo il critique fresco e riferita a pagina, score QA corrente e checkpoint `impeccable` corrente; la deviazione build `score sotto soglia` non e riutilizzabile. Uno score QA assente passa solo con decisione separata `critique QA saltato e score QA assente`, riferita alle pagine coinvolte. Le decisioni richiedono approvazione dell'utente in `07_HISTORY/DECISION_LOG.md` con owner Utente; lo scarto tra score QA e score di build resta comunque un finding;
- per una o piu pagine consegnate manca l'esito del detector QA fresco con path o estratto dell'output conservato nel checkpoint `impeccable` del critique, oppure il detector contiene finding non risolti e non esclusi secondo `00_SYSTEM/IMPECCABLE_PLAYBOOK.md`, sezione Score netto e chiusura pagina. Uno score QA sopra soglia non compensa finding deterministici; se il critique QA e stato saltato, questa assenza e coperta solo dalla decisione separata `critique QA saltato e score QA assente` prevista sopra;
- il critique della sessione QA fresca ha prodotto modifiche al sito o fix applicati nella stessa sessione QA: il QA finale e solo verifica; qualunque fix richiede ritorno in fase build e nuovo checkpoint `handoff_qa` prima di ripetere il QA;
- se e stata usata Fast Lane, manca il capability preflight riuscito su DOM renderizzato oppure manca nel run log il checkpoint `family_assessment`/equivalente per il batch fresco con `assessment_mode`, `coverage_status`, `coverage_ref`, rappresentante e route;
- se e stata usata Fast Lane, una pagina risulta consegnata con `coverage_status: failed`, `promotion_required` non risolto, `blocked_pending_classic` non convertito in Classic Lane con critique e score reali, oppure `visual_score` ereditato dal rappresentante invece che `n.a.` per `family_coverage`;
- se e stata usata Fast Lane, il rappresentante di una layout family non risulta `assessment_mode: direct` nell'output del verifier conservato nel checkpoint `family_assessment`. Il ruolo di rappresentante deve essere leggibile dall'output dello strumento: dichiararlo nel run log, nello spec o in una reinterpretazione manuale dell'output non soddisfa questa condizione, e senza rappresentante `direct` verificabile l'intera copertura familiare del batch non vale;
- se e stata usata Fast Lane, il QA fresco non riesegue batch/signature su tutte le URL consegnate o non registra l'esito nel QA report e nel run log;
- mancano in `06_QA/evidence/`, per una o piu pagine consegnate, evidenze render full-page desktop e mobile generate dalla sessione QA fresca secondo `00_SYSTEM/LOCAL_RENDER_PLAYBOOK.md` (una coppia desktop/mobile per ogni pagina, non una coppia generica del solo sito): gli screenshot ereditati dalla build sono solo supporto diagnostico, non prova sufficiente di consegna; se il render fresco fallisce dopo la procedura completa del playbook, il QA e bloccato e il blocco va registrato in `WORKFLOW_STATUS.md`;
- nel run log manca, per il ciclo delle evidenze QA fresche, un checkpoint `render_preflight` precedente agli screenshot e coerente con il loro `<run-ts>`, oppure il checkpoint non riporta interprete, browser, modalita, working directory, escalation, porta, route/firme e fase; un checkpoint ricostruito dopo le evidenze non vale;
- un finding sticky usato per bloccare o approvare la consegna deriva solo da un'anomalia del full-page stitched e non e confermato, dopo reload della route, firma e scroll `0,0`, da una cattura viewport o dalla geometria browser.
- la consegna non include una preview riproducibile via server HTTP con comando da eseguire nella root cliente e URL iniziale completo `http://localhost:<porta>/`; un path `file://` o il solo file `index.html` non valgono;

- il dominio reale non e confermato, oppure `05_SITE/sitemap.xml` non contiene gli URL assoluti reali, oppure `05_SITE/robots.txt` non ha la riga `Sitemap:` con il dominio reale (policy placeholder in `00_SYSTEM/ARTIFACT_CONTRACTS.md`, sezione Sito statico): la lacuna resta in `01_INPUT/MISSING_INFO.md` e la consegna reale e bloccata (vale l'eccezione run di test sotto).

Eccezione run di test: se la run e dichiarata di test o E2E, con decisione registrata in `07_HISTORY/DECISION_LOG.md` (owner Utente) e nota in `WORKFLOW_STATUS.md`, le sole condizioni che dipendono da conferme del cliente non ancora disponibili (dominio reale confermato, esistenza di un sito precedente) non bloccano Gate 5: restano lacune aperte in `01_INPUT/MISSING_INFO.md` e la consegna va marcata `di test, non pubblicabile` in `06_QA/QA_REPORT.md`. Tutte le altre condizioni di Gate 5 restano vincolanti anche nelle run di test.

## Invalidazione dopo Gate 5

Qualunque modifica successiva a Gate 5 che cambia sito, strategia, design, dati pubblicati o condizioni verificate invalida la consegna corrente senza cancellare lo storico. Prima della modifica o nello stesso passaggio:

1. riaprire la fase pertinente in `WORKFLOW_STATUS.md`;
2. marcare Gate 5 `non corrente` e consegna `sospesa`;
3. marcare il QA report del ciclo precedente `superseded` e la final checklist `non corrente`;
4. registrare nel run log un checkpoint `blocco` che cita ciclo QA invalidato, Gate 5 storico e motivo;
5. impostare come prossima azione unica il rientro nella fase riaperta e mantenere aperto `nuovo handoff QA obbligatorio`.

Per riconsegnare serve completare la build, incrementare l'ID `QA-NNN`, registrare un nuovo `handoff_qa`, eseguire la ripresa QA da reset sanzionato, rifare il QA e superare di nuovo Gate 5. Handoff, sessione, evidenze e checkpoint del ciclo superseded restano nello storico append-only del run log e non soddisfano il nuovo gate. Il nuovo report e la nuova checklist citano il ciclo sostituito, senza farlo tornare corrente.
