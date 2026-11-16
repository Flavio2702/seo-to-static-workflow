# QA report

## Funzione

Report leggibile e azionabile per bloccare o approvare la consegna.

## Stato finale

- Stato: `non verificato` / `corrente` / `superseded`
- Data:
- Reviewer:
- Ciclo QA: `QA-NNN`
- Checkpoint `handoff_qa`:
- Checkpoint `sessione` di ripresa QA:
- Sostituisce ciclo QA:

Se il lavoro viene riaperto dopo Gate 5, marcare questo report `superseded` prima di modificare il sito. Il nuovo ciclo QA deve usare un nuovo ID, handoff e ripresa; questo report non resta prova corrente.

Gate 5 accetta solo lo stato `corrente`; `non verificato` e `superseded` bloccano la consegna.

## Sintesi

- Critici:
- Alti:
- Medi:
- Bassi:
- Quick wins:
- Decisioni bloccanti:

## Controlli obbligatori

- [ ] Coerenza con `01_INPUT/PRODUCT.md`.
- [ ] Coerenza con `03_SEO_GEO/SITE_STRATEGY.md`.
- [ ] Coerenza con `04_DESIGN/DESIGN.md`.
- [ ] Coerenza bridge locali `PRODUCT.md` e `DESIGN.md`.
- [ ] H1 unico per pagina.
- [ ] Title/meta previsti.
- [ ] CTA presenti.
- [ ] Segnali locali visibili.
- [ ] NAP verificato.
- [ ] Internal linking coerente.
- [ ] Nessun link rotto.
- [ ] Nessuna pagina orfana.
- [ ] Nessuna pagina inutile o duplicata.
- [ ] Nessun rischio doorway.
- [ ] Nessun dato locale inventato.
- [ ] Nessun linguaggio di processo o nota interna visibile nel sito (etichette dello spec, note "da confermare", spiegazioni di layout o tono).
- [ ] Schema coerente con contenuto visibile.
- [ ] FAQ basate su domande reali.
- [ ] Contenuti non generici.
- [ ] Accessibilita base.
- [ ] Contrasto misurato: almeno 4.5:1 per testo normale e 3:1 per testo grande e componenti essenziali.
- [ ] Spot-check contrasto documentati su hero/collage, CTA e relativi stati, sezioni scure, footer e testo muted.
- [ ] Mobile.
- [ ] Render headless full-page (desktop e mobile): tutte le sezioni popolate, nessun contenuto
  critico nascosto da animazioni reveal o stati JS.
- [ ] Performance.
- [ ] Completezza directory.
- [ ] Artifact mancanti.
- [ ] Evidenze QA da conservare salvate in `06_QA/evidence/`.
- [ ] Nessuna evidenza di consegna dipende da `output/`, `.playwright-mcp/` o `.impeccable/` root.
- [ ] Mock fidelity QA compilata (con mock, o dichiarando la deviazione `mock assente` approvata).
- [ ] Checkpoint `score` di chiusura build presente nel run log per ogni pagina valutata direttamente (route `direct`, rappresentante di layout family, `direct_only`, Classic Lane, fallback), sopra soglia o con deviazione `score sotto soglia` approvata, e confermato dalla tabella Critique score. Le route in `family_coverage` non richiedono score build: verificare per esse `coverage_status: verified` e `coverage_ref` al batch, e aprire un finding se hanno uno score build ereditato dal rappresentante. Perimetro in `00_SYSTEM/GATING_RULES.md`, Gate 5.
- [ ] Score QA presente per ogni route consegnata, incluse le route che in build erano in `family_coverage`: in QA fresco nessuna route e esonerata da critique, detector e score autonomi.
- [ ] Build checklist di `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md` chiusa prima di `handoff_qa`, con stato, data e checkpoint; nessuna voce vuota o `n/a` senza motivo e riferimento.
- [ ] Sequenza run log verificata sulle pagine valutate direttamente: `shape -> craft -> polish/adapt per pagina -> critique reale -> score -> handoff_qa`, con route/path e checkpoint distinti per pagina; per le route `family_coverage` sono richiesti il batch `family_assessment` e il checkpoint `adapt`.
- [ ] Se Fast Lane usata: checkpoint `home_lock` e `family_assessment` presenti, capability preflight riuscito, batch/signature QA fresco rieseguito su tutte le URL.
- [ ] Nessuna pagina in `family_coverage` eredita score dal rappresentante; `visual_score` e `n.a.`, `coverage_status` e `verified`, `coverage_ref` cita batch fresco.
- [ ] Ogni `coverage_status: failed`, `promotion_required` o `blocked_pending_classic` e stato risolto prima della consegna con Classic Lane o decisione registrata.
- [ ] Ciclo QA, handoff e ripresa QA coincidono fra questo report, `WORKFLOW_STATUS.md` e run log.
- [ ] Evidenze render desktop e mobile generate in questa sessione QA (fresche) per ogni pagina consegnata; screenshot ereditati dalla build usati solo come supporto diagnostico, mai come prova di consegna. Se il render fresco fallisce, il QA e bloccato.
- [ ] Checkpoint `render_preflight` QA presente prima degli screenshot del ciclo, con interprete, browser, modalita, working directory, escalation, porta, route/firme, fase e `<run-ts>` coerenti con le evidenze.
- [ ] Nessun file orfano resta in `06_QA/evidence/`; ogni anomalia e stata registrata prima della rimozione, il ciclo e stato ripetuto con prove valide e il blocco e stato chiuso senza checkpoint retroattivi.
- [ ] Eventuali anomalie sticky visibili solo nei full-page confermate con viewport o geometria browser dopo reload, verifica route/firma e scroll `0,0`; nessun finding aperto dal solo stitching full-page.

