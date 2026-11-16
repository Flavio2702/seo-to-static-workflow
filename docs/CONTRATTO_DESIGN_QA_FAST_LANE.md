# Contratto Design/QA Fast Lane

## Funzione

Definire il contratto minimo dello spike Fast Lane prima di implementare qualunque verifier. Il contratto e isolato: non modifica gate, template, playbook, istruzioni agent, DOCX o progetti cliente.

## Stato

- Sprint: `Design/QA Fast Lane`.
- Fase: `1A`.
- Stato contratto: `draft_reviewabile`.
- Workflow attivo: Classic Lane corrente, invariata.
- Implementazione verifier: non iniziata.
- Fixture: solo sintetiche, da implementare in `04_TOOLS/design-qa-fast-lane/` dalla Fase 1B se autorizzata.

## Principi

- La signature valida copertura di famiglia, non qualita estetica completa.
- Il rappresentante di famiglia riceve sempre valutazione diretta e score reale.
- Le pagine non rappresentanti non ereditano score: ricevono solo copertura verificata.
- Un mismatch non crea una nuova famiglia in automatico.
- Qualunque esito non verificabile torna alla Classic Lane registrata.
- Il QA fresco riesegue batch e signature su tutte le URL.

## Schema input batch

```json
{
  "schema_version": "dqf-signature-0.1",
  "site_root": "path-assoluto-o-relativo-fixture",
  "phase": "build",
  "run_id": "DQF-YYYYMMDD-NNN",
  "viewports": [
    { "id": "desktop", "width": 1440, "height": 900 },
    { "id": "mobile", "width": 390, "height": 844 }
  ],
  "families": [],
  "routes": []
}
```

### Regole input

| Campo | Tipo | Obbligatorio | Regola |
| --- | --- | --- | --- |
| `schema_version` | string | si | valore iniziale `dqf-signature-0.1` |
| `site_root` | path | si | deve puntare a fixture sintetica, mai a `projects/` |
| `phase` | enum | si | `build` oppure `qa` |
| `run_id` | string | si | stabile nel batch, unico nel report |
| `viewports` | array | si | almeno desktop 1440x900 e mobile 390x844 |
| `families` | array | si | almeno una famiglia con rappresentante |
| `routes` | array | si | ogni route candidata cita una famiglia esistente |

## Contratto famiglia

```json
{
  "family_id": "LF-SERVICE-001",
  "label": "Pagina servizio sintetica",
  "representative": "/servizi/intervento-prioritario/",
  "direct_required": true,
  "landmarks": [
    { "name": "header", "required": true, "order": 1 },
    { "name": "main", "required": true, "order": 2 },
    { "name": "footer", "required": true, "order": 3 }
  ],
  "components": [
    { "id": "hero", "required": true, "min_count": 1 },
    { "id": "proof_grid", "required": true, "min_count": 1 },
    { "id": "cta_band", "required": true, "min_count": 1 },
    { "id": "faq", "required": false, "min_count": 0 }
  ],
  "slots": [
    { "component": "hero", "slot": "headline", "required": true, "min_chars": 24 },
    { "component": "hero", "slot": "media", "required": true, "min_items": 1 },
    { "component": "proof_grid", "slot": "items", "required": true, "min_items": 3 },
    { "component": "cta_band", "slot": "primary_action", "required": true, "min_chars": 8 }
  ],
  "interactions": [
    { "id": "nav_toggle", "viewport": "mobile", "required": true },
    { "id": "primary_cta_focus", "viewport": "all", "required": true }
  ],
  "viewport_rules": {
    "desktop": ["hero_media_visible", "no_horizontal_overflow"],
    "mobile": ["h1_wraps_without_overlap", "nav_toggle_operable", "no_horizontal_overflow"]
  },
  "promotion_triggers": [
    "component_missing",
    "landmark_order_changed",
    "interaction_contract_changed",
    "viewport_rule_changed",
    "direct_required_element_changed"
  ]
}
```

### Regole famiglia

| Campo | Regola |
| --- | --- |
| `family_id` | ID stabile, univoco nel batch |
| `representative` | route presente in `routes`; valutazione diretta obbligatoria |
| `landmarks` | presenza e ordine sono vincolanti |
| `components` | ogni componente richiesto deve rispettare `min_count` |
| `slots` | densita specifica per componente; nessun conteggio globale di parole |
| `interactions` | verifica di presenza e stato minimo, senza inferire qualita estetica |
| `viewport_rules` | invarianti minimi per desktop e mobile |
| `promotion_triggers` | mismatch che impediscono copertura automatica e richiedono decisione |

## Contratto route

```json
{
  "url": "/servizi/intervento-secondario/",
  "family_id": "LF-SERVICE-001",
  "candidate_role": "member",
  "expected_signature": {
    "landmarks": ["header", "main", "footer"],
    "components": ["hero", "proof_grid", "cta_band"],
    "optional_components": ["faq"],
    "required_slots": ["hero.headline", "hero.media", "proof_grid.items", "cta_band.primary_action"]
  },
  "direct_reasons": []
}
```

