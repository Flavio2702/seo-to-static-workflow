# Componenti logici

## Regola agente-output

Ogni componente deve lavorare come step con contratto esplicito:

- input letti;
- output prodotto su file;
- controlli minimi eseguiti;
- blocchi o dati mancanti;
- decisioni prese;
- assunzioni e rischi;
- impatto sul prossimo artifact.

La conversazione puo aiutare a decidere, ma il workflow considera valido solo cio che e scritto negli artifact.

## Workflow Orchestrator

- Responsabilita: gestire ordine delle fasi, riconoscere nuovo cliente da primo prompt, creare o verificare il contenitore cliente, controllare artifact richiesti, segnalare blocchi.
- Input: primo prompt utente, brief, allegati, reference visuali, stato progetto, directory cliente, file presenti, regole multicliente in `docs/PRIVACY.md`.
- Output: stato aggiornato, prossima azione richiesta, blocchi aperti, decisioni aperte.
- Validazione: nessuna fase risulta completa se mancano artifact obbligatori o gate espliciti.
- Trace: aggiorna `WORKFLOW_STATUS.md`.
- Implementazione: `CLAUDE.md` nella root del repository.
- Bootstrap nuovo cliente:
  - ricava uno slug ASCII kebab-case dal nome attivita;
  - se il nome attivita manca o e ambiguo, chiede solo quel dato;
  - se `projects/<slug>/` esiste, legge `WORKFLOW_STATUS.md` e non sovrascrive;
  - se non esiste, copia `02_PROJECT_TEMPLATE/` in `projects/<slug>/`;
  - salva prompt e brief in `01_INPUT/CLIENT_BRIEF.md`;
  - registra allegati e reference visuali in `01_INPUT/CLIENT_BRIEF.md`;
  - registra in `01_INPUT/CLIENT_BRIEF.md` lo stato del sito precedente e, se esiste, l'inventario URL; se non e noto apre la lacuna in `01_INPUT/MISSING_INFO.md`;
  - salva file visuali in `04_DESIGN/reference_assets/` quando disponibili;
  - descrive reference non copiabili in `04_DESIGN/REFERENCE_AESTHETICS.md`;
  - imposta `WORKFLOW_STATUS.md` a `product_compilation`.
- Vincoli multicliente:
  - ogni cliente vive in `projects/<cliente>/`;
  - nuovo cliente sempre da `02_PROJECT_TEMPLATE/`, mai da un cliente precedente;
  - non leggere o copiare artifact di altri clienti durante il bootstrap;
  - prima di design/Impeccable la working directory deve essere dentro `projects/<cliente>/`;
  - `--target projects/<cliente>` dalla root non basta;
  - bridge Impeccable solo nella root del progetto cliente;
  - evidenze QA solo in `06_QA/evidence/` se devono essere conservate.

## Product Compiler

- Responsabilita: trasformare il brief grezzo in `PRODUCT.md`.
- Input: `01_INPUT/CLIENT_BRIEF.md`, allegati, materiali visuali inventariati, note utente.
- Output: `01_INPUT/PRODUCT.md`, `01_INPUT/MISSING_INFO.md`, bridge locale `PRODUCT.md`.
- Validazione: non inventa dati locali, claim, CTA o prove di fiducia.
- Trace: registra assunzioni critiche in `07_HISTORY/ASSUMPTIONS_LOG.md`.
- Vincolo: il bridge locale `PRODUCT.md` deriva dagli artifact canonici e non aggiunge contenuti decisionali.
- Vincolo: materiali visuali e reference non sono fonti di claim, NAP, recensioni, servizi o aree servite.

## Product Completeness Check

- Responsabilita: decidere se il blocco SEO/GEO puo partire.
- Input: `01_INPUT/PRODUCT.md`.
- Output: procedere, integrare dati o dichiarare assunzioni.
- Validazione: identita, offerta, target, CTA e dati locali sono presenti o dichiarati mancanti.
- Trace: aggiorna stato e blocchi in `WORKFLOW_STATUS.md`.

## SEO/GEO Agent

