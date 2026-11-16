# CLAUDE.md

Questo repository e un workflow documentale per generare siti vetrina statici SEO/GEO per attivita retail locali, partendo da un brief cliente. Claude Code agisce come esecutore manuale-assistito del Workflow Orchestrator definito in `00_SYSTEM/LOGICAL_COMPONENTS.md`. Nessuna automazione obbligatoria: il lavoro avanza compilando artifact Markdown e file statici.

Il riferimento architetturale vincolante e `docs/ARCHITETTURA.md`.

Questo file deve restare semanticamente allineato con `AGENTS.md`. Le sole differenze ammesse sono intestazione e nome dell'operatore; gate, guardrail, artifact, logging e condizioni di stop devono coincidere.

## Regola primaria

Ogni fase deve lasciare output su file. Se una decisione resta solo in chat, non e parte del workflow.

Se durante una fase emergono decisioni tecniche, limiti metodologici, tradeoff o assunzioni non banali che condizionano la fase successiva, vanno segnalati esplicitamente all'utente prima del cambio fase e registrati nei file canonici di stato, validazione, memory o log pertinenti. Non affidare mai alla chat la memoria di una decisione tecnica che puo cambiare un go/no-go, una soglia, un fallback o una propagazione futura.

## Come orientarsi

- Lavoro sul template o sul sistema: lo stato e in `docs/LIMITI.md` (root).
- Lavoro su un cliente: lo stato e in `projects/<cliente>/WORKFLOW_STATUS.md`. Leggere `Fase corrente`, `Blocchi aperti` e `Prossima azione` prima di qualunque altra cosa.
- Campi minimi e stati validi dello status: `00_SYSTEM/WORKFLOW_STATUS_RULES.md`.
- Ogni cliente vive in `projects/<cliente>/`: dati, SEO/GEO, design, sito, QA, bridge e storico non devono uscire da quella cartella.
- Mai lavorare direttamente su `02_PROJECT_TEMPLATE/` per un cliente reale: copiarlo prima in `projects/<cliente>/`.
- Un nuovo cliente nasce sempre da `02_PROJECT_TEMPLATE/`, mai copiando un cliente precedente.
- Se il progetto cliente non esiste ancora, la prima azione e copiare il template in `projects/<cliente>/` e chiedere brief, materiali visuali e reference disponibili.
- Se serve storico, inizializzare Git dentro `projects/<cliente>/` con repo privato dedicato; la repo workflow continua a ignorare `projects/*`.

## Nuovo cliente da primo prompt

Quando il primo messaggio dice "nuovo cliente" e contiene brief, link, immagini o reference visuali:

1. Ricavare il nome attivita dal brief e generare uno slug ASCII kebab-case per `projects/<slug>/`.
2. Se nome attivita o slug sono assenti o ambigui, chiedere solo quel dato prima di creare file.
3. Se `projects/<slug>/` esiste gia, non sovrascrivere: leggere `projects/<slug>/WORKFLOW_STATUS.md` e continuare da `Prossima azione`.
4. Se `projects/<slug>/` non esiste, copiare `02_PROJECT_TEMPLATE/` in `projects/<slug>/`.
5. Da quel momento lavorare con working directory dentro `projects/<slug>/`.
6. Salvare il testo originale del primo prompt in `01_INPUT/CLIENT_BRIEF.md`.
7. Inventariare allegati, link e materiali visuali in `01_INPUT/CLIENT_BRIEF.md`, registrando anche se esiste un sito precedente (si con inventario URL, no confermato, oppure lacuna in `01_INPUT/MISSING_INFO.md`).
8. Salvare i file visuali disponibili in `04_DESIGN/reference_assets/`; se non sono copiabili, descriverli in `04_DESIGN/REFERENCE_AESTHETICS.md`.
9. Aggiornare `WORKFLOW_STATUS.md` a `product_compilation`, segnando origine da template, brief persistito, materiali visuali persistiti e prossima azione.
10. Compilare `01_INPUT/PRODUCT.md`, `01_INPUT/MISSING_INFO.md` e bridge locale `PRODUCT.md` solo da dati del cliente corrente.

Non leggere, copiare o usare artifact di altri clienti in `projects/`. Le reference visuali non autorizzano il design prima di Gate 3.

## Flusso canonico

- Pipeline completa: `00_SYSTEM/WORKFLOW_OVERVIEW.md`.
- Ordine obbligatorio dei 7 step SEO/GEO: `03_SEO_GEO/README.md` nella cartella progetto.
- Contratti degli artifact principali: `00_SYSTEM/ARTIFACT_CONTRACTS.md`.

## Gate

1. Gate 1: avvio SEO/GEO.
2. Gate 2: step SEO/GEO sequenziali.
3. Gate 3: avvio design.
4. Gate 4: avvio sito statico.
5. Gate 5: consegna.

Le condizioni vincolanti di ogni gate stanno solo in `00_SYSTEM/GATING_RULES.md`. Mai oltrepassare un gate non superato: registrare il blocco in `WORKFLOW_STATUS.md` e chiedere i dati o le decisioni mancanti.

## Isolamento multicliente e Impeccable

- Impeccable va usato solo con working directory dentro `projects/<cliente>/`.
- In questa repo `--target projects/<cliente>` lanciato dalla root non e considerato sufficiente: puo risolvere la root condivisa e caricare stato o bridge sbagliati.
- `PRODUCT.md` e `DESIGN.md` nella root del progetto cliente sono bridge Impeccable locali, non artifact canonici.
- `impeccable init` upstream non e un'autorita locale: non puo riscrivere direttamente `PRODUCT.md`; compilare prima `01_INPUT/PRODUCT.md` e poi derivare il bridge. Le modifiche durevoli proposte a `DESIGN.md` vanno recepite prima nel canonico o nello spec, poi propagate al bridge.
- Gli artifact canonici restano `01_INPUT/PRODUCT.md`, `03_SEO_GEO/SITE_STRATEGY.md`, `04_DESIGN/DESIGN.md`.
- Non creare o usare bridge cliente in `docs/`.
- Screenshot, snapshot e prove QA da conservare vanno in `projects/<cliente>/06_QA/evidence/` e citati in `06_QA/QA_REPORT.md`.
- `output/`, `.playwright-mcp/` e `.impeccable/` alla root sono scratch condivisi ignorati, non evidenza di consegna.
- La sequenza operativa Impeccable verificabile (`shape -> craft -> polish/adapt per pagina -> critique reale -> score -> handoff_qa`), il preflight obbligatorio e le condizioni di stop stanno in `00_SYSTEM/IMPECCABLE_PLAYBOOK.md`. `craft` resta l'alias legacy upstream e il checkpoint locale obbligatorio. Nessun comando Impeccable senza preflight superato. L'esecuzione e diretta per default; sub-agent solo se richiesti esplicitamente dall'utente, mai come gate. `live` e opzionale e la sua assenza non blocca il flusso.
- Il preflight usa due checkpoint: `context_load` una sola volta nella sessione, da cwd cliente e con target esplicito, e `bridge_preflight` iniziale e dopo ogni compilazione o aggiornamento dei bridge. Un bridge update richiede solo un nuovo `bridge_preflight`, mai un secondo `context.mjs` nella stessa sessione. Gate 4 e Gate 5 richiedono entrambi checkpoint correnti.
- I campi del `context_load` (versione Impeccable, target, working directory, client root, estratto `RESOLVED_CONTEXT`) sono obbligatori: uno vuoto o valorizzato `non letto`, `non letta` o `n.d.` e un preflight fallito, non una nota. Il product risolto deve essere il bridge `PRODUCT.md` della root cliente: `01_INPUT/PRODUCT.md` o un path della root condivisa fanno fallire il preflight.
- Se il preflight fallisce, fermarsi: registrare il blocco in `WORKFLOW_STATUS.md` e chiedere il dato mancante. Mai procedere con una build degradata o con bridge di un altro cliente.
- Ogni comando Impeccable lanciato o saltato va registrato come checkpoint in `07_HISTORY/E2E_RUN_LOG.md` (esito `saltato` con motivo se non eseguito); `shape` e `craft` devono risultare eseguiti nella build standard, e il `critique` che produce lo score deve essere reale. Il critique QA e saltabile solo con decisione approvata dall'utente e registrata in `07_HISTORY/DECISION_LOG.md` secondo Gate 5.
- Il mock visuale e obbligatorio di default: le iterazioni intermedie non richiedono approvazione; Gate 4 blocca solo finche il candidato finale identificato nello spec non e approvato dall'utente e salvato in `04_DESIGN/reference_assets/`, oppure finche manca la deviazione `mock assente` approvata. Il mock finale e una specifica di produzione, non una reference.
- La parte design di `new-work` vive solo dopo `shape` e dentro Gate 3: modalita, seed/key, direzione, challenger, rischio e direction contract vanno nei canonici esistenti e non autorizzano Gate 4 o build. Il checkpoint `craft` resta locale e riporta `upstream_flow: new-work`. Contract, seed, challenger e note interne non entrano nei commenti o nel copy HTML.
- Design/QA Fast Lane e disponibile come opzione propagata, non come scorciatoia: usare `00_SYSTEM/DESIGN_QA_FAST_LANE_KERNEL.md` solo per il Kernel tecnico e compilare Design Delta, layout family, signature, home lock, assessment ledger e fallback nei canonici cliente. Fast Lane richiede capability preflight su DOM renderizzato, rappresentante con score reale e `assessment_mode: direct` nell'output del verifier, nessuna eredita di score, `coverage_status: verified` per ogni pagina coperta, fallback Classic registrato per fallimenti e QA fresco con rerun batch/signature su tutte le URL.
- Perimetro dello score, definizione vincolante in `00_SYSTEM/GATING_RULES.md`, Gate 5: in build lo score reale copre solo le pagine valutate direttamente (route `direct`, rappresentante di family, `direct_only`, Classic e fallback), mentre le route `family_coverage` sono coperte da `coverage_status: verified` e `coverage_ref` senza score e senza critique diretto; in QA fresco ogni route consegnata, `family_coverage` incluse, riceve critique, detector e score autonomi.
- Gli hook restano vietati salvo pilot advisory in un progetto test non produttivo esplicitamente autorizzato, solo dopo Gate 4 e durante build. Il pilot non sostituisce detector, score o QA e deve risultare `off` prima di `handoff_qa`; senza slug autorizzato resta `pendente - slug non fornito`.

