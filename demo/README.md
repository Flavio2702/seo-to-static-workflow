# Segui la demo

1. [Brief iniziale](01_INPUT/CLIENT_BRIEF.md): attivita e localita inventate.
2. [Step SEO](03_SEO_GEO/01_BRIEF_NORMALIZER.md): segui i sette file numerati.
3. [Strategia](03_SEO_GEO/SITE_STRATEGY.md) e [contratto consumato dalla build](strategy.json).
4. [Decisioni visuali](04_DESIGN/DESIGN.md).
5. [Sito navigabile](https://flavio2702.github.io/seo-to-static-workflow/site/).
6. [Matrice di tracciabilita](TRACEABILITY.md).

Le procedure SEO e il copy sono eseguiti dall’assistente su dati inventati e
congelati. La ricerca esterna e simulata come ipotesi, non come risultati SERP.
Il comando di riproduzione esegue davvero il render dei quattro HTML, CSS, sitemap
e JSON-LD e confronta il risultato con i file pubblicati. Non chiama un modello.

```sh
python scripts/demo.py --check
python -m http.server 8080 --bind 127.0.0.1 --directory demo/site
```

Apri http://127.0.0.1:8080/. Per rigenerare in runtime ignorato: `python scripts/demo.py`.
La demo non supera i gate di consegna cliente: vedi [limiti](../docs/LIMITI.md).