- Responsabilita: eseguire i 7 step strategici e produrre `SITE_STRATEGY.md`.
- Input: `01_INPUT/PRODUCT.md`, `02_CONTEXT/`, `01_KNOWLEDGE_BASE/`.
- Output: file intermedi, assunzioni, rischi, `03_SEO_GEO/SITE_STRATEGY.md`.
- Validazione: ogni step passa solo se input, output, controlli qualita, blocchi e impatto su strategia sono compilati.
- Trace: ogni decisione strutturale entra nello step relativo e, se stabile, in `SITE_STRATEGY.md`.
- Vincolo: non produce sito finale, copy definitivo o schema finale prima della strategia approvabile.
- Selezione archetipi: dopo lo step 01 registra un primario obbligatorio, massimo un secondario documentato, modificatori e delta usando `01_KNOWLEDGE_BASE/SEO_GEO_ARCHETYPES/`; la selezione non e un gate.
- Handoff design: per ogni pagina produce un brief di persuasione su azione, convinzione, obiezione, meccanismo, scena, prova, asset e verita del primo viewport, senza prescrivere estetica.

## Design Handoff Agent

- Responsabilita: trasformare strategia e reference nella direzione visuale canonica e nella specifica mock-to-build.
- Input: `01_INPUT/PRODUCT.md`, `03_SEO_GEO/SITE_STRATEGY.md`, `04_DESIGN/REFERENCE_AESTHETICS.md`, file in `04_DESIGN/reference_assets/`, bridge locali `PRODUCT.md` e `DESIGN.md`.
- Output: `04_DESIGN/DESIGN.md`, `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md`, `04_DESIGN/IMPECCABLE_NOTES.md`, mock finale approvato in `04_DESIGN/reference_assets/`, bridge locale `DESIGN.md` aggiornato.
- Validazione: design e componenti non contraddicono sitemap, CTA, local/GEO signals e Pages Not To Create.
- Metodo: `shape/new-work` usa il brief di persuasione come verita di prodotto, sceglie la modalita per la singola superficie e determina mondo visuale, forma e composizione senza derivarli dall'archetipo.
- Trace: vincoli non negoziabili, gerarchia e componenti restano in `04_DESIGN/DESIGN.md`; candidato mock finale, approvazione e fidelity rules restano in `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md`.
- Vincolo: Impeccable si usa solo con working directory dentro `projects/<cliente>/`; non usare bridge in `docs/`.
- Vincolo: reference visuali devono essere locali al cliente e non autorizzano design prima di Gate 3.

## Static Site Builder

- Responsabilita: produrre sito statico leggibile e minimale.
- Input: design, strategia, contenuti, asset.
- Output: HTML, CSS/Tailwind-ready, JavaScript vanilla, asset organizzati.
- Validazione: separa contenuto visibile, dati strutturati, asset e interazioni leggere.
- Trace: eventuali scostamenti da `SITE_STRATEGY.md` vanno registrati in `DECISION_LOG.md`.
- Vincolo: schema, FAQ, breadcrumb e related links sono ammessi solo se derivano da dati verificati e pagine approvate.

## Content Polish Agent

- Responsabilita: rifinire testi senza cambiare struttura, intenti e CTA.
- Input: `01_INPUT/PRODUCT.md`, `03_SEO_GEO/SITE_STRATEGY.md`, pagine generate.
- Output: testi finali nelle pagine di `05_SITE/`, coerenti con brand voice.
- Validazione: non aggiunge promesse, prove, recensioni, aree o servizi non confermati.
- Trace: claim nuovi o dubbi entrano in `ASSUMPTIONS_LOG.md` o `MISSING_INFO.md`.

## QA Agent

- Responsabilita: controllare coerenza strategica, SEO/GEO, tecnica, accessibilita, performance.
- Input: tutti gli artifact prodotti.
- Output: `06_QA/QA_REPORT.md`, `06_QA/FINAL_CHECKLIST.md`, `06_QA/QA_FIX_LOG.md`, eventuali evidenze in `06_QA/evidence/`.
- Validazione: ogni finding ha evidenza, impatto, correzione, priorita, owner, criterio di accettazione e indicatore di fallimento.
- Trace: correzioni e decisioni accettate aggiornano `QA_FIX_LOG.md` e `DECISION_LOG.md`.
- Vincolo: screenshot o snapshot da conservare non vanno in `output/` o `.playwright-mcp/` root.
