# External repository patterns

Le repository analizzate sono reference metodologiche. Non devono essere clonate, copiate o trasformate in dipendenze centrali nella v1.

## Regola di integrazione

- Usare pattern, non sistemi esterni completi.
- Non copiare prompt, playbook o skill interi se includono provider, comandi, tool, blog automation o generazione massiva non adatti al workflow.
- Se in futuro si copia testo esterno verbatim, indicare fonte, licenza e motivo nel file che lo contiene.
- Ogni pattern adottato deve rafforzare un artifact esistente: brief, context, step SEO/GEO, design handoff, sito statico o QA.

## Matrice di adozione

| Repository | Pattern preso | Perche serve | Implementazione attuale | Gap rilevato | Miglioramento previsto | Escluso |
| --- | --- | --- | --- | --- | --- | --- |
| ai-website-system | Pipeline sequenziale, agenti con responsabilita distinte, output validati, separazione strategia/copy/schema/rendering | Evita generazione monolitica e mantiene ogni passaggio controllabile | `00_SYSTEM/LOGICAL_COMPONENTS.md`, 7 step in `03_SEO_GEO/` con sezioni Metodo ed euristiche adattate dai prompt MIT, orchestratore istanziato in `CLAUDE.md`, gate tra fasi | Nessuno rilevante dopo integrazione Metodo/euristiche | Nessuno pianificato nella v1 | CLI, provider AI, renderer/codice, city-page automation |
| seomachine | Context cliente persistente: brand voice, keyword, link interni, competitor notes, linee guida SEO | Mantiene coerenza tra strategia, design e copy | `02_CONTEXT/` con file dedicati, tabella terminologia in `BRAND_VOICE.md`, regole di linking in `INTERNAL_LINKS_MAP.md` | I file context vanno mantenuti aggiornati nel tempo, non riscritti da zero | Nessuno pianificato nella v1 | Blog automation, WordPress, densita keyword come metrica centrale |
| localseoskills | Brief persistenti, memoria cliente/location, storico decisionale, distinzione tra stato, audit, report e alert | Permette di capire perche una decisione e stata presa e cosa resta da verificare | `01_INPUT/`, `02_CONTEXT/`, `07_HISTORY/`, `WORKFLOW_STATUS.md` con gate numerati, test doorway in 4 domande in `01_KNOWLEDGE_BASE/SITE_STRATEGY_RULES.md` richiamato dagli step 03 e 07 | Memoria multi-location non ancora esercitata: la v1 punta a sede singola | Nessuno pianificato nella v1 | Geogrid, monitoring, review management, tool esterni, task schedulati |
| claude-seo | QA modulare, raccomandazioni prioritarie, evidenza, dipendenze, falsificabilita | Trasforma il QA da checklist a piano di correzione verificabile | `06_QA/QA_REPORT.md` con indicatore di fallimento e next action, `FINAL_CHECKLIST.md`, `QA_FIX_LOG.md`, euristiche di citabilita in `01_KNOWLEDGE_BASE/GEO_AI_SEARCH_RULES.md`, guardrail schema deprecati in `01_KNOWLEDGE_BASE/TECHNICAL_SEO_QA.md` | QA resta manuale e senza punteggio aggregato: scelta deliberata | Nessuno pianificato nella v1 | Audit suite estesa, sub-agenti, report PDF, API Google/DataForSEO, punteggio pesato 0-100 |
| local-business-builder | Static-first, dati separati dai template, schema, FAQ, related links, verifica build/link | Utile per siti statici locali quando servizi/aree sono reali | `05_SITE/` con regole static-first e limiti documentati nel README, `localbusiness.schema.json` esteso ai campi opzionali, sitemap/robots, step sitemap | Verifica build/link resta manuale finche `04_TOOLS/` e vuoto: scelta deliberata | Nessuno pianificato nella v1 | Astro, TypeScript, Cloudflare, formula servizio x area, pagine massive |

## Policy prompt e riuso

- `CLAUDE.md`, `SKILL.md` e `prompts.py` esterni sono reference architetturali, non prompt da incollare.
- Pattern riusabili in forma adattata: non inventare dettagli business; ogni step ha input-output validato; schema solo con dati visibili/verificati; finding QA con evidenza, impatto, correzione e indicatore di fallimento.
- Pattern non riusabili nella v1: comandi CLI esterni, installazione dipendenze, API a pagamento, automazioni blog, city-page generation e service-area massivo.
- Frammenti adattati e tradotti (non verbatim) da repository MIT sono tracciati in questa matrice e nelle sezioni Fonti dei file knowledge base che li contengono.