### Ruoli route

| Valore | Significato |
| --- | --- |
| `representative` | pagina valutata direttamente per la famiglia |
| `member` | pagina candidata alla copertura familiare |
| `direct_only` | pagina esclusa dal campionamento per rischio specifico |

`direct_only` si usa per home, form critici, composizioni asset complesse, interazioni divergenti o contenuto che non condivide davvero il contratto semantico.

## Output verifier

```json
{
  "schema_version": "dqf-result-0.1",
  "run_id": "DQF-YYYYMMDD-NNN",
  "phase": "build",
  "tooling": {
    "status": "available",
    "details": []
  },
  "routes": [
    {
      "url": "/servizi/intervento-secondario/",
      "family_id": "LF-SERVICE-001",
      "assessment_mode": "family_coverage",
      "visual_score": "n.a.",
      "coverage_status": "verified",
      "coverage_ref": "LF-SERVICE-001:/servizi/intervento-prioritario/:DQF-YYYYMMDD-NNN",
      "route_status": "pass",
      "promotion_required": false,
      "findings": []
    }
  ],
  "summary": {
    "pass": 0,
    "blocked_pending_classic": 0,
    "promotion_required": 0,
    "tooling_unavailable": 0
  }
}
```

### Campi output

| Campo | Valori | Regola |
| --- | --- | --- |
| `assessment_mode` | `direct`, `family_coverage`, `classic` | `classic` solo dopo valutazione diretta Classic Lane completata |
| `visual_score` | numero, `n.a.` | numero solo per `direct` o `classic` con score reale |
| `coverage_status` | `verified`, `failed`, `n.a.` | `verified` solo con signature completa e batch valido |
| `coverage_ref` | string, `n.a.` | famiglia, rappresentante e `run_id`; obbligatorio per `family_coverage` |
| `route_status` | `pass`, `blocked_pending_classic`, `promotion_required`, `tooling_unavailable` | stato operativo della route |
| `promotion_required` | boolean | `true` se il mismatch richiede decisione orchestratore |
| `findings` | array | ogni finding cita regola, route, viewport e prova minima |

## Stati

| Stato | Quando si usa | Azione successiva |
| --- | --- | --- |
| `pass` | route diretta con score valido oppure copertura familiare verificata | procedere nel batch |
| `promotion_required` | mismatch strutturale o trigger intenzionale possibile | decisione orchestratore: correggere, nuova famiglia o Classic Lane |
| `blocked_pending_classic` | copertura fallita senza promozione valida | eseguire Classic Lane diretta prima di consegna |
| `tooling_unavailable` | preflight o verifier non disponibili | fallback Classic Lane registrato |

`coverage_status: failed` non e stato consegnabile. Produce `blocked_pending_classic` salvo mismatch classificato come `promotion_required`.

## Exit code

| Code | Nome | Significato | Effetto ammesso |
| ---: | --- | --- | --- |
| 0 | `all_verified` | tutte le route passano secondo il contratto | continuare lo spike |
| 1 | `coverage_failed` | una o piu route richiedono Classic Lane | blocco pagina/famiglia, nessuna auto-promozione |
| 2 | `promotion_required` | almeno una route richiede decisione orchestratore | stop decisionale, nessuna modifica automatica |
| 3 | `tooling_unavailable` | capability preflight o runtime non disponibile | fallback Classic Lane |
| 4 | `invalid_input` | schema, path o fixture non validi | correggere input, non misurare benchmark |
| 5 | `nondeterministic` | output non stabile fra run identiche | bloccare spike |

Precedenza exit code: `invalid_input` > `tooling_unavailable` > `nondeterministic` > `promotion_required` > `coverage_failed` > `all_verified`.

## Capability preflight

Il preflight della Fase 1B deve osservare strumenti reali, versioni e permessi prima di qualunque copertura familiare.

| Capacita | Requisito minimo | Fallimento |
| --- | --- | --- |
| Server HTTP locale | servire fixture sintetica senza `file://` | `tooling_unavailable` |
| Browser disponibile | eseguire desktop e mobile | `tooling_unavailable` |
| DOM renderizzato | interrogare landmark, componenti, slot e stato interazioni | `tooling_unavailable` |
| Viewport | applicare almeno 1440x900 e 390x844 | `tooling_unavailable` |
| Detector Impeccable | risolvere path/versione se richiesto dal benchmark | fallback Classic Lane |
| Output machine-readable | scrivere JSON deterministico in area fixture | `tooling_unavailable` |
| Determinismo | tre run identiche su input identico | `nondeterministic` |

Il preflight non modifica pagine, classificazioni o file di workflow. Se fallisce, la Fast Lane non e disponibile.

