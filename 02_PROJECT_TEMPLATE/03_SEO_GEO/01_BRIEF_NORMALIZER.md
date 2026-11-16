# 01 Brief Normalizer

## Funzione

Ripulire e normalizzare `PRODUCT.md` dal punto di vista SEO/local.

## Input richiesti

- `01_INPUT/PRODUCT.md`
- `01_INPUT/MISSING_INFO.md`
- `02_CONTEXT/CLIENT_CONTEXT.md`
- `02_CONTEXT/LOCAL_CONTEXT.md`
- `01_KNOWLEDGE_BASE/SEO_GEO_ARCHETYPES/README.md` e preset A1-A4

## Output atteso

Business Entity Summary con:

- identita attivita;
- categoria e sottocategorie;
- citta e area servita;
- NAP;
- offerta;
- target;
- differenziatori;
- CTA;
- prove di fiducia;
- sito precedente letto dalla sezione canonica di `01_INPUT/CLIENT_BRIEF.md`: `esiste` / `non esiste - confermato` / `non noto`, con inventario URL se esiste;
- lacune e assunzioni.
- selezione archetipo con un primario obbligatorio, massimo un secondario e modificatori normalizzati.

## Criteri minimi di qualita

- L'attivita e identificabile senza ambiguita.
- I dati mancanti non sono inventati.
- Le assunzioni sono dichiarate.
- CTA e offerta sono coerenti con il business reale.
- La selezione archetipo cita evidenze del brief, segnali contrari, confidenza e delta cliente.

## Blocchi che impediscono lo step successivo

- Categoria principale assente.
- Citta o area servita assente e non dichiarata come lacuna.
- Offerta principale non chiara.
- CTA primaria assente.
- Archetipo primario assente, piu di un secondario o modificatori fuori dai valori ammessi.
- Primario ambiguo: il brief dichiara due percorsi di pari peso e non indica quale conti di piu. Non risolvere con un criterio proprio: chiudere lo step con blocco e decisione aperta owner Utente.
- `Confidenza: bassa` sulla selezione, per qualunque motivo. La confidenza bassa e una condizione di stop, non una nota.
- Modificatore `non supportato` rilevato: `Settore: regolato`, `Sedi: multipla` o `Modello operativo: ibrido`. Il progetto e gia oltre Gate 1 per errore: aprire il blocco e chiedere la decisione utente prima di procedere.

## Metodo

1. Leggere gli input richiesti e isolare dati commerciali, locali e di posizionamento.
2. Compilare la Business Entity Summary voce per voce, usando solo dati presenti negli input.
3. Per ogni dato mancante aprire una lacuna in `01_INPUT/MISSING_INFO.md` o dichiarare un'assunzione nella tabella sotto: mai inventare.
4. Descrivere le prove di fiducia per tipo e solo se vere ("oltre dieci anni di attivita", "rivenditore autorizzato"): mai numeri di licenza, premi, recensioni o nomi clienti non confermati.
5. Compilare o aggiornare la sezione `Sito precedente` di `01_INPUT/CLIENT_BRIEF.md`, che e la fonte canonica: se esiste, inventariare li le URL raggiungibili o indicizzate (alimentera `03_SEO_GEO/REDIRECT_MAP.md`); se e confermato che non esiste, registrare stato, fonte e data; se non e noto, registrare lo stato e aprire la lacuna in `01_INPUT/MISSING_INFO.md`. Riportare qui solo la sintesi con riferimento al brief. Non rimandare la domanda: a Gate 5 la consegna reale e bloccata senza questo dato.
6. Selezionare automaticamente un archetipo primario e, solo con un secondo percorso reale documentato da CTA e intento, un archetipo secondario. La selezione non richiede approvazione utente separata e non e un nuovo gate.
7. Applicare i modificatori normalizzati del registro archetipi. Registrare evidenze, segnali contrari, confidenza, delta cliente e campi da verificare. Il secondario non precompila automaticamente pagine, sezioni o CTA duplicate.
8. Se il brief dichiara due percorsi di pari peso, o se la confidenza risulta `bassa`, non scegliere: la gerarchia dei percorsi e un dato del cliente. Registrare il primario come provvisorio, aprire il blocco in `WORKFLOW_STATUS.md`, aprire la decisione in `07_HISTORY/DECISION_LOG.md` con owner Utente e chiedere il dato. Gli step successivi possono proseguire, ma Gate 3 resta chiuso finche manca la firma.
9. Se un modificatore risulta `Settore: regolato`, `Sedi: multipla` o `Modello operativo: ibrido`, fermarsi: sono rami `non supportati` che Gate 1 avrebbe dovuto intercettare sul brief. Aprire il blocco `modificatore non supportato rilevato` e chiedere la decisione utente. Vedi `01_KNOWLEDGE_BASE/SEO_GEO_ARCHETYPES/README.md`, sezione `Rami non supportati`.
10. Chiudere lo step compilando decisioni prese, assunzioni e rischi.

## Business Entity Summary

<!-- Compilare qui l'output dello step. -->

## Selezione archetipo

- Registro preset/versione:
- Archetipo primario (ID e versione):
- Archetipo secondario (ID e versione oppure `nessuno`):
- Evidenze dal brief:
- Segnali contrari e controindicazioni:
- Confidenza: alta / media / bassa (`bassa` = blocco: lo step si chiude con decisione aperta owner Utente, Gate 3 non passa senza la firma)
- Primario ambiguo (due percorsi di pari peso dichiarati dal brief): si / no
- Decisione aperta collegata (ID in `07_HISTORY/DECISION_LOG.md`, owner Utente):
- Delta cliente:
- Campi da verificare:

### Modificatori

| Modificatore | Valore | Fonte/evidenza | Note |
| --- | --- | --- | --- |
| Modello operativo | sede / service-area / ibrido |  |  |
| Sedi | singola / multipla |  |  |
| Urgenza | standard / urgente confermata |  |  |
| Settore | standard / regolato |  |  |
| Offerta | focalizzata / catalogo strutturato |  |  |
| Decisione | immediata / ponderata |  |  |
| Sito precedente | assente confermato / esistente / non noto |  |  |

## Decisioni prese

- 

## Assunzioni e rischi

| Assunzione | Rischio | Dato per validarla |
| --- | --- | --- |
|  |  |  |

## Collegamento a SITE_STRATEGY.md

Questo step alimenta `Business Entity Summary`, `Applicazione archetipo` e `Local SEO Assumptions`.
