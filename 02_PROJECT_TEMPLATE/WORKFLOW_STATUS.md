# Workflow status

## Fase corrente

`waiting_for_brief`

## Bootstrap nuovo cliente

- [ ] Richiesta nuovo cliente ricevuta.
- [ ] Nome attivita identificato.
- [ ] Slug ASCII kebab-case definito.
- [ ] Progetto creato copiando `02_PROJECT_TEMPLATE/`.
- [ ] Working directory operativa dentro `projects/<cliente>/`.
- [ ] Nessun artifact copiato da clienti precedenti.
- [ ] Primo prompt persistito in `01_INPUT/CLIENT_BRIEF.md`.
- [ ] Allegati/link/materiali visuali inventariati in `01_INPUT/CLIENT_BRIEF.md`.
- [ ] File visuali disponibili salvati in `04_DESIGN/reference_assets/`.
- [ ] Reference visuali descritte in `04_DESIGN/REFERENCE_AESTHETICS.md`.

## Artifact presenti

- [ ] `01_INPUT/CLIENT_BRIEF.md`
- [ ] `01_INPUT/PRODUCT.md`
- [ ] `01_INPUT/MISSING_INFO.md`
- [x] `PRODUCT.md` (bridge Impeccable locale, da compilare)
- [ ] `03_SEO_GEO/SITE_STRATEGY.md`
- [x] `DESIGN.md` (bridge Impeccable locale, da compilare)
- [x] `04_DESIGN/reference_assets/README.md`
- [ ] `04_DESIGN/DESIGN.md`
- [ ] `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md`
- [ ] `06_QA/QA_REPORT.md`
- [ ] `06_QA/FINAL_CHECKLIST.md`
- [ ] `06_QA/QA_FIX_LOG.md`
- [x] `06_QA/evidence/README.md`

## Step SEO/GEO

- [ ] 01 Brief Normalizer
- [ ] 02 Local Intent Mapper
- [ ] 03 Sitemap Decision Engine
- [ ] 04 Page Blueprint Generator
- [ ] 05 Heading and Content Depth Planner
- [ ] 06 Local SEO / GEO Signals Planner
- [ ] 07 SEO QA Gate

## Validita corrente gate

Il run log conserva lo storico dei superamenti. Questa tabella dichiara solo la validita corrente.

| Gate | Validita corrente | Checkpoint storico di riferimento | Note |
| --- | --- | --- | --- |
| Gate 1 | non superato / corrente / non corrente |  |  |
| Gate 2 | non superato / corrente / non corrente |  |  |
| Gate 3 | non superato / corrente / non corrente |  |  |
| Gate 4 | non superato / corrente / non corrente |  |  |
| Gate 5 | non superato / corrente / non corrente |  |  |

Definizioni vincolanti in `00_SYSTEM/GATING_RULES.md`.

## Consegna e ciclo QA corrente

- Stato consegna: `non pronta` / `pronta` / `consegnata` / `sospesa`
- Ciclo QA: `n/a` / `QA-NNN`
- Checkpoint `handoff_qa` corrente:
- Checkpoint `sessione` di ripresa QA corrente:
- `06_QA/QA_REPORT.md`: `non verificato` / `corrente` / `superseded`
- `06_QA/FINAL_CHECKLIST.md`: `non corrente` / `corrente`
- Preview HTTP di consegna, URL iniziale:

Se una modifica riapre il lavoro dopo Gate 5: fase riaperta, Gate 5 `non corrente`, consegna `sospesa`, QA report `superseded`, checklist `non corrente` e blocco `nuovo handoff QA obbligatorio`. Lo storico resta nel run log.

## Pilot hook advisory

- Stato: vietato / pendente - slug non fornito / autorizzato / attivo / disattivato / interrotto
- Slug test non produttivo autorizzato:
- Gate 4 corrente: si / no
- Ultimo checkpoint `hook_pilot`:
- Hook confermato `off` prima di `handoff_qa`: si / no / n.a.
- Prossima azione pilot:

Senza slug test autorizzato lo stato resta `pendente - slug non fornito` e nessun hook viene attivato. Il pilot e advisory, solo in build dopo Gate 4, e non sostituisce detector, score o QA.

## Design/QA Fast Lane

- Stato: non usata / candidata / preflight fallito / attiva / fallback classic / chiusa
- Kernel tecnico: `00_SYSTEM/DESIGN_QA_FAST_LANE_KERNEL.md`
- Design Delta compilato: si / no / n.a.
- Layout family candidate:
- Rappresentante:
- Route `direct_only`:
- Checkpoint `home_lock` corrente:
- Checkpoint `family_assessment` corrente:
- Coverage QA fresco: n.a. / verificato / fallito
- Fallback Classic aperti:

Fast Lane e ammessa solo con capability preflight riuscito su DOM renderizzato. Una pagina in `family_coverage` non eredita score dal rappresentante: deve avere `coverage_status: verified` e `coverage_ref` fresco. `coverage_status: failed`, `promotion_required` e `blocked_pending_classic` restano blocchi finche non sono risolti.

## Blocchi aperti

- Inserire qui dati mancanti, decisioni utente richieste o rischi critici.
- Se nome attivita o slug non sono chiari, chiedere solo quel dato prima di creare il progetto.
- Prima del design, verificare che Impeccable sia usato da `projects/<cliente>/` e non dalla root.
- Se Fast Lane e candidata o attiva, bloccare Gate 5 finche home lock, family assessment, coverage QA fresco e fallback Classic non sono chiusi.

## Decisioni aperte

| Decisione | Owner | Impatto | Stato |
| --- | --- | --- | --- |
|  |  |  |  |

## Prossima verifica dati locali

| Dato | Fonte attesa | Stato | Note |
| --- | --- | --- | --- |
| NAP |  |  |  |
| Orari |  |  |  |
| Area servita |  |  |  |
| Prove di fiducia |  |  |  |

## Prossima azione

- Se il progetto e appena nato da primo prompt: compilare `01_INPUT/PRODUCT.md` da `01_INPUT/CLIENT_BRIEF.md`.
- Altrimenti raccogliere o normalizzare il brief cliente.

## Ultimo aggiornamento

- YYYY-MM-DD
