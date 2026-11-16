# Local render playbook

## Funzione

Procedura canonica per il render locale del sito statico: preview, verifica visuale e produzione di screenshot. E l'unica procedura ammessa per generare evidenze render, sia in fase build (`polish`, `adapt`, chiusura build) sia in sessione QA fresca (`critique`, evidenze Gate 5). Nasce dai fallimenti osservati nella run E2E 2026-07-08: comandi browser paralleli su sessione nominata, protocollo `file://` bloccato, server HTTP morto senza verifica.

## Prerequisiti

- Sito in `projects/<cliente>/05_SITE/` con URL a cartella e trailing slash (vedi `01_KNOWLEDGE_BASE/SEO_BEST_PRACTICES.md`, sezione URL a cartella e preview locale).
- Mai protocollo `file://`: non risolve le directory con trailing slash e produce render non rappresentativi.

## Profili di esecuzione

Scegliere un solo profilo per ogni ciclo di render e registrarlo nel checkpoint `render_preflight`:

1. `shell_persistente`: ammesso solo quando server, handle/PID e sessione browser restano realmente disponibili nella stessa shell fino al cleanup. I comandi browser possono essere sequenziali in piu passaggi, ma la shell non deve essere ricreata fra un passaggio e l'altro.
2. `ciclo_atomico`: default per tool call isolate, harness effimeri o ambienti in cui non e dimostrata la persistenza della shell. Una sola esecuzione orchestrata mantiene la proprieta del ciclo e contiene preflight, avvio server, attesa, verifica status e firme, scrittura del checkpoint con `apply_patch`, apertura browser, screenshot e cleanup in un blocco `finally` o equivalente. L'esecuzione puo intercalare operazioni shell, editing e browser offerte dallo stesso harness; non puo terminare o cedere server, PID o sessione browser a una esecuzione orchestrata successiva.

La procedura resta manuale-assistita: non richiede uno script permanente nel repository. Il ciclo atomico puo essere composto nell'harness disponibile, purche tutti i passaggi, incluso `apply_patch` per il checkpoint, e il cleanup avvengano nella stessa esecuzione verificabile. Se l'harness non permette di persistere il checkpoint mentre il ciclo possiede ancora server e cleanup, `ciclo_atomico` non e disponibile: usare `shell_persistente` solo se dimostrato, altrimenti applicare la Regola di blocco.

## Preflight ambiente e checkpoint

Da eseguire all'inizio di OGNI ciclo che produce render, prima degli screenshot:

1. Interprete risolvibile e reale: `python --version` deve stampare una versione. Se il comando risolve a `...\WindowsApps\python.exe` e non stampa nulla, e lo stub Microsoft Store, non un interprete: usare `py` o il path completo dell'installazione reale.
2. Strumento browser/render disponibile: verificare che il CLI o browser previsto per gli screenshot esista e parta, prima di avviare il server.
3. Modalita: scegliere `shell_persistente` solo con persistenza dimostrata; altrimenti usare `ciclo_atomico`.
4. Working directory: deve essere la root di `projects/<cliente>/`; il server deve servire la sua `05_SITE/`.
5. Harness sandboxato: se il sandbox blocca server, listener o profilo browser, chiedere escalation UNA volta per la sessione render e registrare richiesta ed esito. Mai ripiegare su `file://` o strumenti improvvisati.
6. Porta e firme: scegliere la porta e definire prima del browser la firma attesa della home e una firma specifica per ogni route da acquisire.

Appena il server e tutte le route previste rispondono con status e firma attesi, e comunque prima del primo screenshot, aggiungere al run log un checkpoint `render_preflight` con questo dettaglio minimo:

```text
fase: build|qa; ciclo: n.a.|QA-NNN; run-ts: YYYY-MM-DD_HHMMSS; interprete: comando/path + versione; browser: strumento/path + versione o esito check; modalita: shell_persistente|ciclo_atomico; working directory: path cliente; escalation: non richiesta|richiesta e relativo esito; porta: numero; firme: route -> firma attesa e verificata
```

Il checkpoint deve indicare fase `build` o `qa`, ciclo `QA-NNN` per la fase QA, `<run-ts>` del ciclo ed esito. Se il preflight fallisce, registrare subito `render_preflight` con esito `fallito` e il campo incompleto o l'errore osservato, poi applicare la Regola di blocco. Un checkpoint ricostruito dopo gli screenshot non rende valide le evidenze.

Profili browser, cache e log degli strumenti render vanno in temp o scratch della sessione, mai dentro `projects/<cliente>/`: la cartella cliente contiene solo artifact ed evidenze del workflow. Cartelle runtime come `output/chrome-profile-*` sono scratch ignorato e non contano come evidenze persistenti, anche se prodotte da un verifier o da Playwright.

## Procedura

Tutti i path della procedura sono relativi alla root del progetto cliente: eseguire prima `cd projects/<cliente>/`. Non usare path con prefisso `projects/<cliente>/` da dentro il progetto: si duplicano e il server parte dalla cartella sbagliata.

