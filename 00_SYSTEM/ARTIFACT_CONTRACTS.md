# Contratti degli artifact

## Regola generale

Ogni artifact operativo deve dichiarare o rendere ricostruibile:

- input usati;
- output prodotto;
- decisioni prese;
- assunzioni e rischi;
- blocchi aperti;
- fonte dei dati critici;
- criterio minimo per considerarlo completo.

Se una decisione resta solo in chat, non e parte del workflow.

## Stati del contenuto

Casa canonica unica. Ogni contenuto previsto da un artifact SEO/GEO sta in uno di quattro stati; gli altri file citano questa sezione invece di ridefinirla.

| Stato | Significato | Entra nel sito? |
| --- | --- | --- |
| dato vero | Informazione confermata da `PRODUCT.md`, `LOCAL_CONTEXT.md`, brief o conferma cliente, con fonte | si |
| lacuna | Dato mancante, registrato in `01_INPUT/MISSING_INFO.md` con la domanda da fare al cliente | no, finche resta lacuna |
| placeholder semantico | Descrizione del contenuto atteso, scritta per essere sostituita da dati reali | si, come placeholder |
| non pubblicabile | Contenuto che non puo comparire nemmeno come placeholder semantico | no, in nessuna forma |

`non pubblicabile` e il quarto stato e serve dove la sola descrizione dell'atteso e gia un'affermazione. Il caso tipico e il servizio in settore regolato: un placeholder semantico su una prestazione sanitaria o su una qualifica professionale afferma comunque che quella prestazione viene erogata o che quella qualifica esiste. Un placeholder non e neutro quando il soggetto stesso e il claim.

Obblighi quando si usa `non pubblicabile`:

- dichiarare la motivazione, cioe perche il contenuto non e neutralizzabile in placeholder;
- collegare la lacuna che lo causa in `01_INPUT/MISSING_INFO.md`;
- non farlo entrare in HTML, non farlo entrare nei dati strutturati, non convertirlo in placeholder semantico, non usarlo come testo di FAQ o di trust signal.

Un contenuto `non pubblicabile` diventa pubblicabile solo quando la lacuna e chiusa con un dato vero e verificabile. Non si sblocca riformulando il testo.

## `01_INPUT/CLIENT_BRIEF.md`

Deve conservare il materiale grezzo ricevuto senza normalizzarlo troppo:

- testo originale del primo prompt, se il cliente nasce da una nuova conversazione;
- nome attivita rilevato e slug progetto;
- elenco di allegati, link, foto, loghi, screenshot, listini, recensioni o reference ricevuti;
- fonte di ogni materiale;
- percorso locale dove e stato salvato, se copiabile;
- uso ammesso e dati da verificare;
- stato del sito precedente: `esiste`, `non esiste - confermato` oppure `non noto`;
- se esiste, inventario delle URL vecchie con fonte; se non e noto, riferimento alla lacuna in `01_INPUT/MISSING_INFO.md`;
- contraddizioni, domande aperte e materiali da non usare.

Le reference visuali non sono fonti di dati verificati e non possono introdurre claim, NAP, servizi, aree servite, recensioni o certificazioni.

## `01_INPUT/PRODUCT.md` canonico

Deve identificare senza ambiguita:

- attivita, categoria, sottocategorie, citta, area servita;
- offerta, prodotti, servizi e priorita commerciali;
- target, bisogni, obiezioni, consapevolezza;
- differenziatori concreti e verificabili;
- tono di voce e parole da evitare;
- NAP, orari, indicazioni, quartiere, parcheggio, mezzi;
- prove di fiducia;
- CTA primaria e secondaria.

Non deve contenere dati inventati. Ogni informazione locale critica deve essere confermata, marcata come lacuna o registrata come assunzione.

## `PRODUCT.md` bridge Impeccable locale

Vive nella root del progetto cliente: `projects/<cliente>/PRODUCT.md`.

Deve:

