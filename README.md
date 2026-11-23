# Tim Wels — Engineering portfolio

Een complete, responsive portfolio-website gebaseerd op het CV van Tim Wels (oktober 2026). De website is in het Nederlands en werkt direct op **GitHub Pages**.

## Inhoud

- Homepage met portret en introductie
- Projecten: WDH Cylinders, Seratech (zaagmachine en orderpicksysteem), Engels Logistiek
- Over mij, opleidingen, stages en werkervaring
- Contactknop (opent e-mailprogramma) en knop om het e-mailadres te kopiëren
- Mobiele navigatie, subtiele scroll-animaties en toegankelijkheid voor toetsenbordgebruikers
- Schematische SVG-illustraties bij de projecten (geen echte projectfoto's)

## Bestanden

```text
index.html                  Website en inhoud
css/styles.css              Opmaak en responsive gedrag
js/main.js                  Mobiel menu, animaties en e-mail kopiëren
assets/portrait-000.png     Portret uit het aangeleverde CV
assets/project-wdh.svg      Schematische projectillustratie
assets/project-saw.svg      Schematische projectillustratie
assets/project-mast.svg     Schematische projectillustratie
assets/project-waste.svg    Schematische projectillustratie
assets/favicon.svg          Icoon in browsertab
assets/social-preview.svg   Deelafbeelding voor social links (SVG)
.nojekyll                   Zorgt dat GitHub Pages alle bestanden direct serveert
README.md                   Deze handleiding
```

## Website lokaal bekijken

**Snelste manier:** dubbelklik op `index.html`. De meeste functies werken meteen; de knop voor e-mail kopiëren vereist bij sommige browsers HTTPS of `localhost`.

**Aanbevolen manier:** open een terminal in deze map en start een lokale server met Python:

```bash
python -m http.server 8000
```

Ga vervolgens naar `http://localhost:8000`. Stop de server met `Ctrl+C`.

## Online zetten met GitHub Pages (zonder programmeerkennis)

1. Maak een gratis account op [GitHub](https://github.com) als je die nog niet hebt.
2. Klik op **New repository**.
3. Voor een persoonlijke site noem je de repository exact `JOUW-GITHUB-NAAM.github.io` (vervang `JOUW-GITHUB-NAAM` door je GitHub-gebruikersnaam). Voor een projectsite mag de repository anders heten, bijvoorbeeld `portfolio`.
4. Kies **Public** en klik op **Create repository**.
5. Pak de ZIP uit op je computer. Open de uitgepakte map.
6. Klik in de lege GitHub-repository op **uploading an existing file** (of via **Add file → Upload files**).
7. Sleep **alle bestanden én de mappen `assets`, `css` en `js`** naar GitHub. Zorg dat `index.html` direct in de hoofdmap van je repository staat, niet in een extra submap.
8. Klik op **Commit changes**.
9. Open in de repository **Settings → Pages**.
10. Selecteer bij **Build and deployment**: **Deploy from a branch**, branch **main**, folder **/(root)**. Klik op **Save**.
11. Wacht enkele minuten. GitHub laat op diezelfde pagina je website-URL zien.

Je adres is daarna:

- Persoonlijke repository: `https://JOUW-GITHUB-NAAM.github.io/`
- Repository met naam `portfolio`: `https://JOUW-GITHUB-NAAM.github.io/portfolio/`

De website gebruikt **relatieve bestandslocaties**, dus beide opties werken.

### Via Git uploaden (optioneel)

Maak eerst de lege repository aan op GitHub. Open daarna een terminal in deze map:

```bash
git init
git add .
git commit -m "Add engineering portfolio website"
git branch -M main
git remote add origin https://github.com/JOUW-GITHUB-NAAM/REPOSITORY-NAAM.git
git push -u origin main
```

Vervang de hoofdlettervelden door je echte GitHub-gebruikersnaam en repositorynaam. Volg daarna stap 9 t/m 11 hierboven.

## Website aanpassen

Open de bestanden in bijvoorbeeld [Visual Studio Code](https://code.visualstudio.com/).

| Wat wil je aanpassen? | Waar? |
| --- | --- |
| Titel, intro en teksten | `index.html` |
| Projectbeschrijvingen en jaartallen | `index.html`, sectie `id="projecten"` |
| Werkervaring en opleiding | `index.html`, sectie `id="ervaring"` |
| E-mailadres | In `index.html`, `js/main.js` én de `application/ld+json` gegevens in `index.html` |
| Kleuren | Variabelen bovenaan `css/styles.css` |
| Portret | Vervang `assets/portrait-000.png` en pas eventueel de verwijzing in `index.html` aan |
| Projectafbeeldingen | Vervang `assets/project-*.svg` door jouw echte foto's en wijzig de `src`-verwijzingen |

### Echte projectfoto's toevoegen

De huidige afbeeldingen zijn bewust **schematische illustraties**; ze tonen niet het werkelijke eindresultaat. Vervang ze bij voorkeur door je eigen foto's van CAD-modellen, prototypes of gerealiseerde systemen.

1. Plaats bijvoorbeeld `wdh-rolbok.jpg` in `assets/`.
2. Zoek in `index.html` bij het WDH-project naar `src="assets/project-wdh.svg"` en vervang dit door `src="assets/wdh-rolbok.jpg"`.
3. Verwijder bij dat project de tekst `SCHEMATISCHE ILLUSTRATIE` (de `span` met class `art-note`) en pas de beschrijving onder de projectkaarten aan als alle illustraties zijn vervangen.
4. Upload de gewijzigde bestanden naar GitHub en commit ze. GitHub Pages publiceert de wijziging automatisch.

**Tip:** gebruik foto's waarvoor je toestemming hebt van het bedrijf. Deel geen vertrouwelijke tekeningen of technische bedrijfsgegevens.

## Privacy

De site gebruikt je naam, ervaring, studie, projecten en het e-mailadres uit het aangeleverde CV. **Geboortedatum, volledig huisadres en telefoonnummer staan bewust niet op de publieke website.** Je originele CV is niet opgenomen in de ZIP, omdat daarin deze privégegevens staan. Wil je later een downloadknop voor je CV, maak dan eerst een openbare versie zonder gevoelige persoonsgegevens.

## Technische details

- **Dependencies:** geen; HTML, CSS, vanilla JavaScript en SVG.
- **Build command:** niet nodig.
- **Hosting:** iedere statische host; getest voor de mappenstructuur van GitHub Pages.
- **Contactformulier:** niet aanwezig (voor verzending zonder server wordt een `mailto:`-link gebruikt).
- **Aanpasbaarheid:** responsive voor desktop, tablet en telefoon.
- **Externe resources:** geen, dus ook geen externe lettertype- of trackingdiensten.

## Problemen oplossen

- **404 of lege pagina?** Controleer of `index.html` direct in de repository-hoofdmap staat en of GitHub Pages op `main` / `/(root)` staat ingesteld.
- **Geen afbeeldingen of styling?** Controleer of `assets/`, `css/` en `js/` exact met die schrijfwijze zijn geüpload. GitHub is hoofdlettergevoelig.
- **Website niet direct bijgewerkt?** De eerste publicatie of update kan enkele minuten duren. Ververs later opnieuw.
- **Knop 'Kopieer e-mailadres' doet niets lokaal?** Open de site via HTTPS (GitHub Pages) of `localhost`.

---

Deze eerste versie is gemaakt op basis van het aangeleverde CV. Controleer voor publicatie de inhoud en voeg waar mogelijk eigen projectfoto's en nieuwe projecten toe.