## Fallback Classic Lane

Il fallback si applica quando:

- il preflight fallisce;
- una route produce `blocked_pending_classic`;
- l'orchestratore decide Classic Lane dopo `promotion_required`;
- il batch non e deterministico;
- la fixture o l'input sono invalidi e il benchmark non puo essere misurato.

Il fallback deve essere registrato con motivo, route coinvolta, famiglia candidata, `run_id`, exit code e azione successiva. Nessun fallback puo assegnare `classic` senza critique diretta e score reale.

## Home lock

La Fase 1A definisce solo il contratto, non lo implementa.

| Campo | Regola |
| --- | --- |
| `home_lock_id` | ID del confronto home in build |
| `locked_assets` | hash di CSS globale, JS condiviso, header, footer, componenti e asset portanti |
| `invalidators` | modifica a CSS/JS condivisi, header, footer, hero, CTA, asset portanti |
| `effect` | confronto mirato prima di espandere o consegnare, non nuova approvazione utente |

## Fixture sintetiche

Le fixture non usano dati, HTML o asset cliente. Sono pagine statiche minime con contenuto inventato e semantico.

| ID | Tipo | Caso | Esito atteso | Regole esercitate |
| --- | --- | --- | --- | --- |
| FX-001 | positiva | famiglia valida con cinque pagine servizio | `pass`, `coverage_status: verified` | baseline positiva |
| FX-002 | negativa | componente portante `hero.media` rimosso | `promotion_required` | componente portante |
| FX-003 | negativa | slot `cta_band.primary_action` vuoto | `blocked_pending_classic` | slot obbligatorio |
| FX-004 | negativa | `proof_grid.items` con due item invece di tre | `blocked_pending_classic` | densita sotto soglia |
| FX-005 | negativa | ordine `footer` prima di `main` | `blocked_pending_classic` | landmark e ordine |
| FX-006 | negativa | H1 molto lungo che genera overflow mobile | `blocked_pending_classic` | viewport mobile |
| FX-007 | negativa | form presente ma stato focus/errore diverso | `promotion_required` | interazione divergente |
| FX-008 | negativa | breakpoint mobile cambia contratto navigazione | `promotion_required` | viewport divergente |
| FX-009 | positiva | copy diverso ma stessi componenti e densita | `pass` | tolleranza editoriale |
| FX-010 | positiva | densita valida al limite minimo | `pass` | calibrazione soglia |
| FX-011 | negativa | route candidata punta a famiglia inesistente | `invalid_input` | schema input |
| FX-012 | negativa | route `direct_only` proposta come `member` | `promotion_required` | rischio diretto |

### Struttura proposta fixture

```text
04_TOOLS/design-qa-fast-lane/
  fixtures/
    synthetic-site/
      index.html
      servizi/
        intervento-prioritario/index.html
        intervento-secondario/index.html
        intervento-editoriale/index.html
        intervento-densita-limite/index.html
        regressioni/
          hero-media-rimosso/index.html
          cta-vuota/index.html
          proof-grid-sotto-soglia/index.html
          landmark-fuori-ordine/index.html
          h1-overflow-mobile/index.html
          form-divergente/index.html
          breakpoint-divergente/index.html
      assets/
        synthetic.css
        synthetic.js
      dqf-input.valid.json
      dqf-input.invalid-family.json
```

Questa struttura e pianificata, non creata in Fase 1A.

## Metriche Classic/Fast

Le misure della Fase 1C devono usare la stessa fixture, lo stesso numero di URL e la stessa condizione di partenza.

| Metrica | Classic Lane | Fast Lane | Metodo |
| --- | --- | --- | --- |
| Chiamate Impeccable | una sequenza diretta per ogni pagina misurata | rappresentanti diretti piu verifier per membri | conteggio comandi registrati |
| Checkpoint | checkpoint Classic per pagina | checkpoint rappresentante, batch signature e fallback | conteggio righe di run log sintetico |
| Evidenze persistenti | screenshot/report per pagina | evidenze rappresentante piu output batch | numero file e byte |
| Tempo operativo | wall clock Classic | wall clock Fast inclusivo del verifier | misura con timestamp inizio/fine |
| Token reali | se disponibili dall'harness | se disponibili dall'harness | riportare fonte e intervallo |
| Proxy token | caratteri/parole di prompt, output e artifact | stesso metodo | usare solo se token reali non disponibili |

Il proxy token deve essere dichiarato come proxy, non come token reali. Il costo una tantum di contratto/verifier resta separato dal costo ricorrente per run.

## Criteri Fase 1A chiusa

- Contratto input/output reviewabile.
- Stati ed exit code definiti.
- Fallback Classic Lane non ambiguo.
- Fixture positive e negative bilanciate.
- Metriche Classic/Fast e proxy token definiti.
- Nessun verifier implementato.
- Nessuna propagazione nel workflow attivo.