- dichiarare che e un bridge per Impeccable, non un artifact canonico;
- derivare solo da `01_INPUT/PRODUCT.md` e, quando disponibile, da `03_SEO_GEO/SITE_STRATEGY.md`;
- non essere creato o riscritto direttamente con `impeccable init`: `init` upstream non sostituisce la compilazione del canonico e la successiva derivazione del bridge;
- non aggiungere NAP, claim, prove, recensioni, servizi, aree o CTA non presenti negli artifact canonici;
- indicare le fonti canoniche e lo stato dei dati critici;
- riportare, quando `SITE_STRATEGY.md` e disponibile, pubblico e scena reale, azione, convinzione, obiezione, meccanismo del business, prove, asset e verita del primo viewport; questi sono input di persuasione e non decisioni visuali;
- non derivare dall'archetipo modalita Impeccable, mood, palette, font, componenti, layout o direzione visuale;
- restare dentro la cartella cliente, mai in `docs/`.

## Selezione archetipo nello step 01

`03_SEO_GEO/01_BRIEF_NORMALIZER.md` deve registrare un archetipo primario obbligatorio e al massimo un secondario. Il secondario e ammesso solo con un secondo percorso documentato da brief, CTA e intento e non precompila automaticamente pagine, sezioni o CTA duplicate.

La selezione deve citare registro e versione, evidenze, segnali contrari, confidenza, modificatori normalizzati, delta cliente e campi da verificare. Non e un nuovo gate e non richiede approvazione utente separata. I preset in `01_KNOWLEDGE_BASE/SEO_GEO_ARCHETYPES/` forniscono candidati: non approvano keyword, pagine, claim, dati strutturati o scelte visuali.

La confidenza non e un campo descrittivo. `bassa` ha effetto bloccante, come il caso del primario ambiguo (due percorsi di pari peso dichiarati dal brief senza indicazione di quale conti di piu). In entrambi i casi lo step 01 registra il primario come provvisorio, apre il blocco in `WORKFLOW_STATUS.md` e apre in `07_HISTORY/DECISION_LOG.md` una decisione con owner Utente. Gli step successivi possono proseguire sul provvisorio; Gate 3 non passa senza la firma. La regola vive per intero in `01_KNOWLEDGE_BASE/SEO_GEO_ARCHETYPES/README.md`, sezione `Regole di selezione`, e nei gate: qui si registra solo l'obbligo di tracciarla nell'artifact.

I modificatori `Settore: regolato`, `Sedi: multipla` e `Modello operativo: ibrido` sono rami `non supportati`: la loro presenza e una condizione di stop registrata a Gate 1 sui segnali del brief, con rete di sicurezza a Gate 2 e Gate 3 sul modificatore effettivo. L'artifact li registra comunque, perche servono a riconoscere il caso, ma insieme al blocco e alla decisione utente che lo risolve.

## `02_CONTEXT/TARGET_KEYWORDS.md`

Artifact keyword in due momenti: cluster e query grezze prima della sitemap (input dello step 02), keyword research v1 per pagina nello step 03, dopo la selezione delle pagine candidate e prima di definire gli URL da sottoporre all'approvazione utente.

Durante la proposta la sezione `Keyword per pagina` copre ogni pagina candidata. Alla chiusura dello step 03 deve contenere esattamente una riga per ogni pagina dello snapshot sitemap approvato. Per le pagine navigazionali (contatti, chi-siamo, privacy e simili) la riga porta stato `n/a - pagina navigazionale` con intento, motivazione e fonte della classificazione, mai query inventate. Per ogni pagina con intento di ricerca:

- keyword primaria e 2-5 keyword secondarie;
- intento di ricerca;
- fonte della verifica con data: ricerca browser, dato del brief, oppure riferimento puntuale a una riga di `Keyword principali` gia verificata, riportando fonte e data originali della riga citata (il cluster citato deve avere a sua volta fonte browser o brief, niente catene di rimandi);
- note d'uso per H1, title e testi.

Il file deve dichiarare input usati, decisioni prese, assunzioni e rischi e criterio di completezza: tutte le pagine approvate coperte, nessuna riga senza fonte.

Guardrail: le keyword trovate non aggiungono URL alla sitemap da sole; ogni nuova pagina candidata passa dal test doorway e rientra nella proposta esplicita dello step `03_SITEMAP_DECISION_ENGINE.md`. Dopo l'approvazione, qualunque aggiunta o modifica di pagina/URL segue la procedura di nuovo snapshot prevista dallo stesso step. Niente keyword, query o volumi inventati. La sezione `Keyword per pagina` e input vincolante degli step 04 e 05 per slug, H1, title e piano contenuti.

