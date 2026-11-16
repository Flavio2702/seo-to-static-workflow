# 04_DESIGN

Cartella per handoff design e output Impeccable o equivalente.

L'handoff canonico vive in `DESIGN.md` e `MOCK_IMPLEMENTATION_SPEC.md`. Non creare un artifact separato `DESIGN_HANDOFF.md`.

Non iniziare questa fase se `03_SEO_GEO/SITE_STRATEGY.md` manca o se `07_SEO_QA_GATE.md` non indica `ok per design`.

Prima di usare Impeccable verificare:

- working directory dentro `projects/<cliente>/`;
- bridge locali `PRODUCT.md` e `DESIGN.md` presenti nella root del progetto cliente;
- nessun bridge cliente in `docs/`;
- nessun affidamento a `--target projects/<cliente>` lanciato dalla root.
- reference visuali registrate in `REFERENCE_AESTHETICS.md`;
- file visuali del cliente salvati in `reference_assets/` quando disponibili.

Se si usa Design/QA Fast Lane, compilare prima nei canonici:

- Design Delta e layout family candidate in `DESIGN.md`;
- signature semantica, home lock, assessment ledger e fallback Classic in `MOCK_IMPLEMENTATION_SPEC.md`;
- checkpoint `home_lock` e `family_assessment` in `07_HISTORY/E2E_RUN_LOG.md`.

La Fast Lane non assegna estetica dal Kernel e non eredita score fra pagine. Una copertura fallita o non verificabile torna alla Classic Lane.
