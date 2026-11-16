# Design

## Funzione

Bridge locale per Impeccable. Non e l'artifact canonico del workflow.

## Fonti canoniche

- `04_DESIGN/DESIGN.md`
- `03_SEO_GEO/SITE_STRATEGY.md`
- `01_INPUT/PRODUCT.md`
- `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md` (da citare sempre)
- File mock in `04_DESIGN/reference_assets/` se presente (senza mock serve deviazione `mock assente` approvata)

## Fidelity rules

Riportare qui le fidelity rules non negoziabili da `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md`. Il mock e specifica di produzione, non reference.

## Stato

- Da compilare dopo `04_DESIGN/DESIGN.md`.
- Prima del design, usare questo file solo come bridge vuoto locale per evitare fallback alla root.

## Design Direction

Compilare sintesi di mood, palette, tipografia, fotografia e layout solo da `04_DESIGN/DESIGN.md`.

## Impeccable new-work derivato

- Superficie/target: derivare da `04_DESIGN/DESIGN.md`.
- Modalita: derivare da `04_DESIGN/DESIGN.md`.
- Direzione scelta: derivare da `04_DESIGN/DESIGN.md`.
- Rischio dichiarato: derivare da `04_DESIGN/DESIGN.md`.

La modalita e una decisione per superficie registrata nel canonico, non un valore derivato dall'archetipo SEO/GEO.

## Direction contract derivato

Riportare `THESIS`, `OWN-WORLD`, `STORY`, `FIRST VIEWPORT` e `FORM` solo da `04_DESIGN/DESIGN.md`. Seed/key, challenger e note di processo restano nel canonico/spec e non diventano autorita del bridge.

## Fast Lane derivata

- Kernel tecnico: derivare da `04_DESIGN/DESIGN.md` e `00_SYSTEM/DESIGN_QA_FAST_LANE_KERNEL.md`.
- Design Delta: derivare da `04_DESIGN/DESIGN.md`.
- Layout family candidate:
- Rappresentanti:
- Route `direct_only`:
- Signature e assessment ledger: derivare da `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md`.

Questo bridge non inventa signature, coverage o fallback. Le pagine in `family_coverage` non ereditano score; la fonte di verita resta lo spec e il run log.

## Strategic Constraints

- Sitemap: derivare da `03_SEO_GEO/SITE_STRATEGY.md`.
- CTA: derivare da `03_SEO_GEO/SITE_STRATEGY.md`.
- Pages Not To Create: derivare da `03_SEO_GEO/SITE_STRATEGY.md`.
- Claim, NAP, recensioni e prove: usare solo dati confermati o dichiarati come lacuna/assunzione.

## Implementation Notes

- HTML statico.
- CSS/Tailwind-ready.
- JavaScript vanilla leggero.
- Contenuti critici in HTML.
- Evidenze QA da conservare in `06_QA/evidence/`.

## Workflow Source

Questo file serve a Impeccable come bridge nella root del progetto cliente. La direzione visuale canonica resta `04_DESIGN/DESIGN.md`.

Impeccable va usato solo con working directory dentro `projects/<cliente>/`. Non usare bridge cliente in `docs/` e non affidarsi a `--target projects/<cliente>` dalla root.