Run di test e run E2E: nessuna esenzione. Le tre fonti ammesse valgono identiche anche quando la run e dichiarata di test, il cliente e fittizio o il progetto e un lab di validazione. Non esiste e non va introdotto uno stato di fonte sintetica, simulata o "dato di run": una riga con quella fonte non e conforme e va rimossa, non sanata. L'eccezione run di test di `00_SYSTEM/GATING_RULES.md`, Gate 5, copre soltanto il dominio reale confermato e lo stato del sito precedente, cioe dati che dipendono da conferme del cliente: non si estende alle fonti keyword, che dipendono da una ricerca che si puo sempre eseguire davvero. Se l'attivita non esiste, la ricerca browser si esegue comunque sulle query reali del settore e della citta scelti per la fixture, e la data di consultazione e quella vera.

Evidence pack keyword, obbligatorio quando la fonte e la ricerca browser: conservare nel progetto cliente le query effettivamente eseguite, la data di consultazione, la fonte consultata e le righe prodotte da ciascuna query. L'evidence pack sta dentro `projects/<cliente>/` e deve essere citabile dal seam audit: senza, le righe di `Keyword per pagina` non sono verificabili da una sessione diversa da quella che le ha scritte e lo step 03 non e chiudibile.

## `03_SEO_GEO/SITE_STRATEGY.md` canonico

Deve contenere:

- Business Entity Summary;
- Applicazione archetipo con primario, secondario opzionale, versione, evidenze, modificatori e delta cliente;
- Local SEO Assumptions;
- Search Intent Map;
- Sitemap con URL, priorita e motivazione;
- Navigation Strategy;
- Page Blueprints;
- Internal Linking Plan;
- Local/GEO Signals;
- Pages Not To Create con pagina esclusa, motivo e rischio evitato;
- SEO QA Pre-Design.
- per ogni pagina, brief di persuasione con azione attesa, convinzione, obiezione, meccanismo del business, scena reale, prova richiesta, asset disponibili/mancanti, contenuti non negoziabili e verita del primo viewport.

Deve separare strategia, copy definitivo, schema e rendering. Non autorizza la creazione di pagine se intento, contenuto specifico, CTA e linking interno non sono chiari.

Il brief di persuasione stabilisce cosa comunicare, non come rappresentarlo. Non puo prescrivere mood, palette, font, componenti, layout, direzione visuale o modalita Impeccable in base all'archetipo.

Tracciabilita dell'origine: per i campi che il preset precompila, l'origine (`primario`, `secondario`, `delta cliente`) deve restare ricostruibile dallo step 02 fino allo step 06. La colonna o il campo `Origine` compare nella `Search Intent Map` (step 02), nel blocco pagina e nella sequenza narrativa (step 04), nel piano heading (step 05) e nel piano segnali locali/GEO (step 06). Senza, il delta cliente non e verificabile a valle e non si distingue cosa viene dal preset da cosa viene dai dati reali del cliente.

La sitemap e valida solo se approvata dall'utente: proposta esplicita secondo lo step `03_SITEMAP_DECISION_ENGINE.md` e decisione registrata in `07_HISTORY/DECISION_LOG.md` con owner Utente. La proposta deve mostrare sia gli URL proposti con motivazione sia le pagine escluse con motivo e rischio evitato; l'agente non puo approvare nessuna delle due liste al posto dell'utente. L'approvazione e legata a uno snapshot con ID univoco composto da due tabelle complete: URL approvati (pagina, URL, motivo, esito doorway, opzione citta) e pagine escluse (pagina, motivo, rischio evitato). La riga della decisione deve citare lo stesso ID e la sezione append-only `Snapshot approvazione sitemap` del `DECISION_LOG.md` deve copiare integralmente entrambe le tabelle: un riferimento al solo path non vale. Se gli snapshot nei due artifact divergono in qualunque campo, oppure sitemap, motivazioni ed esclusioni di questo artifact divergono dai relativi campi approvati, l'approvazione e invalidata e serve una nuova proposta sintetica del delta, un nuovo ID snapshot e una nuova decisione. Uno snapshot approvato non si sovrascrive: si aggiunge un nuovo blocco.

## `03_SEO_GEO/REDIRECT_MAP.md`

