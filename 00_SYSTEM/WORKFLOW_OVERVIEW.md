# Workflow overview

## Scopo

Trasformare un brief cliente in un sito statico locale attraverso artifact persistenti e verificabili.

Le regole multicliente recepiscono `docs/PRIVACY.md`: ogni cliente deve restare isolato in `projects/<cliente>/`, inclusi bridge Impeccable, stato, design, sito, QA ed evidenze.

## Regola primaria

Ogni fase deve lasciare output su file. Se una decisione resta solo in chat, non e parte del workflow.

## Avvio progetto cliente

1. Creare sempre il contenitore da `02_PROJECT_TEMPLATE/`:
   `projects/<cliente>/`.
2. Non copiare mai un progetto cliente precedente per avviarne uno nuovo.
3. Inserire brief, materiali e note solo dentro la cartella cliente.
4. Prima di lavorare, leggere `projects/<cliente>/WORKFLOW_STATUS.md` e seguire una sola `Prossima azione`.
5. Se serve storico versionato, inizializzare un repo Git dentro `projects/<cliente>/` e usare un remote privato dedicato. La repo workflow principale continua a ignorare `projects/*`.
6. Per design/Impeccable, cambiare working directory in `projects/<cliente>/` prima di lanciare qualunque comando o skill.

`--target projects/<cliente>` lanciato dalla root non e considerato sufficiente in questa repo: puo risolvere la root condivisa e leggere bridge o stato del cliente sbagliato.

La sequenza operativa Impeccable e definita in `00_SYSTEM/IMPECCABLE_PLAYBOOK.md`. La Fast Lane design/QA, quando applicabile, usa anche `00_SYSTEM/DESIGN_QA_FAST_LANE_KERNEL.md` e resta soggetta a fallback Classic Lane.

## Primo prompt con nuovo cliente

Il primo messaggio dell'utente puo essere l'input iniziale del Workflow Orchestrator se contiene richiesta "nuovo cliente", brief cliente e materiali o reference visuali.

Procedura vincolante:

1. Ricavare il nome attivita dal brief e creare uno slug ASCII kebab-case.
2. Se il nome attivita non e chiaro, chiedere solo il nome prima di creare il progetto.
3. Se `projects/<slug>/` esiste, leggere `WORKFLOW_STATUS.md` e non sovrascrivere nulla.
4. Se `projects/<slug>/` non esiste, copiare `02_PROJECT_TEMPLATE/` in `projects/<slug>/`.
5. Salvare il testo originale del primo prompt in `01_INPUT/CLIENT_BRIEF.md`.
6. Inventariare allegati, link, loghi, foto, screenshot e reference in `01_INPUT/CLIENT_BRIEF.md`.
7. Compilare in `01_INPUT/CLIENT_BRIEF.md` lo stato del sito precedente (`esiste`, `non esiste - confermato`, `non noto`); se esiste, inventariare le URL vecchie, se non e noto aprire la lacuna in `01_INPUT/MISSING_INFO.md`.
8. Salvare i file visuali disponibili in `04_DESIGN/reference_assets/`.
9. Descrivere reference non copiabili in `04_DESIGN/REFERENCE_AESTHETICS.md`.
10. Aggiornare `WORKFLOW_STATUS.md` a `product_compilation` con prossima azione `compilare 01_INPUT/PRODUCT.md`.
11. Proseguire solo con artifact del cliente corrente.

Le reference visuali sono input di stile e non dati verificati: non autorizzano claim, NAP, recensioni, servizi, aree o avvio design prima di Gate 3.

## Pipeline

1. Avvio progetto cliente.
2. Raccolta brief grezzo.
3. Normalizzazione in `01_INPUT/PRODUCT.md`.
4. Controllo completezza prodotto.
5. Blocco SEO/GEO in 7 step sequenziali: dopo lo step 01 selezione automatica di un archetipo primario, massimo un secondario documentato e modificatori normalizzati; nessun gate aggiuntivo.
6. Consolidamento `03_SEO_GEO/SITE_STRATEGY.md`.
7. Handoff design per Impeccable o strumento equivalente.
8. Mock-to-spec: mock visuale obbligatorio di default; compilazione di `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md` sempre, con o senza mock; senza mock solo con deviazione `mock assente` approvata.
9. Produzione sito statico HTML/CSS/Tailwind-ready/JavaScript vanilla; se si usa Fast Lane, home lock, capability preflight, signature di layout family e fallback Classic vengono registrati prima dell'handoff QA.
10. Handoff QA: flush su file dopo la build e prima del QA finale.
11. QA finale tecnico, SEO/GEO e contenutistico; se si usa Fast Lane, il QA fresco riesegue batch/signature su tutte le URL.
12. Consegna con preview HTTP riproducibile e URL iniziale.