## ai-website-system

- Reference: https://github.com/zainsaeeed/ai-website-system
- Cosa prendiamo: pipeline multi-agent sequenziale, responsabilita separate, output validati, idea di renderer statico.
- Perche: riduce il rischio di una generazione monolitica difficile da controllare.
- Dove entra: `00_SYSTEM/LOGICAL_COMPONENTS.md` e `02_PROJECT_TEMPLATE/03_SEO_GEO/`.
- Output influenzato: file intermedi dei 7 step e `SITE_STRATEGY.md`.
- Miglioramento locale: ogni step deve dichiarare input, output, controlli minimi, blocchi e decisioni prese prima di alimentare lo step successivo.
- Cosa non copiare: sequenza agenti esatta, vincoli su provider AI, codice renderer o dipendenze specifiche.
- Rischio se usata male: saltare la nostra strategia e generare direttamente pagine finali non controllate.

## seomachine

- Reference: https://github.com/TheCraigHewitt/seomachine
- Cosa prendiamo: cartella context con brand voice, style guide, keywords, internal links, competitor notes.
- Perche: mantiene memoria cliente persistente e riutilizzabile.
- Dove entra: `02_PROJECT_TEMPLATE/02_CONTEXT/`.
- Output influenzato: `PRODUCT.md`, `SITE_STRATEGY.md`, copy, QA.
- Miglioramento locale: separare meglio messaggi di brand, esempi, keyword cluster, link interni e claim verificabili.
- Cosa non copiare: automazione blog, densita keyword come metrica centrale, struttura content-heavy non adatta a siti vetrina.
- Rischio se usata male: trasformare il workflow in generatore di articoli invece che in sistema per siti locali semplici.

## localseoskills

- Reference: https://github.com/garrettjsmith/localseoskills
- Cosa prendiamo: brief persistenti, memoria cliente/location, storico decisionale, tassonomia local SEO.
- Perche: un progetto locale deve conservare il perche delle decisioni.
- Dove entra: `02_PROJECT_TEMPLATE/01_INPUT/`, `02_PROJECT_TEMPLATE/02_CONTEXT/`, `02_PROJECT_TEMPLATE/07_HISTORY/`.
- Output influenzato: `WORKFLOW_STATUS.md`, `DECISION_LOG.md`, `LOCAL_CONTEXT.md`, QA.
- Miglioramento locale: decisioni, assunzioni e dati locali da verificare devono avere fonte, owner, stato e impatto.
- Cosa non copiare: monitoraggi, geogrid, review management, integrazioni esterne e task schedulati.
- Rischio se usata male: aumentare complessita prima di avere un flusso base funzionante.

## claude-seo

- Reference: https://github.com/AgriciDaniel/claude-seo
- Cosa prendiamo: QA modulare, priorita, evidenza, impatto, falsificabilita, indicatori di fallimento.
- Perche: il QA deve essere azionabile, non una checklist generica.
- Dove entra: `02_PROJECT_TEMPLATE/06_QA/`.
- Output influenzato: `QA_REPORT.md`, `FINAL_CHECKLIST.md`, `QA_FIX_LOG.md`.
- Miglioramento locale: ogni finding deve indicare priorita, dipendenza, next action, criterio di accettazione e indicatore di fallimento.
- Cosa non copiare: usarlo come generatore principale della strategia o importare un sistema SEO piu grande del necessario.
- Rischio se usata male: produrre audit ampi ma scollegati dal sito e dalla strategia reali.

## local-business-builder

- Reference: https://github.com/savvity/local-business-builder
- Licenza: nessun file di licenza nel repository (verificato 2026-07-07). Solo pattern standard ri-derivati, nessuna ripresa testuale.
- Cosa prendiamo: static-first, dati separati dai template, schema, FAQ, related links, verifica build/link.
- Perche: questi pattern aiutano quando il cliente ha servizi e aree reali.
- Dove entra: `03_SEO_GEO/03_SITEMAP_DECISION_ENGINE.md`, `05_SITE/`, `06_QA/`.
- Output influenzato: sitemap, page blueprint, related links, schema LocalBusiness.
- Miglioramento locale: separare dati verificati, schema e componenti SEO opzionali senza generare pagine servizio-area in automatico.
- Cosa non copiare: moltiplicazione meccanica servizio x area, pagine quartiere/citta duplicate.
- Rischio se usata male: doorway pages, thin content e perdita di fiducia.
