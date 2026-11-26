# AI Agent vs. Automation — editorial draft

Koordinovaný redakčný balík pre Domsky Solutions. Pracovný názov: **AI Agent vs. Automation: What Should a Solo Business Use for Client Intake in 2027?**

**Stav: redakčný balík schválený vlastníkom 26. novembra 2026** správou „potvrdzujem redakčné balíky“, po dokončení nezávislého QA. Schválenie sa vzťahuje na odovzdaný redakčný balík; implementácia a publikovanie zatiaľ neboli zadané. Podklady sa kontrolovali k 26. novembru 2026. Rok 2027 označuje plánovací horizont, nie potvrdené budúce funkcie, ceny alebo výsledky testov.

Začnite [anglickým konceptom článku](04-article-draft.md), ktorý má približne 1 440 slov v hlavnom texte. Odporúča ponechať ručné spracovanie, keď postačuje, použiť pravidlá na predvídateľné kroky a agenta skúšať len tam, kde jeho príprava rozhodnutia stojí za kontrolu a údržbu.

## Obsah balíka

1. [Zadanie, rozsah a vlastníctvo súborov](00-goal-and-handoffs.md)
2. [Audit pokrytia a redakčný brief](01-coverage-and-brief.md)
3. [Evidencia zdrojov a cien](02-evidence-and-pricing.md)
4. [Tri reprodukovateľné scenáre testov](03-test-specifications.md) a [vstupné dáta](fixtures.json)
5. [Anglický koncept článku](04-article-draft.md) a [redakčné posúdenie](05-editorial-review.md)
6. [Vizuálny návrh](06-visual-brief.md)
7. [Plán implementácie](07-implementation-plan.md)
8. [Nezávislé QA a opätovná kontrola](08-qa-review.md)
9. [Záznam skutočných odovzdaní medzi agentmi](handoff-log.md)

## Skutočne použité delegované relácie

| Projektová rola / spustená relácia | Čo odovzdala |
| --- | --- |
| domsky-research / `/root/domsky_research` | Audit, brief, dátovanú evidenciu a cenové obmedzenia, tri scenáre a JSON; následne opravu testov podľa QA |
| domsky-editor / `/root/domsky_editor` | Anglický koncept a redakčné posúdenie s väzbou odporúčaní na evidenciu |
| domsky-design / `/root/domsky_design` | Vizuálny návrh obálky a jednej schémy schvaľovania; presné texty, rozmery, alt texty a mobilné usporiadanie |
| domsky-developer / `/root/domsky_developer` | Súbežnú kontrolu architektúry a po odovzdaní konceptu/dizajnu finálny plán implementácie s reálnymi cestami |
| domsky-qa / `/root/domsky_qa` | Nezávislé preverenie zdrojov, konzistencie a celého kandidáta; nález, opätovnú kontrolu opravy a finálne QA |

Tímové pokyny boli načítané z vetvy `codex/domsky-agent-team-v1`. Keďže tieto definície nie sú v lokálnom checkoute, použili sa delegované relácie s ich pokynmi; natívne projektové prednastavenia sa nepovažujú za lokálne nainštalované. Ďalších agentov tieto relácie nespúšťali. Jeden autor mal pridelený každý výstupný súbor.

## Kontroly a oprava

- Výskum a QA nezávisle otvorili primárne zdroje uvedené v evidencii. Presné checkout ceny, daň, vybraný plán a oprávnenia konkrétneho účtu sa neoverili; koncept preto neurčuje cenového víťaza ani budúce ceny.
- Koordinátor skontroloval aktuálny register a živú stránku Make vs. Zapier. Kontrola webu sa za produktový test nepovažuje.
- Výskum a QA samostatne skontrolovali JSON a fiktívnu politiku: tri dopyty, chýbajúce údaje, smerovanie, výnimky a intervaly 49/7 dní. Po oprave prešli aj kontroly povinných výstupov a kladnej/zápornej schvaľovacej vetvy.
- QA našiel jednu podstatnú medzeru P2: podmienku „najviac jedna správa“ mohol splniť aj nečinný systém. Pôvodný autor doplnil povinný návrh a presne jedno doručenie v úspešnom priebehu; zamietnuté/neplatné schválenie vyžaduje nulu. QA opravu nezávisle opätovne overil. Nezostáva nevyriešený podstatný nález pre režim editorial draft.
- Zdrojový checkout webu zostal čistý. Balík nepridal článok do registra, vetvu, PR, závislosť, asset ani zmenu publikovania.
- Záverečná kontrola koordinátora potvrdila všetkých 12 neprázdnych výstupov, funkčné lokálne odkazy a platný JSON s tromi navrhnutými, nevykonanými scenármi.

**Nevykonané:** všetkých 27 plánovaných základných produktových/modelových behov a ich poruchové variácie; meranie rýchlosti, kvality, úspor alebo skutočného účtu; generovanie grafiky; validácia assetov; build/npm/SEO testy novej implementácie; mobilné vykreslenie, zoom a asistenčné technológie. Pri koncepte sú uvedené ako budúce kontroly, nie ako úspešné výsledky.

## Rozhodnutia pred ďalšou fázou

Vlastník má neskôr potvrdiť finálny názov/rok/slug a dátum publikovania, spôsob verejného sprístupnenia príloh, reálny formulár/inbox/CRM a pravidlá práce s dátami, prijateľnú záťaž kontroly a prípadný produktový sandbox test. Pri cenovom výbere treba overiť konkrétny účet, oprávnenia a cenu pri nákupe. Implementácia a publikovanie vyžadujú samostatné zadanie a príslušné schválenie.

Evidencia tiež označuje samostatnú údržbovú tému pre starší Make vs. Zapier; jeho telo a historické dátumy sa v tejto úlohe nemenili.
