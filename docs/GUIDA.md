# Guida operativa

## Progetto reale

1. Esegui `python scripts/prepara.py nome-progetto` dalla root. La cartella nasce dal
   template completo, non dalla demo o da un altro cliente.
2. Conserva brief e materiali in `projects/nome-progetto/`; questa cartella e ignorata.
3. Apri la repository con un assistente e indica `AGENTS.md` (Codex) o `CLAUDE.md`.
   Chiedi di lavorare esclusivamente nel progetto scelto, partendo dallo status.
4. Compila PRODUCT, informazioni mancanti e contesto. Rispetta Gate 1 e i rami non supportati.
5. Esegui i sette step di `03_SEO_GEO/` nell'ordine indicato. Ricerca vera: conserva
   fonte e data; dati assenti restano assenti. Approva sitemap e pagine escluse.
6. Consolida SITE_STRATEGY, poi design e mock. Non anticipare il sito alla strategia.
7. Costruisci in `05_SITE/`. Aggiorna bridge, log e stato; usa una sessione fresca
   per il QA finale secondo le regole standard conservate.

Le procedure sono istruzioni all'assistente, non un motore che esegue automaticamente
gli step. L'utente mantiene le approvazioni previste per un progetto commerciale.
Non dichiarare gate superati con dati simulati o sulla sola base dei test qui inclusi.

## Integrazione design

La skill Impeccable non e inclusa ne installata automaticamente. Il wrapper
PowerShell accetta `-SkillDirectory` oppure la variabile locale `IMPECCABLE_HOME`.
In assenza usa la posizione standard della skill nel profilo utente. Il file
`.env.example` contiene solo un segnaposto; i file `.env` non vengono caricati da soli.

```powershell
./04_TOOLS/run-impeccable-context.ps1 -WorkingDirectory ./projects/nome-progetto -Target 05_SITE/index.html -SkillDirectory /percorso/della/skill
./04_TOOLS/run-impeccable-context.ps1 -WorkingDirectory ./projects/nome-progetto -Target 05_SITE/index.html -Mode bridge_preflight -RequireDesign
```

Il wrapper supporta il precedente `context.mjs` e il launcher Windows
`impeccable.cmd context`. Controlla versione, percorso, bridge e hash. L'adattamento
del launcher non certifica la compatibilita di tutti i comandi design: i playbook
originali descrivono la versione 4.0.2, la sessione di preparazione ha trovato 4.3.1.
I bridge non devono sostituire i documenti canonici. I checkpoint stampati possono
contenere percorsi locali: conservali nel progetto privato, non nelle issue.

## Demo e configurazione personalizzata

`python scripts/demo.py --check` confronta byte per byte il render col sito incluso.
`python scripts/demo.py` scrive soltanto in `runtime/demo-site`.
Puoi copiare `demo/strategy.json` in `private/strategy.json`, modificare title, testi,
link e base URL e usare `python scripts/demo.py --strategy private/strategy.json`.
Il renderer accetta esclusivamente il contratto sintetico: non sostituisce il
workflow per clienti e non verifica che le affermazioni siano vere.

Per pubblicare un sito reale servono revisione dei dati, dominio corretto, decisione
esplicita su indicizzazione, contatti, privacy e hosting. Nessun deploy reale incluso.

## Errori

Input JSON invalido, campi obbligatori assenti, URL con credenziali, slug con traversal,
destinazioni duplicate e link sconosciuti bloccano il render con exit code 2.
Un template mancante o progetto gia presente blocca il bootstrap senza sovrascrittura.
Browser mancante: installare Chromium. Skill assente: il preflight fallisce.
Un errore del driver browser propaga il fallimento, non produce un report di successo.