## Esecuzione di uno step

1. Aprire il file dello step e leggere gli `Input richiesti` indicati.
2. Seguire la sezione `Metodo` e rispettare i `Criteri minimi di qualita`.
3. Compilare tutte le sezioni di output, incluse `Decisioni prese` e `Assunzioni e rischi`.
4. Aggiornare `WORKFLOW_STATUS.md`: fase, artifact, gate, blocchi, prossima azione, data.
5. Registrare decisioni e assunzioni durevoli in `07_HISTORY/DECISION_LOG.md` e `07_HISTORY/ASSUMPTIONS_LOG.md`.
6. Registrare i checkpoint di audit (gate superati, preflight e comandi Impeccable, bridge compilati o aggiornati, blocchi, handoff QA, riprese di sessione) in `07_HISTORY/E2E_RUN_LOG.md` al momento in cui avvengono.

Una prossima azione alla volta: lo status deve sempre dire cosa manca per avanzare.

## Confini di sessione

- Ai gate 3 e 4 e raccomandato ripartire con contesto fresco: prima l'orchestratore esegue il flush (tutto su file, status e run log aggiornati), poi segnala all'utente il punto di reset. Il reset lo esegue solo l'utente.
- Dopo la build assegnare il successivo ciclo `QA-NNN`, registrarlo nel checkpoint `handoff_qa` e nello status, poi segnalare il reset obbligatorio prima del QA finale.
- Ogni sessione nuova riparte dai file e registra un checkpoint `sessione`: `ripresa ordinaria` fuori dai confini sanzionati; `ripresa da reset Gate 3`, `Gate 4` o `handoff_qa` ai rispettivi confini. La ripresa QA cita ciclo e ID handoff.
- Il QA finale parte solo dopo `ripresa da reset handoff_qa`, da una sessione o agente fresco che non ha costruito il sito. Una ripresa ordinaria non soddisfa Gate 5.
- Solo ai gate 3 e 4 il reset puo essere declinato, con checkpoint specifico del gate. All'handoff QA non puo essere declinato.
- Non introdurre stop o reset di default fra `craft home`, pagine interne, `polish`, `adapt`, critique superato, score e chiusura build. Fermarsi solo per un blocco reale previsto dalle regole, una decisione utente bloccante o richiesta esplicita.
- Chiudere con prompt di ripartenza ai reset sanzionati e ai fine turno ordinari con flush completo. Il prompt ordinario ordina `ripresa ordinaria` e non raccomanda reset; quello di handoff QA include `QA-NNN` e ID handoff. Formato ed esempio in `00_SYSTEM/WORKFLOW_OVERVIEW.md`.
- Dopo una modifica post Gate 5, lo status riapre la fase, marca Gate 5 `non corrente`, consegna `sospesa`, QA `superseded`, checklist `non corrente` e impone un nuovo handoff; il run log storico non si riscrive.
- Regole complete: `00_SYSTEM/WORKFLOW_OVERVIEW.md`, sezione Confini di sessione.

