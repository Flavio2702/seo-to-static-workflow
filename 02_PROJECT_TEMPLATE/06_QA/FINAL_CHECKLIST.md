# Final checklist

## Validita

- Ciclo QA: `QA-NNN`
- Checkpoint `handoff_qa`:
- Checkpoint `sessione` di ripresa QA:
- Stato checklist: `non corrente` / `corrente`
- Sostituisce ciclo QA:

Una riapertura successiva a Gate 5 imposta questa checklist a `non corrente`; il ciclo precedente non puo essere riusato per la nuova consegna.

## Strategia

- [ ] `01_INPUT/PRODUCT.md` completo o lacune dichiarate.
- [ ] `03_SEO_GEO/SITE_STRATEGY.md` completo.
- [ ] Bridge locali `PRODUCT.md` e `DESIGN.md` presenti nella root cliente.
- [ ] Pages Not To Create presente.
- [ ] `07_SEO_QA_GATE.md` ok per design.
- [ ] Ogni pagina ha intento, fonte dati, CTA e linking interno.
- [ ] Nessuna pagina servizio-area/citta/quartiere e stata creata senza approvazione strategica.

## Design

- [ ] `04_DESIGN/DESIGN.md` presente.
- [ ] Bridge locale `DESIGN.md` coerente con `04_DESIGN/DESIGN.md`.
- [ ] Design coerente con sitemap e CTA.
- [ ] Reference estetiche usate senza alterare strategia.
- [ ] Informazioni locali critiche restano visibili in HTML, non solo in immagini o slider.
- [ ] `MOCK_IMPLEMENTATION_SPEC.md` compilato (sempre; se il mock manca serve deviazione `mock assente` approvata e tracciata in `DECISION_LOG.md`).
- [ ] Build checklist di `MOCK_IMPLEMENTATION_SPEC.md` chiusa integralmente prima di `handoff_qa`, con stato, data e checkpoint; ogni `n/a` ha motivo e riferimento.
- [ ] Se Fast Lane usata: Design Delta, layout family, rappresentante, route `direct_only`, signature, home lock, assessment ledger e fallback Classic sono compilati nei canonici.
- [ ] Deviazioni dal mock registrate e motivate.

## Sito statico

- [ ] Pagine previste create.
- [ ] HTML semantico.
- [ ] Un H1 per pagina.
- [ ] Title/meta coerenti.
- [ ] Link reali.
- [ ] CSS organizzato.
- [ ] JavaScript vanilla minimo.
- [ ] Asset organizzati.
- [ ] Dominio reale confermato; senza conferma la lacuna e in `MISSING_INFO.md` e la consegna reale e bloccata (run di test: lacuna dichiarata, consegna marcata di test).
- [ ] `sitemap.xml`: con dominio confermato contiene gli URL assoluti reali delle pagine approvate; senza dominio resta placeholder commentato.
- [ ] `robots.txt`: riga `Sitemap:` presente solo con dominio confermato e reale.
- [ ] Redirect map: se esiste un sito precedente, `03_SEO_GEO/REDIRECT_MAP.md` esiste ed e completo; se e confermato che non esiste (tracciato in `CLIENT_BRIEF.md`), l'artifact non e richiesto; se non e noto, lacuna in `MISSING_INFO.md` e consegna reale bloccata (passa solo una run dichiarata di test, marcata `di test, non pubblicabile`).
- [ ] Schema coerente se presente.
- [ ] Schema usa solo dati visibili e verificati.
- [ ] FAQ, breadcrumb e related links presenti solo se approvati dalla strategia.
- [ ] Nessun link rotto.
- [ ] Nessuna pagina orfana.
- [ ] Render headless full-page (desktop e mobile) verificato: nessuna sezione vuota, nessun
  contenuto critico nascosto da animazioni reveal o stati JS.
- [ ] NAP, orari, area servita e CTA sono visibili.
- [ ] Nessun dato locale, recensione, rating o certificazione inventata.
- [ ] Nessuna meta-copy, nota interna, etichetta dello spec, testo "da confermare" o istruzione di layout/tono e visibile nel sito.
- [ ] Contrasto misurato almeno 4.5:1 per testo normale e 3:1 per testo grande e componenti essenziali; spot-check documentati su hero/collage, CTA e relativi stati, sezioni scure, footer e testo muted.

## QA

- [ ] `QA_REPORT.md` compilato.
- [ ] Confronto mock/render eseguito con screenshot desktop e mobile in `06_QA/evidence/` oppure, con deviazione `mock assente` approvata, confronto con `04_DESIGN/DESIGN.md` e `MOCK_IMPLEMENTATION_SPEC.md`.
- [ ] Evidenze render desktop e mobile fresche generate dalla sessione QA in `06_QA/evidence/` per ogni pagina consegnata; le ereditate dalla build solo come supporto diagnostico.
- [ ] Nessuna evidenza orfana resta in `06_QA/evidence/`; ogni anomalia e stata registrata prima della rimozione, il ciclo e stato ripetuto con prove valide e il blocco e stato chiuso senza checkpoint retroattivi.
- [ ] Checkpoint `render_preflight` QA registrato prima degli screenshot del ciclo: interprete, browser, modalita, working directory, escalation, porta, route/firme, fase e `<run-ts>` corrispondono alle evidenze.
- [ ] Per tool call isolate e stato usato `ciclo_atomico` (server, firme, checkpoint via `apply_patch`, browser, screenshot e cleanup nella stessa esecuzione orchestrata); `shell_persistente` e usato solo con persistenza reale dimostrata.
- [ ] Ogni acquisizione parte da reload/navigazione della route esatta, firma verificata e scroll `0,0`; i full-page desktop/mobile includono footer e ultima sezione.
- [ ] Eventuali finding sticky osservati nel full-page sono confermati da viewport o geometria browser; un artefatto del solo stitching non e classificato come difetto.
- [ ] Checkpoint `critique` presente nel run log per ogni route consegnata, incluse le route che in build erano in `family_coverage`: eseguita in sessione QA fresca oppure saltata con motivo e decisione separata `critique QA saltato e score QA assente` approvata dall'utente.
- [ ] Checkpoint `score` di build presente nel run log per ogni pagina consegnata valutata direttamente (route `direct`, rappresentante di layout family, `direct_only`, Classic Lane, fallback), con score netto sopra soglia oppure deviazione build `score sotto soglia` approvata in `DECISION_LOG.md`. Le route in `family_coverage` non richiedono score build e non devono averne uno: se compare, e uno score ereditato dal rappresentante e va aperto un finding. Perimetro in `00_SYSTEM/GATING_RULES.md`, Gate 5.
- [ ] Score QA presente e confermato dalla tabella Critique score di `QA_REPORT.md` per ogni route consegnata, `family_coverage` incluse: la copertura familiare vale solo per la build. Uno score QA sotto soglia richiede la nuova decisione `score QA sotto soglia` riferita a score e checkpoint correnti, mentre uno score QA assente richiede la decisione separata prevista sopra.
- [ ] Se Fast Lane usata: checkpoint `home_lock` e `family_assessment` presenti; batch/signature QA fresco rieseguito su tutte le URL; ogni `family_coverage` ha `coverage_status: verified`, `coverage_ref` fresco e `visual_score: n.a.`.
- [ ] Nessuna route resta con `coverage_status: failed`, `promotion_required` non risolto o `blocked_pending_classic` aperto.
- [ ] Catena run log verificata prima di `handoff_qa` per ogni pagina valutata direttamente: `shape` riuscito prima del mock, `craft` riuscito, `polish` e `adapt` distinti (oppure `saltato` con motivo), critique realmente eseguito e checkpoint `score` collegato al critique per la stessa pagina. Per le route `family_coverage` sono richiesti invece il batch `family_assessment` e il checkpoint `adapt`.
- [ ] Nessuno score e stato ricostruito retroattivamente; punteggi fotocopia tra pagine o tra build e QA sono giustificati puntualmente oppure rifiutati e rivalutati.
- [ ] Ogni esclusione detector `falso positivo strumentale` cita prova tecnica puntuale nei file e rispetta il tetto di esclusioni del playbook.
- [ ] Detector QA fresco verificato per ogni pagina: output conservato nel checkpoint `impeccable` del critique e risultato pulito oppure con soli finding esclusi secondo il playbook; lo skip e coperto solo dalla decisione separata prevista sopra.
- [ ] Nessun fix applicato al sito nella sessione QA: eventuali fix sono passati da ritorno in fase build e nuovo checkpoint `handoff_qa`.
- [ ] Evidenze QA da conservare salvate in `06_QA/evidence/`.
- [ ] Profili browser, cache e log render restano fuori dal progetto cliente; in `06_QA/evidence/` ci sono solo evidenze da conservare e citate nel report.
- [ ] Criticita risolte o accettate.
- [ ] Ogni finding ha evidenza, impatto, next action e criterio accettazione.
- [ ] Decisioni accettate o rischi residui registrati in `DECISION_LOG.md`.
- [ ] Nessun dato sensibile nel template.
- [ ] Stato finale pronto per consegna.
- [ ] Ciclo QA, handoff e ripresa coincidono fra checklist, QA report, status e run log; QA report e checklist risultano entrambi `corrente`.
- [ ] Preview di consegna fornita via server HTTP con comando dalla root cliente e URL iniziale completo `http://localhost:<porta>/`; nessun uso di `file://`.