Qualunque meta-copy, nota interna o istruzione di processo visibile apre un finding e impedisce la chiusura del QA finche non viene rimossa oppure il lavoro non torna in build secondo il flusso di fix.

## Mock fidelity QA

Va compilata sempre. Con mock, confrontare il mock in `04_DESIGN/reference_assets/` con gli screenshot desktop e mobile in `06_QA/evidence/`. Se il mock e assente per deviazione approvata, dichiararlo e valutare la fedelta verso `04_DESIGN/DESIGN.md` e `MOCK_IMPLEMENTATION_SPEC.md`: i controlli restano gli stessi, il riferimento diventa il design canonico. Usare `n/a` solo per i controlli che presuppongono il mock e non hanno equivalente nel design canonico, indicando il motivo nella colonna evidenza; mai marcare `ok` un controllo non applicabile.

| Controllo | Esito | Evidenza |
| --- | --- | --- |
| Hero coerente con mock o con design canonico |  |  |
| Sezioni nello stesso ordine del riferimento |  |  |
| Miniature/collage implementati o deviazione motivata |  |  |
| Componenti chiave presenti |  |  |
| Palette e tipografia coerenti con il riferimento |  |  |
| Mobile non impoverito oltre il necessario |  |  |
| Deviazioni registrate in `MOCK_IMPLEMENTATION_SPEC.md` |  |  |
| Contrasto 4.5:1 testo normale e 3:1 testo grande/componenti essenziali |  |  |
| Spot-check hero/collage, CTA, sezioni scure, footer, testo muted |  |  |

Se il mock contiene immagini, miniature o collage e la build li elimina senza deviazione registrata, aprire un finding.

## Critique score

Il critique della sessione QA fresca e solo verifica: conferma score netto, detector e verdetto per ogni pagina consegnata, zero modifiche al sito. Definizione dello score, soglie, regole di esclusione e deviazione build `score sotto soglia` stanno solo in `00_SYSTEM/IMPECCABLE_PLAYBOOK.md`, sezione Score netto e chiusura pagina: applicare quella, non copie. Regole proprie del QA: uno scarto tra score di verifica e score del run log diventa finding; uno score di verifica mancante o sotto soglia blocca Gate 5 (lo score di build da solo non basta). Uno score QA sotto soglia passa solo con una nuova decisione `score QA sotto soglia`, presa dopo il critique e riferita a pagina, score QA e checkpoint `impeccable` correnti; la deviazione build non e riutilizzabile. Uno score assente passa solo con decisione separata `critique QA saltato e score QA assente`, riferita alle pagine coinvolte. Le decisioni richiedono approvazione dell'utente in `07_HISTORY/DECISION_LOG.md` con owner Utente. Il detector QA fresco deve avere path o estratto dell'output nel checkpoint `impeccable` del critique ed essere pulito oppure contenere solo finding esclusi secondo il playbook; uno score sopra soglia non compensa finding deterministici. Una pagina chiusa in build con deviazione `score sotto soglia` va riportata in tabella con il riferimento alla decisione, mai riconteggiata come superata. Rifiutare score ricostruiti retroattivamente e punteggi fotocopia non giustificati: aprire un finding e richiedere una valutazione reale. Un finding detector puo essere escluso come `falso positivo strumentale` solo con prova tecnica puntuale nei file, citata nel checkpoint, e dentro il tetto di esclusioni del playbook.

