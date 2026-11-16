# Design/QA Fast Lane Kernel

## Funzione

Kernel tecnico riusabile per la Fast Lane design/QA. Definisce fondamenta statiche comuni e verificabili, senza assegnare estetica cliente. Il Design Delta del singolo progetto resta in `04_DESIGN/DESIGN.md` e nasce solo dopo Gate 3.

La Fast Lane e disponibile solo con capability preflight riuscito su DOM renderizzato e con fallback Classic Lane registrato. Se il preflight non e disponibile, se una famiglia fallisce oppure se una pagina richiede valutazione diretta, il workflow torna alla Classic Lane per quella pagina o famiglia.

## Confini

Il Kernel puo definire:

- reset CSS e normalizzazione box model;
- token tecnici astratti per spaziature, radius, shadow, z-index e motion;
- griglia fluida e container responsive;
- tipografia fluida tecnica, senza scegliere font cliente;
- stati focus e target interattivi minimi;
- pattern tecnici per header/menu, CTA, FAQ, card, footer;
- regole responsive e reduced motion;
- convenzioni di naming componenti e slot per la signature.

Il Kernel non puo definire:

- mood, palette, font cliente, fotografia o mondo visuale;
- layout family definitiva di una pagina;
- contenuto, claim, NAP, recensioni o prove;
- direction contract, seed/key, challenger o note di processo;
- score visuale per pagine non valutate direttamente.

## Design Delta

Il Design Delta cliente-specifico vive nei canonici del progetto:

- `04_DESIGN/DESIGN.md`: direzione, modalita, direction contract, family candidate e delta cliente;
- `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md`: mock finale, fidelity rules, signature, home lock, assessment ledger e fallback;
- `07_HISTORY/E2E_RUN_LOG.md`: checkpoint di preflight, family assessment, score, fallback e handoff.

Il Delta decide palette, font, composizione, componenti distintivi, asset strategy, densita specifiche e soglie di famiglia. Nessun archetipo SEO/GEO o preset del Kernel puo sostituire questa decisione.

## Layout family

Una layout family raggruppa pagine che condividono lo stesso contratto semantico renderizzato:

- landmark richiesti e ordine;
- componenti obbligatori e cardinalita minima;
- slot obbligatori e densita minima per componente;
- interazioni e stati richiesti;
- invarianti desktop e mobile;
- elementi che impongono valutazione diretta.

Il rappresentante della famiglia si sceglie per rischio: home, form/interazioni, asset complessi, contenuto piu lungo, poi prima URL. Una famiglia con una sola pagina usa sempre Classic Lane diretta.

## Assessment

Campi canonici:

| Campo | Valori | Regola |
| --- | --- | --- |
| `assessment_mode` | `direct`, `family_coverage`, `classic` | `classic` solo dopo critique diretta e score reale |
| `visual_score` | numero, `n.a.` | numero solo per `direct` o `classic` |
| `coverage_status` | `verified`, `failed`, `n.a.` | `failed` non e consegnabile |
| `coverage_ref` | ID famiglia, rappresentante, batch | obbligatorio per `family_coverage` |
| `promotion_required` | si / no | blocca e richiede decisione orchestratore |
| `blocked_pending_classic` | si / no | impone Classic Lane prima della consegna |

Le pagine coperte da famiglia non ereditano score dal rappresentante. Ricevono solo `coverage_status: verified` con `coverage_ref` al batch fresco.

## Home lock

Dopo `craft home`, prima di espandere il sito, registrare `home_lock` con hash o identificatori conservativi di:

- CSS globale;
- JavaScript condiviso;
- header;
- footer;
- componenti e asset portanti della home.

Modifiche successive a questi elementi invalidano il lock e richiedono confronto mirato. Non serve una seconda approvazione utente: il lock e un checkpoint tecnico.

## Fallback

Classic Lane e obbligatoria quando:

- capability preflight Fast Lane fallisce;
- route o famiglia produce `coverage_status: failed`;
- esito `promotion_required` non viene risolto come nuova famiglia intenzionale;
- pagina e `direct_only`, famiglia singola, form critico o layout divergente;
- batch non e deterministico;
- QA fresco non conferma la copertura.

Il fallback va registrato con route, famiglia candidata, batch, motivo, azione successiva e checkpoint.

## Evidenze

Gli output machine-readable del verifier sono evidenze tecniche solo se citati nei canonici del progetto e collegati al run log. Profili browser, cache e cartelle tipo `output/chrome-profile-*` sono scratch runtime: non contano come evidenze persistenti e non vanno copiati in `06_QA/evidence/`.
