# Design/QA Fast Lane

Prototipo conservato dal workflow: confronta landmark, componenti, slot, interazioni e overflow nel DOM renderizzato su desktop/mobile.

```sh
npm ci
npm run install:browsers
npm run self-test
node scripts/run-batch.mjs fixtures/dqf-input.synthetic.json output/result.json
```

L'ultimo comando termina intenzionalmente con codice 2: la fixture include regressioni che richiedono valutazione diretta.
`visual_score` e sempre `n.a.`: il vecchio valore fisso non era una misura ed e stato rimosso. Il ruolo `direct` non costituisce un critique visivo.

Il sito deve risiedere in questa directory: il limite del mirror del prototipo e conservato e documentato. Non puntare a progetti reali dalla CI.
I codici 0/1/2/3/4/5 descrivono verificato, copertura fallita, promozione, tool assente, input invalido e non determinismo. Non tutti i problemi runtime sono convertiti in questi codici.