Perimetro della tabella: una riga per ogni route consegnata, incluse le route che in build erano in `family_coverage`. Nella colonna `Score netto build` il valore `n.a. - family_coverage` e ammesso per queste route e va accompagnato dal `coverage_ref` del batch di build: e la forma corretta, non una lacuna. Nella colonna `Score verifica QA` quel valore non e mai ammesso: in QA fresco ogni route ha score autonomo, e una casella `n.a.` qui e una condizione bloccante per Gate 5, non una copertura. Uno score build presente su una route `family_coverage` e invece un finding di score ereditato. Perimetro vincolante in `00_SYSTEM/GATING_RULES.md`, Gate 5.

| Pagina | Score netto build (run log) | Score verifica QA | Euristiche escluse (rif. lacuna puntuale) | Detector QA + evidenza | Esito soglia e detector | Decisione QA (rif. `DECISION_LOG.md`) | Note |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  | numero / `n.a. - family_coverage` + coverage_ref | numero (mai `n.a. - family_coverage`) |  | pulito / finding esclusi + rif. checkpoint |  | n/a / `score QA sotto soglia` / critique saltato |  |

## Fast Lane coverage QA

Compilare se e stata usata Fast Lane. Il QA fresco riesegue batch/signature su tutte le URL consegnate. Questa tabella registra la riverifica della copertura, non sostituisce la tabella `Critique score`: in QA fresco ogni route ha critique, detector e score autonomi, anche quelle che in build erano in `family_coverage`. La copertura familiare evita valutazioni duplicate solo in build, mai in QA. La colonna `Visual score` riporta il valore del ledger (`n.a.` per le route coperte), non lo score QA della route, che sta nella tabella `Critique score`.

| Route | Family | Assessment mode | Coverage status QA | Coverage ref QA | Visual score | Promotion required | Fallback Classic chiuso | Evidenza/checkpoint |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  | direct / family_coverage / classic | verified / failed / n.a. |  | numero / n.a. | si / no | si / no / n.a. |  |

Bloccare il QA se una route ha `coverage_status: failed`, `promotion_required` non risolto, `blocked_pending_classic` aperto, score ereditato dal rappresentante o batch non deterministico.

## Problemi

| ID | Severita | Priorita operativa | Evidenza | Impatto | Dipendenze | Correzione | Next action | Owner | Stato | Criterio accettazione | Indicatore fallimento |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  | critica/alta/quick win/ongoing |  |  |  |  |  |  |  |  |  |

## Decisioni richieste

- 

## Evidenze QA

Le evidenze render (preview e screenshot desktop/mobile) vanno prodotte secondo `00_SYSTEM/LOCAL_RENDER_PLAYBOOK.md`: server HTTP verificato, profilo `ciclo_atomico` di default per tool call isolate oppure `shell_persistente` dimostrato, comandi browser sequenziali, mai `file://`, reload della route, verifica firma e scroll `0,0` prima di ogni acquisizione. Nel ciclo atomico, `render_preflight` viene persistito con `apply_patch` dentro la stessa esecuzione orchestrata che conserva server e cleanup; deve precedere gli screenshot e avere lo stesso `<run-ts>` del ciclo. Salvare direttamente in `06_QA/evidence/`: full-page obbligatori con formato `<run-ts>_<pagina>_<fase>_<viewport>_full-page.png`; catture viewport conservate solo se sostengono un controllo/finding, con suffisso `_viewport.png`. Non sovrascrivere mai un path esistente. Serve una coppia full-page desktop/mobile per OGNI pagina consegnata, una riga di tabella per evidenza: una sola coppia generica (es. solo home) non copre il critique per pagina.

| Evidenza | Percorso in `06_QA/evidence/` | Tipo | Ciclo/fase | Checkpoint precedente | Route/firma | Origine | Controllo collegato | Note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  | full-page / viewport diagnostico | QA-NNN / qa | `render_preflight` |  | fresca / ereditata dalla build + motivo |  |  |

Per lo sticky header, una duplicazione o sovrapposizione visibile solo nel full-page stitched non basta. Citare la cattura viewport o la verifica geometrica che riproduce il difetto dopo reload della stessa route; in assenza di conferma, annotare l'artefatto di stitching e non aprire un finding.

## Preview HTTP di consegna

- Working directory: root del progetto cliente
- Comando server: `python -m http.server 8080 --directory 05_SITE`
- URL iniziale: `http://localhost:8080/`
- Istruzione chiusura server: `Ctrl+C`

Comando e URL devono usare la stessa porta. `file://` e il solo path `index.html` non sono preview valide.

## Note di falsificabilita

- Ogni problema deve poter essere verificato da una persona o da un controllo tecnico.
- L'indicatore di fallimento spiega come capire che la correzione non ha risolto il problema.
- Se manca evidenza, il problema resta come decisione richiesta o assunzione, non come finding confermato.
