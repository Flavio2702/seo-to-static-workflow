# Mock implementation spec

## Funzione

Trasformare il mock approvato in specifica implementativa per `05_SITE/`. Il mock e una specifica di produzione, non una reference. Se non esiste mock approvato, dichiararlo in `Mock source` e applicare la fedelta attesa a `04_DESIGN/DESIGN.md`.

## Input usati

- `03_SEO_GEO/SITE_STRATEGY.md`
- `04_DESIGN/DESIGN.md`
- Mock/concept:
- Reference assets:

## Mock source

- File:
- Stato: approvato / da iterare / assente con deviazione approvata
- ID candidato mock finale: `MOCK-NNN` / n.a.
- Decisione approvazione utente per lo stesso ID in `07_HISTORY/DECISION_LOG.md`:
- Deviazione mock assente approvata da utente: si / no / n.a. (senza mock e senza deviazione approvata Gate 4 non parte)
- Fedelta attesa: alta / media / bassa (default: alta per la homepage)
- Direction contract di origine: `04_DESIGN/DESIGN.md`, sezione `Direction contract`
- Iterazioni collegate:
- Candidato finale derivato dalle iterazioni: `MOCK-NNN` / n.a.

Bozze e iterazioni intermedie non richiedono approvazione e non aprono stop. Se il mock e presente, solo il candidato finale identificato qui richiede approvazione esplicita ed e bloccante per Gate 4; una approvazione generica o riferita a un ID precedente non vale.

## New-work reproducibility

- Scope: surface / direction
- Modalita: Persuade / Operate / Read / Experience
- Comando di generazione:
- Seed/key riproducibile:

## Direction round

- Direzione assegnata:
- Challenger realmente presentati:
- Esito:
- Fonte della scelta: utente / fallback upstream documentato

Il round e una decisione progettuale tracciata, non una approvazione bloccante e non un gate.

## Section inventory

| Ordine | Sezione mock | Peso visuale | Implementazione richiesta | Deviazioni ammesse |
| --- | --- | --- | --- | --- |

## Asset inventory

| Asset | Tipo | Presente nel mock | File richiesto | Uso | Rischio |
| --- | --- | --- | --- | --- | --- |

## Component inventory

| Componente | Varianti | Regole visuali | Note responsive |
| --- | --- | --- | --- |

## Fast Lane signature

- Fast Lane: non usata / candidata / attiva / fallback classic
- Schema signature:
- Layout family:
- Rappresentante:
- Batch/run ID:

| Regola | Valore atteso | Note |
| --- | --- | --- |
| Landmark e ordine |  |  |
| Componenti obbligatori e cardinalita |  |  |
| Slot obbligatori e densita |  |  |
| Interazioni e stati |  |  |
| Invarianti desktop/mobile |  |  |
| Trigger `promotion_required` |  |  |
| Route `direct_only` |  |  |

La signature verifica copertura familiare, non qualita estetica completa. Una famiglia con una sola pagina, una pagina `direct_only` o una copertura fallita torna alla Classic Lane.

## Home lock

- Stato: n.a. / aperto / corrente / invalidato
- `home_lock_id`:
- Checkpoint run log:
- Elementi bloccati: CSS globale, JS condiviso, header, footer, componenti e asset portanti home
- Hash o identificatori:
- Invalidatori osservati:
- Confronto mirato richiesto: si / no

Il lock e tecnico e non introduce una seconda approvazione utente.

## Assessment ledger

| Route | Family | Assessment mode | Visual score | Coverage status | Coverage ref | Promotion required | Fallback Classic | Checkpoint |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  | direct / family_coverage / classic | numero / n.a. | verified / failed / n.a. |  | si / no | n.a. / motivo + azione |  |

`visual_score` e numerico solo per `direct` o `classic` con critique reale. Per `family_coverage` resta `n.a.`; una pagina coperta non eredita mai lo score del rappresentante. `coverage_status: failed`, `promotion_required` e `blocked_pending_classic` non sono stati consegnabili.

## Fallback Classic Lane

| Route | Family candidata | Motivo fallback | Azione richiesta | Stato | Checkpoint |
| --- | --- | --- | --- | --- | --- |
|  |  | tooling unavailable / coverage failed / promotion required / direct_only / famiglia singola / nondeterminismo | critique + score diretto | aperto / chiuso |  |