## Output centrali

- `01_INPUT/PRODUCT.md`: brief cliente normalizzato, canonico.
- `03_SEO_GEO/SITE_STRATEGY.md`: blueprint strategico SEO/GEO, canonico.
- `04_DESIGN/DESIGN.md`: direzione visuale e componenti, canonico.
- `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md`: specifica implementativa di riferimento per la build, obbligatoria anche in caso di deviazione `mock assente` approvata.
- `00_SYSTEM/DESIGN_QA_FAST_LANE_KERNEL.md`: Kernel tecnico riusabile per Fast Lane, senza estetica cliente.
- `PRODUCT.md`: bridge locale Impeccable nella root del progetto cliente.
- `DESIGN.md`: bridge locale Impeccable nella root del progetto cliente.
- `05_SITE/`: sorgenti statici.
- `06_QA/QA_REPORT.md`: report finale azionabile.
- `06_QA/evidence/`: screenshot, snapshot e prove QA da conservare.

I bridge `PRODUCT.md` e `DESIGN.md` non sostituiscono gli artifact canonici e devono dichiarare sempre le fonti da cui derivano.

## Archetipi e confine design

I preset versionati in `01_KNOWLEDGE_BASE/SEO_GEO_ARCHETYPES/` precompilano candidati per gli step 02-06. Ogni candidato resta soggetto a dati cliente, keyword research, test doorway, approvazione sitemap e QA pre-design. Un archetipo secondario e ammesso solo per un secondo percorso documentato e non duplica automaticamente pagine o CTA.

La fase SEO/GEO decide cosa ogni pagina deve comunicare: azione, convinzione, obiezione, prova, asset e verita del primo viewport. Dopo Gate 3 Impeccable decide per ogni superficie modalita, mondo visuale, forma e composizione. Nessun archetipo determina estetica o layout.

## Design/QA Fast Lane

La Fast Lane e disponibile solo dopo il `go` registrato nello sprint 2026-07-24. Riduce duplicazioni fra pagine con la stessa layout family, ma non elimina controllo visuale o QA fresco.

Regole:

- Design Kernel tecnico in `00_SYSTEM/DESIGN_QA_FAST_LANE_KERNEL.md`; Design Delta cliente in `04_DESIGN/DESIGN.md` e nello spec.
- Il rappresentante della famiglia riceve critique e score reali.
- Le pagine coperte da famiglia non ereditano score: ricevono solo `coverage_status: verified` con `coverage_ref`.
- `promotion_required`, `blocked_pending_classic`, tooling non disponibile o batch non deterministico riportano alla Classic Lane registrata.
- `home_lock` controlla CSS/JS condivisi, header, footer, componenti e asset portanti dopo `craft home`.
- La Fase 3 E2E deve confermare su run fittizia realistica i risparmi di chiamate, tempo e proxy caratteri misurati nello spike.

## Confini di sessione

Le sessioni lunghe degradano la qualita del lavoro verso fine contesto. I soli reset sanzionati dal workflow sono ai gate 3 e 4 e, obbligatoriamente, dopo handoff QA. Una nuova chat aperta per comodita in un altro punto e una `ripresa ordinaria`, non un nuovo gate e non un reset sanzionato. Regole:

1. Il reset lo esegue l'utente (nuova chat o `/clear`); l'orchestratore puo solo segnalare il punto di reset, mai eseguirlo.
2. Prima di segnalare il reset, l'orchestratore esegue un flush: decisioni, assunzioni e prossima azione devono essere su file; `WORKFLOW_STATUS.md` e `07_HISTORY/E2E_RUN_LOG.md` aggiornati. Se qualcosa vive solo in chat, va scritto prima.
3. La sessione nuova riparte solo dai file: legge `WORKFLOW_STATUS.md` (fase, blocchi, prossima azione) e il run log, senza chiedere all'utente di rispiegare il lavoro fatto. Input tipico: "continua cliente `<slug>`".
4. Ogni ripresa va registrata come checkpoint `sessione`. Il dettaglio distingue `ripresa ordinaria` da `ripresa da reset Gate 3`, `ripresa da reset Gate 4` o `ripresa da reset handoff_qa`; non usare la parola reset per una ripresa ordinaria.
5. Dopo la build completa, l'orchestratore assegna il successivo ID semplice `QA-NNN` (progressivo nel progetto), lo registra nello status e nel nuovo checkpoint `handoff_qa`, aggiorna la prossima azione a `eseguire QA finale da sessione fresca per QA-NNN`, poi segnala il reset obbligatorio.
6. Il QA finale va eseguito solo dopo un checkpoint `sessione` successivo a `handoff_qa` con dettaglio `ripresa da reset handoff_qa`, stesso `QA-NNN` e ID dell'handoff. Una ripresa ordinaria non soddisfa Gate 5.
7. Non introdurre stop o reset di default dentro la build: dopo `craft home` si prosegue con pagine interne, `polish`, `adapt`, critique e score fino a build chiusa. Ci si ferma solo per un blocco previsto dai gate/playbook, una decisione utente realmente bloccante o una richiesta esplicita dell'utente.
8. Solo ai gate 3 e 4: se l'utente decide di proseguire senza reset, registrare un checkpoint `sessione` con dettaglio `reset Gate 3 declinato` o `reset Gate 4 declinato`. All'handoff QA il reset non puo essere declinato.
9. L'orchestratore chiude il messaggio con un prompt di ripartenza pronto da copiare nella nuova sessione in due casi: a ogni reset sanzionato segnalato, dopo il flush; e a ogni fine turno ordinario con flush completo e prossima azione in mano all'utente. Il prompt ordinario non raccomanda reset e ordina di registrare `ripresa ordinaria`; il prompt dei gate 3/4 o handoff QA nomina il reset sanzionato. Per handoff QA include anche `QA-NNN` e ID checkpoint `handoff_qa`. Tutti i path sono espliciti con prefisso `projects/<cliente>/`. Esempio di reset Gate 3:

```
Continua cliente `progetto-esempio`. Working directory: `projects/progetto-esempio/`. Fase: `ready_for_design`. Reset sanzionato Gate 3 dopo checkpoint G-003. Leggi `projects/progetto-esempio/WORKFLOW_STATUS.md` e `projects/progetto-esempio/07_HISTORY/E2E_RUN_LOG.md`, registra un checkpoint `sessione` con dettaglio `ripresa da reset Gate 3`, poi esegui la prossima azione indicata nello status.
```

Il prompt e un output di cortesia: la fonte di verita resta `WORKFLOW_STATUS.md`.

## Ciclo QA e validita corrente

L'ID `QA-NNN` identifica un tentativo di QA aperto da un singolo `handoff_qa`. Non e un nuovo sottosistema: compare solo in `WORKFLOW_STATUS.md`, nel checkpoint `handoff_qa`, nel checkpoint `sessione` di ripresa QA, in `QA_REPORT.md` e in `FINAL_CHECKLIST.md`.

Il run log conserva gate e cicli passati. Lo status dichiara cosa e corrente. Se il lavoro viene riaperto dopo Gate 5, applicare `00_SYSTEM/GATING_RULES.md`, sezione Invalidazione dopo Gate 5: il vecchio ciclo resta storico, QA diventa `superseded`, la checklist non corrente e la consegna sospesa fino a nuovo handoff.

## Scratch condivisi

Le cartelle root `output/`, `.playwright-mcp/` e `.impeccable/` sono scratch condivisi, non artifact di workflow. Se una prova visuale o tecnica deve restare nel progetto, copiarla o salvarla direttamente in `projects/<cliente>/06_QA/evidence/` e citarla in `06_QA/QA_REPORT.md`.
