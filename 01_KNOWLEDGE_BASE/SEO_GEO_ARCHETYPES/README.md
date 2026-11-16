# Archetipi SEO/GEO

Preset strategici versionati per siti vetrina locali. Gli archetipi accelerano gli step 02-06, ma non approvano pagine, keyword, claim, dati locali o scelte visuali.

## Regole di selezione

- Selezionare un solo archetipo primario dopo `01_BRIEF_NORMALIZER.md`.
- Ammettere al massimo un archetipo secondario, solo se brief, CTA e intento documentano un secondo percorso reale.
- Il secondario non genera automaticamente pagine, sezioni o CTA duplicate.
- Registrare evidenze, segnali contrari, confidenza, modificatori e delta cliente nello step 01.
- La selezione non e un gate e non richiede approvazione utente separata.
- Primario ambiguo e confidenza bassa, regola unica: se il brief dichiara due percorsi di pari peso e non indica quale conti di piu, oppure se la confidenza sulla selezione e `bassa`, l'agente non sceglie. La gerarchia dei percorsi e un dato del cliente. Lo step 01 si chiude con il primario marcato provvisorio, blocco tracciato in `WORKFLOW_STATUS.md` e decisione aperta con owner Utente in `07_HISTORY/DECISION_LOG.md`. Gli step successivi possono proseguire sul provvisorio, ma Gate 3 non passa senza la firma dell'utente. Non esiste un criterio di tie-break che l'agente possa applicare al posto del cliente: se ne inventa uno, un'altra sessione sullo stesso brief arriva a una scelta diversa.
- Keyword research, test doorway, fonti cliente, approvazione sitemap e QA pre-design restano obbligatori.

## Modificatori normalizzati

| Chiave | Valori ammessi | Nota |
| --- | --- | --- |
| Modello operativo | `sede`, `service-area`, `ibrido` | Determina quali dati locali possono essere pertinenti. `ibrido` e `non supportato`: nessuno step separa segnali di sede e segnali di area. Blocca a Gate 1. |
| Sedi | `singola`, `multipla` | `multipla` e `non supportato`: gli step non hanno campi per sede ne controllo di originalita fra location page. Blocca a Gate 1. |
| Urgenza | `standard`, `urgente confermata` | L'urgenza richiede fonte e disponibilita reale. |
| Settore | `standard`, `regolato` | `regolato` e `non supportato`: nessun file definisce i controlli di settore che il modificatore promette. Blocca a Gate 1. |
| Offerta | `focalizzata`, `catalogo strutturato` | Il catalogo richiede offerta reale e profondita sufficiente. |
| Decisione | `immediata`, `ponderata` | La complessita decisionale non e un archetipo. |
| Sito precedente | `assente confermato`, `esistente`, `non noto` | Governa inventario e `REDIRECT_MAP.md`. |

## Rami non supportati

Tre valori restano nel registro perche servono a riconoscere il caso, ma la loro
presenza e una condizione di stop, non un modificatore applicabile: `Settore:
regolato`, `Sedi: multipla`, `Modello operativo: ibrido`.

Motivo: il workflow promette per questi rami controlli che non esistono. Nessun
file di knowledge base definisce i controlli di claim, prove e linguaggio del
settore regolato; nessuno step ha campi per sede, controllo di originalita fra
location page o regola di separazione fra segnali di sede e segnali di area.

Dove blocca: `00_SYSTEM/GATING_RULES.md`, Gate 1, sui segnali del brief, cioe
prima che il modificatore venga registrato in questo step. Gate 2 (step 01) e
Gate 3 ripetono la condizione sul modificatore effettivo, come rete di sicurezza
per il caso in cui il segnale emerga piu tardi.

Il progetto non prosegue senza una decisione utente registrata in
`07_HISTORY/DECISION_LOG.md`: rinunciare, ridurre il perimetro a un ramo
supportato, oppure estendere il workflow prima di procedere.

## Contratto comune del preset

Ogni preset dichiara:

- `archetype_id` e `archetype_version`;
- obiettivo, condizioni d'uso e controindicazioni;
- candidati per intenti, CTA, sitemap, blueprint, profondita e segnali locali;
- prove richieste, lacune tipiche e query/pagine da non inseguire;
- regole che non possono essere bypassate;
- input di persuasione utili a Gate 3 senza prescrivere mood, palette, font, componenti o layout.

## Confine con Impeccable

Gli archetipi definiscono cosa il visitatore deve capire, credere e fare e quali prove reali possono sostenerlo. Impeccable `shape/new-work`, dentro Gate 3, decide per ogni superficie modalita, mondo visuale, forma, composizione e first viewport. Nessun archetipo e una scorciatoia estetica.