1. Avvio server: avviare un server HTTP locale dalla cartella `05_SITE/`. Nel profilo `shell_persistente` usare un processo separato che non occupa il terminale e conservarne l'handle/PID. Attenzione: in PowerShell `python -m http.server 8080` lanciato direttamente blocca la sessione e impedisce i comandi successivi. Ricetta PowerShell persistente:

```powershell
$server = Start-Process python -ArgumentList '-m','http.server','8080','--bind','127.0.0.1' -WorkingDirectory '05_SITE' -WindowStyle Hidden -PassThru -RedirectStandardOutput $env:TEMP\render_server_out.log -RedirectStandardError $env:TEMP\render_server_err.log
if ($server.HasExited) { Get-Content $env:TEMP\render_server_err.log }
```

Il check `HasExited` subito dopo l'avvio dice se python e terminato all'istante e il log d'errore spiega perche (python assente, porta occupata). I log del server vanno in temp o scratch, mai in `06_QA/evidence/`. In shell POSIX persistente: `python -m http.server 8080 --bind 127.0.0.1 &` annotando il PID. Nel profilo `ciclo_atomico` gli stessi dati restano variabili locali dell'unica esecuzione e il cleanup va predisposto prima dei comandi browser.
2. Verifica risposta PRIMA di qualunque comando browser: eseguire una richiesta di test alla home con il comando adatto alla shell attiva, con retry (es. 3 tentativi a 2 secondi di distanza). In PowerShell: `Invoke-WebRequest -UseBasicParsing http://localhost:8080/` oppure `curl.exe -s http://localhost:8080/` (attenzione: in PowerShell `curl` senza `.exe` e un alias di `Invoke-WebRequest` e `curl -s` fallisce). In shell POSIX (bash): `curl -s http://localhost:8080/`. Lo status 200 da solo non basta: verificare anche una firma attesa della pagina nel corpo della risposta (es. il `<title>` o il nome attivita presente in `05_SITE/index.html` del cliente). Ripetere status e firma per tutte le route previste nel ciclo prima di registrare il checkpoint. Una risposta 200 senza firma indica un server o una route errati: terminare il tentativo; se riguarda la home, scegliere una porta libera alternativa (es. 8081, 8082), riavviare e ripetere la verifica. Mai lanciare comandi browser su una risposta senza firma. Se il server non risponde dopo i retry, diagnosticare invece di riprovare alla cieca: python presente nel PATH? porta gia occupata (provare una porta alternativa)? processo server terminato subito (leggere l'errore)?
3. Checkpoint: dopo la verifica della home e di tutte le route previste, prima del browser, registrare `render_preflight` come definito sopra. Nel profilo `ciclo_atomico`, eseguire `apply_patch` come operazione interna della stessa esecuzione orchestrata che possiede server e cleanup, quindi proseguire col browser senza chiudere il ciclo. Il checkpoint deve essere contemporaneo al ciclo e citare il suo `<run-ts>`; evidenze senza checkpoint precedente non valgono per chiusura build o QA.
4. Comandi browser: i comandi `playwright-cli` vanno lanciati sempre in sequenza sulla stessa sessione nominata, mai in parallelo. Ogni comando attende l'esito del precedente. Nel profilo `ciclo_atomico` tutti i comandi stanno nella stessa esecuzione che possiede server e cleanup. Navigare sempre via `http://localhost:<porta>/`, mai `file://`.
5. Verifica route per pagina: prima degli screenshot di OGNI pagina consegnata, richiedere la sua URL via HTTP e verificare status 200 piu la firma specifica registrata nel preflight (preferibilmente il `<title>` atteso; in alternativa H1 o testo distintivo presente nel relativo `index.html`). La firma della home non vale per le pagine interne. Una route che restituisce 200 ma mostra la home, una fallback generica o una firma diversa e un render fallito: non produrre screenshot con il nome della pagina attesa, correggere la route oppure registrare il blocco.
6. Preparazione di ogni acquisizione: impostare il viewport, navigare o fare reload della route esatta, attendere il caricamento previsto, verificare di nuovo route e firma nel browser, quindi portare lo scroll a `0,0`. Non riusare posizione di scroll o stato DOM della pagina precedente.
7. Screenshot full-page: acquisire desktop e mobile full-page con viewport espliciti (es. 1440x900 e 390x844) per OGNI pagina consegnata, ripetendo la preparazione del punto 6. Verificare nell'immagine footer e ultima sezione prevista. Uno screenshot limitato alla prima schermata non vale come evidenza di build o QA.
8. Screenshot viewport e sticky header: una cattura viewport serve a verificare above the fold, overlay e geometria dello sticky header, ma non sostituisce il full-page. Se il full-page mostra header ripetuti, duplicati o sovrapposti, non aprire un finding dal solo file stitched: dopo reload della stessa route e scroll iniziale `0,0`, verificare una cattura viewport e, se necessario, la geometria dell'header a scroll iniziale e dopo uno scroll controllato. Il finding e valido solo se l'anomalia e riproducibile nel viewport o nella geometria del browser. Conservare la cattura viewport solo se sostiene un controllo o finding e citarla nel QA report.
9. Naming: all'avvio di ogni ciclo fissare un unico `<run-ts>` nel formato locale `YYYY-MM-DD_HHMMSS`. Salvare i full-page obbligatori direttamente in `06_QA/evidence/` con `<run-ts>_<pagina>_<fase>_<viewport>_full-page.png`, dove `<pagina>` e lo slug ASCII della route (`home` per `/`), `<fase>` e `build` oppure `qa` e `<viewport>` include dispositivo e dimensioni. Per una cattura viewport conservata usare il suffisso `_viewport.png`. Esempi: `2026-07-14_143205_home_build_desktop_1440x900_full-page.png`, `2026-07-14_151044_servizi-abiti_qa_mobile_390x844_viewport.png`. Se un path esiste gia, generare un nuovo `<run-ts>`, mai sovrascrivere. Non salvare le evidenze da conservare negli scratch root (`output/`, `.playwright-mcp/`, `.impeccable/`).
10. Chiusura: chiudere la sessione browser e terminare il server usando l'handle salvato (PowerShell: `Stop-Process -Id $server.Id`; POSIX: `kill <PID>`). Nel profilo `ciclo_atomico` il cleanup deve stare in `finally` o equivalente e deve essere eseguito anche in caso di route, firma, browser o screenshot falliti.

## Regola di blocco

Se il render fallisce anche dopo la procedura completa (server avviato e diagnosticato, comandi sequenziali, niente `file://`), non improvvisare alternative: registrare il blocco in `WORKFLOW_STATUS.md` (blocchi aperti e prossima azione) e un checkpoint nel run log `07_HISTORY/E2E_RUN_LOG.md`. In sessione QA fresca il render fallito blocca Gate 5, coerentemente con `00_SYSTEM/GATING_RULES.md` (evidenze render fresche obbligatorie).

Ogni fallimento di ambiente che interrompe la procedura (server che non risponde, browser bloccato, permessi negati dal sandbox) va registrato come checkpoint `blocco` nel run log al momento in cui avviene, conservando l'errore osservato (estratto del log o messaggio). Cambiare strumento di render senza il checkpoint di blocco che lo motiva rende la run non conforme: le evidenze prodotte cosi non valgono per chiusura build o QA.

Prima di chiudere build o QA, confrontare i file nuovi in `06_QA/evidence/` con il run log e la tabella evidenze del report. Un file nuovo senza checkpoint precedente e contemporaneo, ciclo/fase e origine dichiarati e un blocco di audit anche se non citato: non associarlo retroattivamente e non usarlo. Registrare prima il blocco con path e motivo, rimuovere poi il file non valido dalla cartella di consegna, ripetere correttamente il ciclo e registrare un checkpoint di risoluzione che cita le nuove prove valide. Cancellare il file prima del checkpoint di blocco nasconde l'anomalia e non e conforme.

## Cosa non fare

- Non usare `file://` per preview o screenshot.
- Non lanciare comandi `playwright-cli` in parallelo sulla stessa sessione nominata.
- Non lanciare comandi browser prima di aver verificato che il server risponde con la firma attesa della pagina: uno status 200 senza firma puo venire da un altro server sulla stessa porta.
- Non riutilizzare la sola firma della home come prova delle route interne: ogni pagina richiede status e firma propri prima degli screenshot.
- Non riprovare alla cieca un server che non risponde: prima diagnosi (PATH, porta, errore), poi eventuale blocco.
- Non lasciare il server attivo a fine sessione.
- Non usare gli scratch root come destinazione delle evidenze da conservare.
- Non usare screenshot limitati al viewport come sostituti delle evidenze full-page: servono solo a controlli mirati, inclusa la verifica sticky.
- Non classificare come difetto una duplicazione sticky visibile solo nel full-page stitched: confermare nel viewport o con geometria browser dopo reload, route/firma e scroll `0,0`.
- Non sovrascrivere evidenze di cicli precedenti: `<run-ts>` e fase (`build`/`qa`) nel nome file sono obbligatori; un path gia esistente impone un nuovo timestamp di ciclo.
- Non salvare profili browser, cache o log degli strumenti render dentro `projects/<cliente>/`: usare temp o scratch di sessione.
- Non aggirare un sandbox che blocca server o browser con strumenti alternativi non previsti: chiedere escalation una volta oppure registrare il blocco.
- Non usare il profilo persistente quando ogni tool call crea una nuova shell: in quel caso il ciclo atomico e obbligatorio.

## Preview per l'utente

Il sito usa URL a cartella con trailing slash: anche per la visione manuale serve un server HTTP. Aprire `index.html` da Esplora risorse (protocollo `file://`) mostra la home ma sulle route interne produce un elenco directory: non e un bug del sito.

Ogni consegna deve includere entrambi questi elementi, pronti da copiare:

1. comando da lanciare nella root del progetto cliente;
2. URL iniziale completo da aprire nel browser.

Esempio:

```text
python -m http.server 8080 --directory 05_SITE
```

Poi navigare `http://localhost:8080/`. Chiudere il server con `Ctrl+C` a fine visione.

La porta puo cambiare, ma comando e URL devono usare la stessa porta. Non consegnare un path `file://`, il solo nome `index.html` o un comando senza URL iniziale.
