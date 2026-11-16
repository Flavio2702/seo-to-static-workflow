# Verifiche effettive

Verifica locale conclusiva: 2026-11-16, Windows, Python 3.14.0, Node.js 24.12.0,
Playwright 1.62.0, Chromium headless 151.0.7922.34. Installazione pulita con `npm ci`
in copia isolata; nessuna chiave o chiamata AI. Python usa solo la libreria standard.

- 12 test Python: propagazione contratto SEO/HTML, metadati, sitemap, link, asset,
  input errati, configurazione personalizzata, escaping e bootstrap senza sovrascrittura.
- 14 test Playwright: otto casi demo (quattro pagine a 1440 e 390 px), sei casi
  verifier (regressioni originali, determinismo, input, confinamento, errore simulato,
  assenza di punteggi visuali inventati).
- `python scripts/demo.py --check`: sette file riprodotti esattamente.
- Avvio rapido e creazione progetto dal template eseguiti nella copia isolata.
- Revisione visiva delle otto schermate: gerarchia leggibile, navigazione visibile,
  contenuti e CTA accessibili, nessun taglio o sovrapposizione osservato.
- Contrasto automatico dei principali colori >= 4.5:1; focus tastiera e skip link
  verificati. Nessuna richiesta frontend a servizi esterni osservata.
- Gitleaks 8.30.1 sui file: nessun finding. Scansione nuova cronologia richiesta
  prima del push e ripetuta da GitHub Actions senza esclusioni personalizzate.

I primi tentativi browser nell'ambiente ristretto non potevano raggiungere localhost;
la suite e stata eseguita con accesso al server locale. Nessun controllo allentato.
La simulazione del guasto riguarda il driver browser, non un provider AI reale.
La revisione visiva e dell'assistente che ha costruito la demo: non viene presentata
come QA fresco del Gate 5. Qualita AI, domanda di ricerca, performance sul campo e
idoneita commerciale non sono certificate da questi controlli.

## Riprodurre

Seguire i comandi del README. Gli esiti remoti e il commit sono consultabili in
[GitHub Actions](https://github.com/Flavio2702/seo-to-static-workflow/actions).
Il deploy dipende dal superamento di test, riproduzione demo e Gitleaks file/cronologia.
