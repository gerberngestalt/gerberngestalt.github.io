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

> Neue Bilder werden jetzt **automatisch aus den sieben nummerierten Bildordnern eingelesen**. Für Übersetzungen, NETZWERK und rechtliche Texte weiterhin `content.js` verwenden.

## Bilder in einer Galerie ändern

Die sieben Galerien werden automatisch synchronisiert. Du musst die `images`-Arrays in `content.js` **nicht mehr manuell bearbeiten**.

1. Im passenden Ordner unter `images/` Bilder hochladen, ersetzen, umbenennen oder löschen und den GitHub-Commit speichern.
2. GitHub Actions startet **Sync numbered gallery images** automatisch. Das Skript erfasst die Dateien nach Nummer (`01_`, `02_`, `03_` usw.) und übernimmt ihre tatsächliche Endung (`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.avif`).
3. Bei Änderungen schreibt die Action die passenden vollständigen Dateipfade in `content.js`, aktualisiert den Cache-Verweis in `index.html` und fordert einen GitHub-Pages-Neuaufbau an.

Die Galerien sind `start`, `about`, `angebot`, `praktisches`, `gestalt`, `miniBlog` (Ordner **`images/miniblog/`**) und `kontakt`. `images/stones/` enthält die Farbakzente und gehört nicht zu den Galerien.

Sprach- und Gerätevarianten wie `01_bild_en.png`, `01_bild_phone.png`, `01_bild_dark.png` sind **keine zusätzlichen Slides**. Für `_dark`/`_phone` bitte die Dateiendung des Basisbilds verwenden; abweichende Dateiformate bei `_en` werden ausdrücklich in `content.js` referenziert. Existiert eine englische Variante nicht, wird das Basisbild verwendet.

**Maximal 12 Slides pro Galerie.** Mehr Bilder oder zwei Originaldateien für dasselbe Motiv in verschiedenen Formaten führen zu einer Fehlermeldung statt einer unbemerkten falschen Darstellung. Doppelte Nummern werden als Warnung gemeldet; bitte pro Bildmotiv eine eindeutige Nummer verwenden.

Die Technik liegt in `.github/workflows/sync-gallery-images.yml` und `scripts/sync-gallery-images.mjs`. Unter **Actions → Sync numbered gallery images** kannst du den automatischen Lauf prüfen oder optional manuell starten. Nur die Bildlisten und die Cache-Version werden automatisch verändert; NETZWERK, Texte und übrige Funktionen bleiben erhalten.

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