## Fidelity rules

Cose da preservare obbligatoriamente. Esempi di regola:
- Se il mock mostra un collage con 1 immagine grande e 2 miniature, la build implementa un collage equivalente.
- Se mancano foto reali, il default nei componenti visivi portanti (hero, collage, trust visuale, pannelli reparto) e generare asset visuali di esempio: illustrazioni o SVG locali coerenti con palette, logo e soggetto dell'attivita. Il pannello solo testo o gradient e ammesso unicamente per componenti secondari. Il componente non si elimina mai.
- Il mock visuale della fase design usa gli stessi asset di esempio: un mock senza immagini nei componenti portanti non rappresenta il sito e non e una specifica di produzione valida.
- Ogni asset di esempio va registrato nell'Asset inventory come `di esempio, da sostituire con foto reali` con la lacuna corrispondente in `01_INPUT/MISSING_INFO.md`; la sostituzione non richiede riapprovazione del mock se composizione e gerarchia non cambiano.
- Gli asset di esempio non devono fabbricare prove specifiche: niente volti spacciati per il team reale, niente recensioni o certificazioni visive, niente insegne con nomi diversi dal brand. Soggetti generici e coerenti con l'offerta sono ammessi. Se un asset rischia di sembrare portfolio reale, marcarlo con caption discreta tipo `immagine illustrativa`.

## SEO/GEO constraints

Vincoli da `SITE_STRATEGY.md` che la fedelta visuale non puo cambiare: sitemap, CTA, segnali locali, Pages Not To Create, limiti sui claim.

## Allowed deviations

| Deviazione | Motivo | Impatto | Approvata |
| --- | --- | --- | --- |

Una semplificazione visuale e ammessa solo se: evita un claim falso; evita un dato locale inventato; evita un asset non autorizzato; risolve un problema tecnico o responsive verificato; e registrata qui.

## Impeccable preflight

- [ ] Working directory dentro `projects/<cliente>/`.
- [ ] Setup Impeccable stampa i bridge di questo cliente, non di altri.
- [ ] Bridge `PRODUCT.md` coerente con `01_INPUT/PRODUCT.md`.
- [ ] Bridge `DESIGN.md` coerente con `04_DESIGN/DESIGN.md` e con questo spec.
- [ ] Mock salvato in `04_DESIGN/reference_assets/` oppure deviazione `mock assente` approvata dall'utente e registrata in `07_HISTORY/DECISION_LOG.md`.
- [ ] Con mock presente, ID candidato finale e decisione utente coincidono.
- [ ] Se Fast Lane candidata o attiva, capability preflight su DOM renderizzato disponibile oppure fallback Classic registrato.

## Build checklist

- [ ] Hero fedele.
- [ ] Sezioni nello stesso ordine del mock.
- [ ] Collage/miniature implementati o deviazione registrata.
- [ ] CTA coerenti con `SITE_STRATEGY.md`.
- [ ] Mobile verificato senza impoverimento non registrato.
- [ ] Contrasto misurato almeno 4.5:1 per testo normale e 3:1 per testo grande e componenti essenziali.
- [ ] Spot-check contrasto documentati per hero/collage, CTA, sezioni scure, footer e testo muted, indicando combinazione foreground/background e rapporto.
- [ ] Copy visibile e commenti HTML verificati: nessuna meta-copy, direction contract, seed/key, challenger, nota di processo, etichetta dello spec o istruzione interna di layout/tono.
- [ ] Se Fast Lane attiva, `home_lock` corrente, batch deterministico e assessment ledger compilato.
- [ ] Nessuna pagina con `family_coverage` eredita score dal rappresentante; `visual_score` resta `n.a.` e `coverage_ref` cita batch fresco.
- [ ] Ogni `coverage_status: failed`, `promotion_required` o `blocked_pending_classic` e risolto con Classic Lane o decisione registrata prima di `handoff_qa`.
- [ ] Deviazioni registrate.

La checklist va chiusa integralmente prima del checkpoint `handoff_qa`. Una voce non applicabile usa `n/a` con motivo e riferimento; una casella vuota non vale come chiusa.

## Chiusura build checklist

- Stato: aperta / chiusa
- Data:
- ID checkpoint `build_checklist` nel run log:
- Voci `n/a` con motivo e riferimento:
