# Prompt Impeccable Livello 2

Implementa il Livello 2 di allineamento a Impeccable `4.0.2` in questo repository workflow documentale multi-cliente.

## Orientamento obbligatorio

1. Leggi `AGENTS.md`, `docs/LIMITI.md`, `00_SYSTEM/IMPECCABLE_PLAYBOOK.md`, `00_SYSTEM/GATING_RULES.md`, `00_SYSTEM/ARTIFACT_CONTRACTS.md`, `00_SYSTEM/WORKFLOW_STATUS_RULES.md` e il diff corrente prima di modificare file.
2. Usa la skill Impeccable `4.0.2` e leggi integralmente i riferimenti upstream pertinenti a `new-work`, `shape`, `craft`, `hooks`, `critique` e `init`.
3. Preserva tutte le modifiche non committate che non appartengono al task.
4. Non leggere, copiare o modificare artifact sotto `projects/`, salvo il solo progetto test non produttivo esplicitamente autorizzato dall'utente per il pilot hook.
5. Non modificare il documento architetturale Word senza una decisione separata dell'utente.

## Obiettivo

Integrare il valore progettuale di `new-work` dentro la fase design locale senza consentire al flusso upstream di attraversare implicitamente Gate 3, Gate 4, build, `handoff_qa` o QA finale.

## Modifiche richieste

- Inserisci la parte design di `new-work` esclusivamente dentro Gate 3, dopo `shape` e prima dell'approvazione del mock finale.
- Mappa negli artifact canonici esistenti, senza crearne di nuovi:
  - modalita della superficie (`Persuade`, `Operate`, `Read` o `Experience`);
  - seed/key riproducibile;
  - direzione scelta e challenger realmente presentati;
  - rischio dichiarato;
  - contract di direzione con thesis, own-world, story, first viewport e form.
- Definisci con precisione quale sezione di `04_DESIGN/DESIGN.md` e `04_DESIGN/MOCK_IMPLEMENTATION_SPEC.md` riceve ogni campo. I bridge root restano derivati.
- Non inserire contract, seed, note di processo o istruzioni interne nei commenti dell'HTML consegnato.
- Mantieni una sola approvazione utente bloccante: il candidato mock finale identificato da ID. Le scelte e iterazioni intermedie restano tracciate ma non diventano nuovi gate.
- Mantieni `craft` come checkpoint locale compatibile e registra nel suo dettaglio `upstream_flow: new-work`.
- Non cambiare la catena `shape -> craft -> polish/adapt per pagina -> critique reale -> score -> handoff_qa`.
- Non cambiare detector esplicito, soglie score, massimo iterazioni, deviazioni, reset, handoff o QA fresco senza fix.

## Pilot hook advisory

- Progetta gli hook solo come advisory non canonico durante la build, dopo Gate 4.
- Non attivare hook nella root workflow, in design, durante handoff o nel QA finale.
- Non usare hook come pre-check, gate, detector completo, score o prova di consegna.
- Non consentire correzioni automatiche o ignore impliciti. Ogni ignore richiede decisione utente registrata e scope minimo.
- Non attivare alcun hook finche l'utente non fornisce uno slug test non produttivo dedicato. Se manca, implementa solo policy, contratto del pilot e criteri di stop, poi registra il pilot come pendente.
- Quando viene fornito lo slug, lavora solo da cwd `projects/<cliente-test>/`, registra on/off, versione, target, config, finding e confronto con il detector esplicito. Qualunque scrittura fuori cliente, finding senza rule/file o Stop non osservabile interrompe il pilot e ripristina `hook vietati`.

## Output e documentazione

- Aggiorna solo i file di sistema e template necessari; evita duplicazioni e nuovi livelli di governance.
- Mantieni italiano asciutto, solo ASCII, path tra backtick.
- Aggiorna `docs/LIMITI.md` e registra decisioni, assunzioni, rischi, stato del pilot e prossima azione.
- Non modificare run log o status di clienti non coinvolti.
- Non eseguire commit.

## Verifiche minime

- Ricerca globale di contraddizioni fra `new-work`, `craft`, Gate 3, Gate 4 e QA.
- Conferma che nessun artifact canonico nuovo sia stato introdotto.
- Conferma che una sola approvazione mock resti bloccante.
- Conferma che `upstream_flow: new-work` sia previsto nel checkpoint `craft`.
- Conferma che hook e detector esplicito abbiano ruoli separati.
- Conferma che nessun file sotto `projects/` sia cambiato senza slug test autorizzato.
- Controllo ASCII e `git diff --check`.
- Review finale del diff con elenco di gate e comportamenti rimasti invariati.