## Guardrail non negoziabili

- Mai inventare dati locali, NAP, orari, recensioni, certificazioni o claim: descrivere per tipi solo se veri, altrimenti lacuna in `MISSING_INFO.md` o assunzione dichiarata.
- Mai pagine doorway: ogni URL deve superare i criteri di `01_KNOWLEDGE_BASE/SITE_STRATEGY_RULES.md`, incluso il test doorway in 4 domande.
- Placeholder semantici che descrivono il contenuto atteso, mai lorem ipsum. Quando la sola descrizione dell'atteso sarebbe gia un'affermazione, il contenuto e `non pubblicabile` e non entra in HTML ne nello schema: quattro stati e obblighi in `00_SYSTEM/ARTIFACT_CONTRACTS.md`, sezione `Stati del contenuto`.
- Settore regolato, sedi multiple e modello operativo ibrido sono rami `non supportati` del workflow: Gate 1 blocca sui segnali del brief e il progetto non prosegue senza decisione utente. Fonte in `01_KNOWLEDGE_BASE/SEO_GEO_ARCHETYPES/README.md`, sezione `Rami non supportati`, e in `00_SYSTEM/GATING_RULES.md`, Gate 1.
- Il copy pubblicato parla al cliente finale dell'attivita, mai del processo, dello spec o del workflow: etichette interne (nomi sezione dello spec, note "da confermare", spiegazioni di layout o di tono) non devono comparire nell'HTML consegnato. I placeholder restano semantici ma descrivono il contenuto atteso, non il processo che lo produrra.
- Stack minimale: HTML statico, CSS/Tailwind-ready, JavaScript vanilla leggero. Framework o CMS solo con decisione motivata e registrata.
- Leggere i file pertinenti di `01_KNOWLEDGE_BASE/` prima di produrre strategia, sito o QA.
- Le repository esterne sono fonti di pattern, non dipendenze: `docs/EXTERNAL_REPOSITORY_PATTERNS.md`.
- Il QA non e opzionale: la consegna richiede `QA_REPORT.md` e `FINAL_CHECKLIST.md` completi.
- Una semplificazione visuale rispetto al mock e ammessa solo se registrata come deviazione in `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md`; la SEO/GEO non giustifica da sola un sito visivamente povero.

## Stile dei file

- Italiano, registro asciutto e operativo, come i file esistenti.
- Solo caratteri ASCII: scrivere "attivita", "perche", "citta".
- Liste e tabelle compatte, niente emoji, path tra backtick.
