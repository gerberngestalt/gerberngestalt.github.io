# gerberngestalt – Hinweise zur manuellen Bearbeitung

Live-Website: https://gerberngestalt.github.io/

## Welche Datei ist wofür zuständig?

| Datei / Ordner | Verwendung | Normalerweise bearbeiten? |
| --- | --- | --- |
| `content.js` | Galerie-Bilder, Bildüberschriften, Übersetzungen, NETZWERK und rechtliche Texte | **Ja, für Inhalte** |
| `images/` | Fotos, Illustrationen und Bilder für die Slides | Ja, für Bildwechsel |
| `index.html` | Seitenstruktur, Menüpunkte, Titel, Einbindung der Dateien | Nur für strukturelle Änderungen |
| `style.css` | Typografie, Einrückungen, Abstände, Slides, Hoch-/Querformat | Ja, vorsichtig |
| `script.js` | Klicks, Touch, Wischen, Maps-Karten, Sprachwechsel, Scrollen | Nur für Interaktionen |
| `.nojekyll` | Konfigurationsdatei für GitHub Pages | **Nicht ändern** |

> Für neue Texte und Bilddateien **zuerst `content.js`** öffnen; nicht im langen `script.js` suchen.

## Bilder in einer Galerie ändern

In `content.js` ist jede Galerie ein eigenes Objekt. Die Galerien heissen:

`start, about, angebot, praktisches, gestalt, miniBlog, kontakt`

Im Feld `images: [ ... ]` die entsprechenden Dateinamen ändern oder einen weiteren Eintrag ergänzen. Beispiel für einen Bild-Eintrag:

```js
images: [
  'images/about/01_passfoto.jpg'
]
```

Bei **gerberngestalt** sind Bildpfade in `content.js` vollständig, z. B. `images/about/01_passfoto.jpg`. Eine englische Bildversion kann als `{ image: 'images/gestalt/bild.jpg', image_en: 'images/gestalt/bild_en.jpg' }` angegeben werden. Für einzelne START-Bilder gibt es auch `image_dark`.

Die Galerie-Logik unterstützt **höchstens 11 Slides** je Galerie. Nach dem Hinzufügen einer Bilddatei prüfen, dass die Schreibweise und die Dateiendung exakt stimmen. Englische Varianten sind optional; wenn keine verfügbar ist, bleibt das Standardbild sichtbar.

## NETZWERK pflegen

Am Ende von `content.js` steht das Array `network: [ ... ]`. Seit der Bereinigung steht **jede Information auf einer eigenen Zeile**:

```js
{
  label: "Miguel Guldimann, Solothurn",
  url: "https://www.zenmeditation.ch/",
  display: "www.zenmeditation.ch"
}
```

- `label` ist der sichtbare Name; `display` die angezeigte Webadresse.
- `url` ist das Linkziel.
- Optional sind `label_en`, `display_en`, `url_en` und gegebenenfalls `autoWrap`.
- Zum Ergänzen einen vollständigen Objektblock kopieren und zwischen den Objekten das Komma belassen.

## Weitere Inhalte

Auf dieser Website gibt es keine PAST-EVENTS-Liste. Texte für ÜBER MICH/ANGEBOT/GESTALT usw. stecken teilweise direkt in den Bilddateien, nicht in `content.js`.

`legal.imprint` und `legal.privacy` enthalten IMPRESSUM und DATENSCHUTZ; `imprint_en` / `privacy_en` die englischen Fassungen. Diese Texte bitte vor einer öffentlichen Freigabe selbst rechtlich prüfen.

Die **zweite und dritte KONTAKT-Slide** öffnen aktuell Google Maps (Adresse und Fussweg). Ihre Ziele findest du in `script.js` unter `contactMapLinks`. Andere Slides blättern beim Klick oder Tap weiter. Instagram- und E-Mail-Klickflächen der ersten KONTAKT-Slide werden ebenfalls in `script.js` verwaltet.

## Schrift, Abstände und Geräteansichten

`style.css` ist ein historisch gewachsenes Stylesheet mit verschiedenen **responsive Regeln**. Es wurde lesbar formatiert; die aktive Kaskaden-Reihenfolge blieb bewusst erhalten, damit die bestehende Darstellung nicht kaputtgeht. Deshalb stehen manche Selektoren mehrmals im Dokument. **Spätere Regeln und `!important` haben Vorrang.**

Beim Suchen auf diese Stichwörter achten:

- `--type-size`, `--type-leading` – Schriftgrösse und Zeilenhöhe.
- `.section-title` – Überschriften der Slides und Listen.
- `.window-group`, `.carousel`, `.dots` – Bildbreiten und Navigationspunkte.
- `#netzwerk`, `.network-links`, `.legal-links` – NETZWERK und Rechtstexte.
- `#past-events` – Termine, nur bei gerbern drei.
- `@media` – Formatwechsel, besonders `max-width:650px`, `orientation:portrait`, `orientation:landscape`, `pointer:coarse`.

**Wichtig:** Wenn du CSS änderst, die normale Desktopansicht, schmale Desktopfenster, Handy-Hochformat, Handy-Querformat und den Dunkelmodus kontrollieren. Unbedachtes Verschieben bestehender CSS-Blöcke kann ihr Verhalten verändern.

## Änderungen veröffentlichen

1. Datei im GitHub-Repository öffnen und auf das **Stift-Symbol** klicken.
2. Text oder Bildpfad ändern; danach über **Commit changes** speichern.
3. Die GitHub-Pages-Veröffentlichung unter **Actions** abwarten.
4. Falls der Browser weiterhin die alte CSS-/JavaScript-Version zeigt: In `index.html` die Versionskennung nach `?v=` für die betroffene Datei ändern (z. B. `style.css?v=meine-aenderung-2`) und neu laden.

In `index.html` steht derzeit ein `<meta name="robots" content="noindex">` mit einem Hinweis auf die Zeit vor dem öffentlichen Launch. Wenn Suchmaschinen die Seite künftig finden sollen, musst du diesen Eintrag **bewusst** entfernen oder ändern. Er wurde bei der Bereinigung **nicht** automatisch verändert.

## Checkliste nach eigenen Änderungen

- Funktionieren alle Menüpunkte sowie Deutsch/Englisch?
- Stimmen Bildformate, Slide-Punkte, Klick/Tap und Wischen?
- Öffnen die zwei KONTAKT-Karten die richtigen Google-Maps-Seiten?
- Bleiben NETZWERK, PAST EVENTS und Rechtstexte auf Desktop und Handy gut lesbar?
- Bleibt der geöffnete Bereich beim Ändern der Browserfenstergrösse stabil?

Frühere Versionen findest du jederzeit in der **Git-Commit-Historie**. Gelöschte alte Dateien sind dort ebenfalls weiterhin abrufbar.
