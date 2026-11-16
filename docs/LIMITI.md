# Limiti e stato della distribuzione

Il progetto e un workflow assistito, non un servizio autonomo. Ricerca, interpretazione,
copy, design e approvazioni non diventano codice automatico perche esiste un template.

La demo compie il percorso su dati inventati fino alla generazione del sito, usando
elaborati dell'assistente congelati. Le ipotesi di ricerca sostituiscono la ricerca
live soltanto nella dimostrazione; non simulano volumi o osservazioni di competitor.
Non dichiariamo superati i gate di consegna commerciale dell'originale: richiedono
approvazioni specifiche, dati verificati, mock e QA fresco da una sessione che non
abbia costruito il sito. La revisione visiva di questa distribuzione e dello stesso
assistente; i test automatici sono indipendenti dai giudizi visuali, non un QA AI fresco.

## Parti incomplete o sperimentali conservate

- Impeccable: playbook progettato per 4.0.2; launcher adattato anche al contesto 4.3.1,
  senza dichiarare una migrazione completa o tutti i comandi collaudati.
- Fast Lane: prototipo, fixture interne e mirror richiesto; input annidati non coperti
  da uno schema JSON completo. Fallimenti inattesi restano errori, non successi.
- Nessun generatore automatico di ricerca o controllo della verita delle affermazioni.
- Settori regolati, sedi multiple e modello ibrido restano rami non supportati.
- Redirect: contratto documentale conservato; demo senza sito precedente.
- Modelli vuoti contengono segnaposto intenzionali e non sono pagine pubblicabili.
- I test coprono contrasto dei principali colori, focus, landmark, navigazione e
  overflow: non un audit di accessibilita completo, screen reader o valutazione legale.
- Nessun Core Web Vitals sul campo, benchmark commerciale, ranking o citazione AI misurata.

I riferimenti storici a sprint e prove con progetti preesistenti sono esclusi dalla
distribuzione: non costituiscono evidenza pubblica. Le prove nuove sono in VERIFICHE.md.
Nessuna garanzia di sicurezza assoluta, titolarita assoluta o idoneita alla produzione.
