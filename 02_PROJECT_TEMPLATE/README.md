# Project template

Template da copiare in `projects/<cliente>/` per ogni nuovo sito locale.

Non lavorare direttamente sul template per un cliente reale. Copialo prima, poi aggiorna gli artifact nella cartella cliente.

Non copiare mai un progetto cliente precedente per crearne uno nuovo.

`PRODUCT.md` e `DESIGN.md` nella root del progetto copiato sono bridge locali per Impeccable. Gli artifact canonici restano:

- `01_INPUT/PRODUCT.md`
- `03_SEO_GEO/SITE_STRATEGY.md`
- `04_DESIGN/DESIGN.md`

Usare Impeccable solo con working directory dentro `projects/<cliente>/`. `--target projects/<cliente>` dalla root non e considerato sufficiente.

Se il progetto nasce da un primo prompt con brief e reference, salvare subito il prompt in `01_INPUT/CLIENT_BRIEF.md`, inventariare gli allegati, compilare lo stato del sito precedente con eventuale inventario URL (oppure aprire la lacuna in `01_INPUT/MISSING_INFO.md`) e mettere eventuali file visuali in `04_DESIGN/reference_assets/`.

## Ordine operativo

1. `01_INPUT/`
2. `02_CONTEXT/`
3. `03_SEO_GEO/`
4. `04_DESIGN/`
5. `05_SITE/`
6. `06_QA/`
7. `07_HISTORY/`

La pipeline canonica e in `00_SYSTEM/WORKFLOW_OVERVIEW.md`; l'ordine dei 7 step e in `03_SEO_GEO/README.md`.

Aggiorna `WORKFLOW_STATUS.md` a ogni passaggio.