Artifact condizionale: va compilato solo se il progetto sostituisce un sito esistente (vedi `01_KNOWLEDGE_BASE/SITE_STRATEGY_RULES.md`, Regole di naming URL). Esenta solo l'assenza confermata di un sito precedente, tracciata in `01_INPUT/CLIENT_BRIEF.md`. Se l'esistenza non e nota, la lacuna sta in `01_INPUT/MISSING_INFO.md` ma la consegna reale resta bloccata finche il cliente non conferma oppure non si producono inventario e mappa; per le run dichiarate di test vale l'eccezione di `00_SYSTEM/GATING_RULES.md`, Gate 5.

Quando applicabile deve:

- mappare ogni URL vecchia inventariata su una URL nuova della sitemap approvata oppure su una esclusione motivata, mai tutte sulla home per default;
- essere la fonte dei formati deployabili (es. `_redirects`, `.htaccess`), che restano derivati dipendenti dall'hosting.

Se applicabile e assente o incompleto, la consegna e bloccata (Gate 5).

## `04_DESIGN/DESIGN.md` canonico

Deve contenere:

- direzione visuale;
- gerarchia above the fold;
- componenti principali;
- vincoli da non cambiare rispetto a `SITE_STRATEGY.md`;
- note di implementazione statica.
- input usati e reference locali;
- gerarchia pagina, componenti richiesti e vincoli da non cambiare;
- stato di prontezza per la build e riferimento a `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md`.
- sezione `Impeccable new-work` con modalita della superficie (`Persuade`, `Operate`, `Read` o `Experience`), direzione scelta, fonte della scelta e rischio dichiarato;
- sezione `Direction contract` con i cinque blocchi `THESIS`, `OWN-WORLD`, `STORY`, `FIRST VIEWPORT` e `FORM`.
- sezione `Design Delta e layout family` se si usa Fast Lane: Kernel di riferimento, delta cliente, family candidate, rappresentante scelto per rischio, route `direct_only`, densita specifiche e invarianti desktop/mobile.

Deve rispettare i vincoli non negoziabili della strategia: sitemap approvata, CTA, contenuti locali visibili, blocchi GEO e pagine escluse.

Questo artifact assorbe l'handoff design operativo: `04_DESIGN/DESIGN_HANDOFF.md` non e un artifact canonico ne obbligatorio. Le note specifiche dei comandi restano in `04_DESIGN/IMPECCABLE_NOTES.md`; candidato mock finale, approvazione e fidelity rules restano nello spec.

Il direction contract vive qui, non nei commenti dell'HTML. La scelta della direzione puo provenire dalla scelta utente o dal fallback upstream documentato, ma non e un gate: l'unica approvazione utente bloccante resta il candidato mock finale identificato nello spec.

Il Design Kernel tecnico vive in `00_SYSTEM/DESIGN_QA_FAST_LANE_KERNEL.md` e non e un sostituto del Design Delta. Non puo introdurre mood, palette, font cliente, composizione, fotografia o layout family definitiva.

Se un fix su `05_SITE/` successivo alla prima build cambia qualcosa previsto da questo artifact, nello stesso passaggio l'artifact va aggiornato oppure la deviazione va registrata nella tabella Allowed deviations di `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md`: a fine passaggio nessuna contraddizione tra design canonico e sito (vedi `00_SYSTEM/IMPECCABLE_PLAYBOOK.md`, Riallineamento canonici dopo fix).

## `04_DESIGN/REFERENCE_AESTHETICS.md`

Deve contenere:

- inventario delle reference visuali ricevute;
- fonte e file locale, se disponibile;
- cosa prendere e cosa evitare;
- uso ammesso;
- materiali esclusi e motivo;
- conferma che le reference sono locali al cliente.

Non puo modificare strategia, sitemap, CTA o Pages Not To Create. Non sblocca il design prima di Gate 3.

## `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md`

Deve contenere:

- mock source e stato (approvato, da iterare, assente con deviazione approvata) con fedelta attesa;
- ID del candidato mock finale e riferimento alla decisione di approvazione utente con lo stesso ID;
- inventario di sezioni, asset e componenti del mock;
- fidelity rules non negoziabili;
- vincoli SEO/GEO immutabili da `SITE_STRATEGY.md`;
- deviazioni ammesse con motivo, impatto e approvazione;
- preflight Impeccable e build checklist.
- sezione `New-work reproducibility` con scope, modalita, comando di generazione e seed/key riproducibile;
- sezione `Direction round` con direzione assegnata, challenger realmente presentati, esito e fonte della scelta;
- collegamento in `Mock source` tra direction contract, iterazioni prodotte e candidato mock finale `MOCK-NNN`.
- sezione `Fast Lane signature` se si usa Fast Lane: schema, family, rappresentante, landmark, componenti, slot, interazioni, regole viewport e trigger di promozione;
- sezione `Home lock`: ID lock, elementi bloccati, hash o identificatori, invalidatori e checkpoint;
- sezione `Assessment ledger`: per ogni route `assessment_mode`, `visual_score`, `coverage_status`, `coverage_ref`, `promotion_required`, fallback e checkpoint;
- sezione `Fallback Classic Lane`: route, famiglia candidata, motivo e azione eseguita.

Va sempre compilato: senza mock e senza deviazione `mock assente` approvata dall'utente Gate 4 non parte. Non puo modificare sitemap, CTA o Pages Not To Create, ne introdurre claim o dati locali.

Le bozze e iterazioni mock intermedie possono essere prodotte e scartate senza approvazione o stop. Diventa bloccante solo l'approvazione esplicita del candidato finale identificato nello spec; Gate 4 non accetta approvazioni generiche o riferite a un candidato precedente.

Lo spec segue il sito per tutta la vita della build: ogni modifica a `05_SITE/` successiva alla prima build che cambia qualcosa previsto dallo spec deve, nello stesso passaggio, aggiornare lo spec oppure registrare la deviazione nella tabella Allowed deviations. Un fix che lascia spec e sito in contraddizione non e completo (vedi `00_SYSTEM/IMPECCABLE_PLAYBOOK.md`, Riallineamento canonici dopo fix).

La build checklist deve includere contrasto misurato (4.5:1 testo normale; 3:1 testo grande e componenti essenziali), spot-check su hero/collage, CTA, sezioni scure, footer e testo muted, controllo di copy e commenti HTML contro meta-copy, direction contract, seed/key, challenger, note di processo e istruzioni interne, stato/data/checkpoint di chiusura. Prima di `handoff_qa` tutte le voci devono essere chiuse; `n/a` e ammesso solo con motivo e riferimento.

Se si usa Fast Lane, la build checklist deve confermare che nessuna pagina eredita score dal rappresentante, che ogni `family_coverage` ha coverage verificata fresca e che ogni fallback Classic e chiuso con critique e score reali.

## `DESIGN.md` bridge Impeccable locale

Vive nella root del progetto cliente: `projects/<cliente>/DESIGN.md`.

Deve:

- dichiarare che e un bridge per Impeccable, non un artifact canonico;
- derivare da `04_DESIGN/DESIGN.md`, `03_SEO_GEO/SITE_STRATEGY.md` e `01_INPUT/PRODUCT.md`;
- non accogliere direttamente modifiche durevoli proposte da Impeccable: aggiornare prima `04_DESIGN/DESIGN.md` oppure registrare la deviazione in `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md`, poi rigenerare il bridge;
- riportare solo sintesi operative utili al design;
- derivare modalita, direzione scelta e direction contract da `04_DESIGN/DESIGN.md`; seed/key, challenger e note di processo restano nel canonico/spec e non diventano autorita del bridge;
- riportare, se presente, la sintesi Fast Lane derivata dai canonici: Kernel citato, Design Delta, family candidate, rappresentanti e pagine direct-only; non inventare signature o assessment nel bridge;
- citare sempre `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md` tra le fonti (con il file mock se presente) e riportare le fidelity rules non negoziabili oltre alle sintesi operative;
- mantenere coerenti sitemap, CTA, segnali locali, Pages Not To Create, limiti su claim e stato dei dati;
- essere aggiornato quando cambia `04_DESIGN/DESIGN.md`;
- restare dentro la cartella cliente, mai in `docs/`.

## Sito statico

Deve rispettare:

- HTML semantico;
- un H1 per pagina;
- title e meta coerenti;
- link reali e crawlable;
- contenuti critici presenti in HTML;
- JavaScript non essenziale per informazioni principali;
- asset organizzati e leggeri.

Deve separare:

- contenuto visibile;
- dati strutturati;
- asset;
- componenti SEO opzionali come FAQ, breadcrumb e related links.

Non deve generare pagine servizio-area, citta o quartiere non approvate da `SITE_STRATEGY.md`.

Policy `sitemap.xml` e `robots.txt` senza dominio confermato:

- finche il dominio reale non e confermato, `sitemap.xml` resta un placeholder: i percorsi approvati dalla sitemap di `SITE_STRATEGY.md` vanno riportati solo in commento, mai come URL assoluti inventati;
- `robots.txt` non referenzia la sitemap finche il dominio non e confermato: la riga `Sitemap:` si aggiunge solo con il dominio reale;
- la conferma del dominio e un dato bloccante per la consegna reale: finche manca va tracciata come lacuna in `01_INPUT/MISSING_INFO.md`.

## QA_REPORT.md

Deve indicare per ogni problema:

- severita;
- evidenza;
- impatto;
- correzione proposta;
- owner;
- stato;
- criterio di accettazione.
- priorita operativa;
- dipendenze;
- next action;
- indicatore di fallimento.

In testa deve indicare: stato `non verificato`, `corrente` o `superseded`; ciclo `QA-NNN`; checkpoint `handoff_qa`; checkpoint `sessione` di ripresa QA. I tre riferimenti devono coincidere con `WORKFLOW_STATUS.md` e run log. Gate 5 accetta solo il report `corrente`; `non verificato` e `superseded` non sono stati consegnabili. Se il lavoro viene riaperto dopo Gate 5, il report del ciclo precedente va marcato `superseded` prima di qualunque nuova consegna.

Un finding e valido solo se una persona puo verificare l'evidenza e capire cosa fare dopo.

La tabella `Critique score` copre ogni route consegnata, incluse le route che in build erano in `family_coverage`: in QA lo score e obbligatorio per tutte, con critique e detector autonomi della sessione fresca. Nella colonna dello score build e ammesso il valore `n.a. - family_coverage` per le route coperte dal batch, con il `coverage_ref` corrispondente; nella colonna dello score QA quel valore non e mai ammesso. Perimetro vincolante di build e QA in `00_SYSTEM/GATING_RULES.md`, Gate 5.

Le evidenze QA da conservare, inclusi screenshot e snapshot, devono stare in `06_QA/evidence/` dentro il progetto cliente e devono essere citate nel report. `output/`, `.playwright-mcp/` e `.impeccable/` alla root sono scratch condivisi e non fanno parte della consegna. Ogni ciclo render citato deve avere un checkpoint `render_preflight` contemporaneo e precedente agli screenshot, con interprete, browser, modalita `shell_persistente` o `ciclo_atomico`, working directory, escalation, porta, route e firme verificate, fase, ciclo QA e `<run-ts>`. Evidenze create prima del checkpoint o con checkpoint ricostruito retroattivamente non valgono per chiusura build o QA. Qualunque file nuovo nella cartella evidenze senza checkpoint precedente e mappatura nel report e un blocco di audit, anche se non viene usato per sostenere un finding: registrare path e motivo nel run log, rimuovere il file non valido dalla cartella di consegna, ripetere correttamente il ciclo e registrare la risoluzione. Un checkpoint retroattivo non sana il file originario.

Per ogni pagina restano obbligatori i full-page desktop e mobile. Una cattura viewport puo sostenere controlli mirati ma non sostituisce il full-page. Un'anomalia dello sticky header visibile solo nello stitching full-page diventa finding solo se confermata, dopo reload della route, verifica della firma e scroll `0,0`, da una cattura viewport o dalla geometria osservata nel browser. Naming e procedura canonici stanno in `00_SYSTEM/LOCAL_RENDER_PLAYBOOK.md`.

## `07_HISTORY/E2E_RUN_LOG.md`

Log di esecuzione a checkpoint per l'audit del flusso. Deve:

- essere append-only: righe aggiunte al momento del checkpoint, mai riscritte;
- registrare come checkpoint: gate superati, `context_load` una volta per sessione, `bridge_preflight` iniziale e dopo ogni bridge update, `render_preflight` per ogni ciclo render prima degli screenshot, comandi Impeccable lanciati e comandi della sequenza standard saltati (esito `saltato`, con motivo), eventuali transizioni del pilot hook (tipo `hook_pilot`), score netto di chiusura per ogni pagina valutata direttamente (tipo `score`, con euristiche escluse o deviazione `score sotto soglia`; perimetro vincolante in `00_SYSTEM/GATING_RULES.md`, Gate 5: route `direct`, rappresentante di layout family, `direct_only`, Classic Lane e fallback. Le route in `family_coverage` non producono `score` in build e sono coperte dal checkpoint `family_assessment` con `coverage_status: verified` e `coverage_ref`), chiusura della Build checklist (tipo `build_checklist`, con stato/data dello spec), compilazione o aggiornamento dei bridge, blocchi aperti e risolti, handoff QA dopo build, riprese di sessione dopo un reset e reset declinati dall'utente;
- rendere ricostruibile l'ordine `shape -> craft -> polish/adapt per pagina -> critique reale -> score -> handoff_qa` sulle pagine valutate direttamente: i checkpoint pagina riportano route/path, non sono aggregati, e lo score cita il critique realmente eseguito che lo ha prodotto. Per le route `family_coverage` la catena ricostruibile e il checkpoint `family_assessment` del batch piu `adapt`, che resta valutato su ogni pagina consegnata;
- riportare nel dettaglio del checkpoint `craft` il campo `upstream_flow: new-work`;
- per ogni `hook_pilot`, riportare transizione `on|off`, versione, target, cwd, config, manifest, finding con `rule` e `file`, evento `Stop`, confronto con il detector esplicito e decisione collegata per ogni ignore; il pilot non produce score o evidenza di consegna e deve risultare `off` prima di `handoff_qa`;
- riportare nel dettaglio di `render_preflight`: interprete con comando/path e versione, browser con strumento/path e versione o esito check, modalita, working directory cliente, escalation ed esito, porta, route e firme attese/verificate, fase `build` o `qa` e `<run-ts>`; un fallimento va registrato al momento con esito `fallito` e relativo errore;
- conservare nella sezione `Estratti context load e bridge preflight`: per ogni `context_load`, versione skill, target, cwd, client root ed estratto `RESOLVED_CONTEXT` con conferma del cliente. I cinque campi sono obbligatori e devono essere risolti dall'output reale: uno vuoto o valorizzato `non letto`, `non letta` o `n.d.` rende il checkpoint `fallito`. L'estratto deve mostrare come product risolto il bridge `PRODUCT.md` della root cliente, non `01_INPUT/PRODUCT.md` ne un path della root condivisa, e il checkpoint riporta l'esito di questo controllo; per ogni `bridge_preflight`, target, requisito design, path e hash dei bridge/canonici e conferma identita cliente. Un bridge update invalida solo il `bridge_preflight` per i comandi futuri; `context.mjs` non si rilancia nella stessa sessione;
- registrare, se si usa Fast Lane, `home_lock` e `family_assessment`: il primo conserva elementi condivisi bloccati e invalidatori; il secondo conserva capability preflight, batch, route, rappresentante, `assessment_mode`, `coverage_status`, `coverage_ref`, `promotion_required`, fallback e output machine-readable;
- assegnare a ogni `handoff_qa` il successivo ID `QA-NNN`; la ripresa QA cita sia ciclo sia ID handoff, mentre le riprese ordinarie dichiarano esplicitamente `ripresa ordinaria`;
- registrare l'invalidazione post Gate 5 come nuovo checkpoint `blocco`, senza alterare il checkpoint Gate 5 storico;
- indicare per ogni riga data, tipo, dettaglio, esito ed evidenza o fonte.

Non sostituisce `WORKFLOW_STATUS.md`: lo status dice cosa e valido ora, il run log dice cosa e successo. Un gate senza riga nel run log non e considerato superato; una riga storica non prevale su un gate marcato `non corrente` nello status. I checkpoint storici con tipo `preflight` restano validi per le run concluse e non si riscrivono; le nuove run usano i tipi distinti `context_load` e `bridge_preflight`.

## `WORKFLOW_STATUS.md`

Fonte della validita corrente. Deve distinguere almeno: fase, validita corrente dei gate, stato consegna, ciclo `QA-NNN`, handoff corrente, ripresa QA corrente, QA report corrente o `superseded`, checklist corrente o non corrente e stato pilot hook (`vietato`, `pendente - slug non fornito`, `autorizzato`, `attivo`, `disattivato`, `interrotto`). Lo storico non va duplicato nello status: resta nel run log.
