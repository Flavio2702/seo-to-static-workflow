# Dipendenze e attribuzioni

I contributi originali concedibili sono Apache-2.0, copyright 2026 Flavio2702.
Gli adattamenti MIT conservano i rispettivi avvisi; Apache-2.0 non li sostituisce.

| Fonte | Materiale dichiarato nel workflow | Avviso |
| --- | --- | --- |
| [ai-website-system](https://github.com/zainsaeeed/ai-website-system) | Metodi/euristiche dei sette step e pipeline | [MIT, Xegents AI 2026](licenses/ai-website-system-MIT.txt) |
| [seomachine](https://github.com/TheCraigHewitt/seomachine) | Organizzazione del contesto persistente | [MIT, Castos e contributors 2025](licenses/seomachine-MIT.txt) |
| [localseoskills](https://github.com/garrettjsmith/localseoskills) | Memoria locale e test doorway adattato | [MIT, Garrett Smith / GMB Gorilla 2026](licenses/localseoskills-MIT.txt) |
| [claude-seo](https://github.com/AgriciDaniel/claude-seo) | QA e citabilita adattati | [MIT, agricidaniel 2026](licenses/claude-seo-MIT.txt) |

Licenze consultate tramite i file LICENSE pubblici il 2026-11-15. La matrice
storica di adozione e conservata in docs/EXTERNAL_REPOSITORY_PATTERNS.md; non implica
che ogni funzionalita dei progetti citati sia inclusa qui.

## Dipendenze di esecuzione e sviluppo

- Python: libreria standard, nessun pacchetto runtime aggiuntivo.
- Node.js: runtime per i soli strumenti JavaScript locali.
- @playwright/test, playwright e playwright-core 1.62.0: Apache-2.0, Microsoft;
  scaricati tramite npm e lockfile, non vendorizzati. Chromium ha avvisi propri
  distribuiti con il browser scaricato. fsevents 2.3.2 e dipendenza opzionale MIT su macOS.
- Gitleaks 8.30.1: MIT, Zachary Rice; strumento CI/locale, binario non incluso.
- Impeccable: installazione separata, nessun codice o asset della skill redistribuito.
- GitHub Actions ufficiali: scaricate da GitHub, non incorporate nei contributi originali.

La demo usa font di sistema e CSS originale, senza immagini, icone, template o
font terzi. Non contiene servizi a pagamento incorporati.
