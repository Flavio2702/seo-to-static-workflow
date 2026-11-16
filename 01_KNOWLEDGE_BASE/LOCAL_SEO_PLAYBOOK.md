# Local SEO playbook

## Funzione del file

Trasformare dati locali reali in segnali leggibili per utenti, motori di ricerca e AI search.

## Regole operative

- Distinguere due superfici collegate ma non equivalenti: il sito supporta risultati organici e comprensione dell'entita; Google Business Profile governa la presenza gestita in Maps e local pack. Il template HTML non sostituisce il profilo.
- Rendere evidenti nome, indirizzo, telefono, orari e area servita quando disponibili.
- Dichiarare citta, quartiere, indicazioni, parcheggio, mezzi pubblici e riferimenti utili solo se reali.
- Collegare CTA e informazioni locali: chiamata, WhatsApp, prenotazione, visita in negozio, richiesta preventivo.
- Usare prove di fiducia concrete: recensioni, anni di attivita, certificazioni, foto reali, garanzie e modalita operative verificabili.
- Includere schema `LocalBusiness` solo con dati verificati.
- Evitare pagine per citta, quartieri o aree se non hanno intento distinto e contenuto specifico.
- Trattare rilevanza, distanza e prominenza come euristiche operative: completezza dati, coerenza locale e prove esterne verificabili.
- Non inventare recensioni, rating, anni di attivita, certificazioni, marchi trattati o coordinate.
- Se il business e a sede singola, distinguere tra luogo fisico, area servita e zone citate per orientamento.
- Per retail, segnalare prodotti o categorie in negozio solo se realmente disponibili o dichiarati come assortimento tipico.
- Le informazioni locali importanti devono essere visibili in HTML e coerenti con eventuale Google Business Profile.
- Prevedere come handoff post-pubblicazione la rivendicazione o verifica del Google Business Profile e la verifica proprieta in Search Console; sono attivita operative esterne al template e non condizioni per inventare dati nel sito.
- Settore regolato, sedi multiple e modello operativo ibrido sono rami `non supportati` del workflow: i segnali locali di questi casi non si pianificano qui, il progetto si ferma prima. Regola e blocco in `01_KNOWLEDGE_BASE/SEO_GEO_ARCHETYPES/README.md`, sezione `Rami non supportati`, e in `00_SYSTEM/GATING_RULES.md`, Gate 1.

## Euristiche operative da fonte secondaria

- Per confermare un intento locale, osservare la SERP corrente: presenza di local pack, mappa o risultati organici locali e un segnale utile, non una prova sufficiente per creare una pagina.
- Una pagina location deve mostrare presenza o operativita reale con contenuto specifico: sede, mappa, indicazioni, fotografie originali, servizi disponibili, modalita operative e CTA coerente. Usare solo gli elementi veri e pertinenti.
- Progettare ogni pagina locale come possibile pagina di ingresso: proposta, luogo, differenziatori, prova e CTA devono essere comprensibili senza passare dalla home.
- Le euristiche di questa sezione orientano gli step 02-06 ma non superano test doorway, fonti cliente o approvazione sitemap.

## Dati locali ammessi

- NAP: nome, indirizzo e telefono ufficiali o lacuna esplicita.
- Orari: giorni e fasce confermate; evitare placeholder se non disponibili.
- Area servita: zone realmente raggiunte o servite, con limite operativo chiaro.
- Indicazioni: parcheggio, mezzi, landmark e accessibilita solo se verificati.
- Prove di fiducia: recensioni, foto reali, esperienza, certificazioni, garanzie e partnership documentabili.
- Structured data: solo proprieta coerenti con contenuto visibile e con il tipo di business corretto.

## Controlli minimi

- [ ] NAP presente o lacuna dichiarata.
- [ ] Orari presenti o lacuna dichiarata.
- [ ] Area servita coerente con la realta operativa.
- [ ] Contatti e CTA visibili in HTML.
- [ ] Dati strutturati non inventano informazioni mancanti.
- [ ] Ogni prova di fiducia ha fonte o puo essere verificata dal cliente.
- [ ] Le zone locali non generano pagine doorway.
- [ ] Google Business Profile e sito non comunicano dati locali contraddittori, se il profilo e disponibile.
- [ ] L'handoff distingue attivita sul sito, Google Business Profile e Search Console.

## Fonti e data di consultazione

- Google Business Profile Help, Tips to improve your local ranking: https://support.google.com/business/answer/7091
- Google Search Central, LocalBusiness structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google Search Central, Establish business details: https://developers.google.com/search/docs/appearance/establish-business-details
- schema.org, LocalBusiness: https://schema.org/LocalBusiness
- Ahrefs, Location Landing Pages: https://ahrefs.com/blog/location-pages/ (euristica secondaria)
- Ahrefs, Local SEO: https://ahrefs.com/seo/local-seo (euristica secondaria)
- Data consultazione: 2026-07-24.
