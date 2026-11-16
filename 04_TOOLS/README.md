# 04_TOOLS

Spazio per utility future: validatori, script di creazione progetto, controlli QA.

Nella v1 non sono previste automazioni premature. Aggiungere strumenti solo dopo un primo test end-to-end riuscito e con scopo chiaro.

Utility locali presenti:

- `run-impeccable-context.ps1`: wrapper del preflight Impeccable con working directory obbligatoria dentro `projects/<cliente>/`, target cliente-relative obbligatorio e due modi:
  - `context_load`: esegue `context.mjs --target <path>` una sola volta nella sessione e stampa versione, target e contesto risolto;
  - `bridge_preflight`: non esegue `context.mjs`; verifica bridge e canonici, stampa gli hash SHA-256 e si ripete dopo ogni aggiornamento dei bridge.

Esempi PowerShell dalla root workflow:

```powershell
# Design: caricamento unico della sessione, DESIGN.md non ancora richiesto.
.\04_TOOLS\run-impeccable-context.ps1 -WorkingDirectory .\projects\<cliente> -Target 05_SITE\index.html

# Build: nuova sessione, bridge design richiesto.
.\04_TOOLS\run-impeccable-context.ps1 -WorkingDirectory .\projects\<cliente> -Target 05_SITE\index.html -RequireDesign

# Dopo una modifica a PRODUCT.md o DESIGN.md, senza rilanciare context.mjs.
.\04_TOOLS\run-impeccable-context.ps1 -WorkingDirectory .\projects\<cliente> -Target 05_SITE\index.html -Mode bridge_preflight -RequireDesign

# QA fresco: prima context_load, poi bridge_preflight, entrambi con -RequireDesign.
.\04_TOOLS\run-impeccable-context.ps1 -WorkingDirectory .\projects\<cliente> -Target 05_SITE\index.html -RequireDesign
.\04_TOOLS\run-impeccable-context.ps1 -WorkingDirectory .\projects\<cliente> -Target 05_SITE\index.html -Mode bridge_preflight -RequireDesign
```

Il wrapper rifiuta root workflow, `projects/` senza slug, target assoluti, traversal con `..` e target fuori dal cliente. Il target puo non esistere ancora durante la fase design, ma deve restare un path concreto dentro la root cliente.

- `design-qa-fast-lane/`: prototipo/verifier locale della Fast Lane. Usa fixture sintetiche isolate e puo produrre output machine-readable per capability preflight, signature e benchmark. Non deve leggere o copiare artifact cliente in `projects/`; su progetti reali gli output utili vanno citati nei canonici e nel run log del cliente. Profili browser e cache come `output/chrome-profile-*` sono scratch runtime, non evidenze persistenti.
