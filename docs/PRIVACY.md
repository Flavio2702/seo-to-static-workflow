# Privacy e servizi esterni

La distribuzione e costruita da una copia revisionata, senza cronologia originale.
Sono esclusi tutti i progetti esistenti, i siti reali, output precedenti, documenti
Word e metadati, immagini private, archivi, log, cache, sessioni, configurazioni
degli editor, account e impostazioni di deployment. I dati della demo sono nuovi.

`projects/`, `private/`, `runtime/`, `.env`, configurazioni `*.local.json`, ambienti,
log e output degli strumenti sono ignorati. Prima di ogni commit controlla i file:
Gitignore non protegge dati scritti altrove o aggiunti con forza.

| Servizio/strumento | Dati coinvolti | Requisiti e costi |
| --- | --- | --- |
| Assistente AI scelto | Brief e file che l'utente rende accessibili | Account/abbonamento o API secondo il servizio; nessuna chiave inclusa |
| Ricerca web manuale/assistita | Query e pagine consultate | Strumenti disponibili nell'assistente; nessun provider integrato nel codice |
| Impeccable installato localmente | Contesto progetto e dipendenti dal comando | Installazione separata, policy e costi del fornitore da verificare |
| npm / download Chromium | Richieste di pacchetti e indirizzo IP | Rete solo per installazione, nessuna chiave |
| GitHub / Pages / Actions | Solo distribuzione pubblica e demo sintetica | Risorse pubbliche gratuite entro condizioni e limiti del servizio |

Ignorare i file in Git non impedisce che l'assistente legga o invii contenuti al
servizio AI. Non usare input riservati senza verificare autorizzazioni e condizioni.
La demo non fa richieste a servizi terzi dal frontend, non raccoglie dati e non usa
analytics, mappe incorporate, moduli, font remoti o pixel. Il solo link esterno
esplicito porta al repository quando il visitatore lo seleziona.

Gitleaks e controlli aggiuntivi riducono il rischio, senza garantire assenza di
segreti. Una credenziale pubblicata va revocata o ruotata: rimuoverla non basta.
