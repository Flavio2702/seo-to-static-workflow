# 04 Page Blueprint Generator

## Funzione

Definire obblighi informativi e sequenza narrativa di ogni pagina senza trasformarli in wireframe estetico.

## Input richiesti

- `03_SITEMAP_DECISION_ENGINE.md`
- `01_INPUT/PRODUCT.md`
- `02_CONTEXT/TARGET_KEYWORDS.md` (sezione `Keyword per pagina` allineata allo snapshot approvato)
- `02_CONTEXT/BRAND_VOICE.md`
- `02_CONTEXT/INTERNAL_LINKS_MAP.md`

## Output atteso

Per ogni pagina:

- intento;
- pubblico;
- H1;
- title;
- meta description;
- sezioni;
- CTA;
- trust signals;
- FAQ;
- link interni;
- placeholder semantici.
- brief di persuasione: azione, convinzione, obiezione, prova, asset e verita del primo viewport.

## Criteri minimi di qualita

- Ogni pagina ha un solo H1 previsto.
- H1 e title usano la keyword primaria verificata per le pagine con intento di ricerca; per le pagine navigazionali seguono intento e classificazione senza keyword forzate.
- Ogni sezione ha funzione chiara.
- I placeholder descrivono contenuto atteso, non usano lorem ipsum.
- I contenuti che non possono comparire nemmeno come placeholder sono marcati `non pubblicabile` con motivazione e lacuna collegata, e non entrano in sezioni, FAQ o trust signals (vedi `00_SYSTEM/ARTIFACT_CONTRACTS.md`, sezione `Stati del contenuto`).
- CTA e trust signals sono coerenti con `PRODUCT.md`.

## Blocchi che impediscono lo step successivo

- Blueprint generici o intercambiabili.
- Title/meta mancanti.
- Sezioni senza funzione.
- Link interni casuali.
- Prescrizioni di mood, palette, font, componenti o layout derivate dall'archetipo.

## Metodo

1. Creare un blocco `### Pagina: ...` per ogni URL della sitemap approvata in `03_SITEMAP_DECISION_ENGINE.md`, nessuna esclusa.
2. Compilare per ogni pagina intento, pubblico, H1, title, meta, CTA e trust signals coerenti con `PRODUCT.md`, brand voice e relativa riga di `02_CONTEXT/TARGET_KEYWORDS.md`. Se una riga manca o non coincide con lo snapshot approvato, tornare allo step 03: non scegliere keyword o slug in questo step.
3. Definire gli obblighi informativi e la loro sequenza narrativa, tenendo solo quelli motivati dall'intento della pagina. Non scegliere componenti visuali.
4. Definire i link interni leggendo `02_CONTEXT/INTERNAL_LINKS_MAP.md` e aggiornarla con i link decisi.
5. Scrivere placeholder semantici che descrivono il contenuto atteso, mai testo finto.
6. Compilare `Origine` ereditandola dalla riga corrispondente della `Search Intent Map` dello step 02: `primario`, `secondario` o `delta cliente`. Se un obbligo informativo nasce qui e non deriva dal preset, l'origine e `delta cliente`. Serve a rendere verificabile a valle quanto della pagina viene dal preset e quanto dal cliente reale.

## Euristiche operative

Orientamenti, non soglie vincolanti.

- Title: per le pagine con intento di ricerca, ~60 caratteri con keyword primaria e nome attivita; per le pagine navigazionali, sintesi naturale dell'intento e nome attivita, senza keyword forzate e senza riportare lo stato `n/a - pagina navigazionale`.
- Meta description: 140-160 caratteri con offerta, citta e un motivo per cliccare.
- H1: per le pagine con intento di ricerca contiene la keyword primaria in forma naturale, mai forzata; per le pagine navigazionali segue intento e blueprint, senza keyword forzate e senza riportare lo stato `n/a - pagina navigazionale`.
- H2: possono portare intenti secondari quando suona naturale.
- FAQ: domande reali di acquisto o visita (prezzi, tempi, disponibilita, parcheggio), non "Che cos'e X?".
- Trust signals: tipi di prova concreti e verificabili, coerenti con `PRODUCT.md`.
- Apertura strategica: chiarire offerta, contesto locale, azione e prova necessaria; `apertura` non significa hero standard e non prescrive composizione.
- Obblighi informativi ricorrenti possibili: offerta, processo, criteri di scelta, contesto locale, prova, FAQ reale e chiusura con azione. Usarli solo quando motivati e descriverne la funzione, non il componente visuale.
- CTA: coerente con il comportamento atteso mappato in `02_LOCAL_INTENT_MAPPER.md`.

## Page blueprints

<!-- Duplicare il blocco seguente per ogni pagina della sitemap approvata in 03_SITEMAP_DECISION_ENGINE.md. -->

### Pagina: Home

- URL:
- Intento:
- Pubblico:
- H1:
- Title:
- Meta description:
- CTA primaria:
- CTA secondaria:
- Trust signals:
- FAQ:
- Link interni:
- Origine (primario / secondario / delta cliente):

#### Brief di persuasione

- Azione attesa:
- Convinzione da ottenere:
- Obiezione principale:
- Meccanismo unico del business da rendere comprensibile:
- Scena reale del pubblico:
- Prova reale richiesta:
- Asset disponibili:
- Asset mancanti:
- Contenuti non negoziabili:
- Verita da rendere evidenti nel primo viewport:

#### Sequenza narrativa

| Ordine | Obbligo informativo | Funzione | Contenuto atteso | Origine | Dipendenza/prova |
| --- | --- | --- | --- | --- | --- |
| 1 | Apertura strategica | Chiarire offerta, luogo, azione e prova |  |  |  |

## Decisioni prese

- 

## Assunzioni e rischi

- 

## Collegamento a SITE_STRATEGY.md

Questo step alimenta `Page Blueprints`, `Internal Linking Plan` e metadati pagina.
