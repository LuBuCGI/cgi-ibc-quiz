# CGI IBC Quiz - finale lokale Kiosk-Version

## Start auf Windows
1. ZIP vollständig entpacken.
2. Für den normalen Messestand-Betrieb `Start-Quiz.bat` per Doppelklick ausführen.
3. Die App öffnet sich im Browser im Vollbild-/App-Modus.

Für Auswertung, Export und Analytics bitte `Start-Admin.bat` per Doppelklick starten. Alternativ kann im laufenden Quiz mit `Strg + Shift + A` der Adminmodus eingeblendet werden.

Falls der Start nicht funktioniert, kann alternativ `index.html` direkt im Browser geöffnet werden.

## Teilnahmebedingungen und Datenschutz
Das Dokument `pdf/terms-privacy-de.pdf` ist lokal im Projekt enthalten und wird in der App verlinkt:
- auf der Start-/Themenauswahlseite im Hinweis zum Gewinnspiel
- im Quiz-Header
- in der Fußzeile
- im Teilnahmeformular

## Gewinnspiel-Logik
- Teilnahme erst ab 18 Jahren.
- Mit Absenden des Teilnahmeformulars bestätigt die teilnehmende Person, mindestens 18 Jahre alt zu sein.
- Es wird eines von vier Themen gewählt.
- Zum gewählten Thema müssen drei Fragen korrekt beantwortet werden.
- Danach wird das Teilnahmeformular freigeschaltet.
- Alle Formularfelder sind Pflichtfelder: Vorname, Nachname, Firma und E-Mail.

## Lokale Speicherung
Die Gewinnspieldaten werden lokal im Browser des jeweiligen Geräts gespeichert (`localStorage`). Es findet keine automatische Übertragung an einen Server statt.

Gespeichert werden u. a.:
- Zeitpunkt
- Vorname / Nachname
- Firma
- E-Mail
- gewähltes Thema
- ob die AI-PDF geöffnet wurde
- Anzahl falscher Antworten vor Abschluss
- Akzeptanz der Teilnahmebedingungen / Datenschutzhinweise
- 18+-Bestätigung

## Export
Im Gewinnspielformular und im Adminbereich kann ein Excel-Export erzeugt werden.
Der Export enthält zwei Tabellenblätter:
- `Teilnahmen`
- `Analytics`

Zusätzlich gibt es im Adminbereich einen CSV-Export.

## Teilnehmeransicht und Adminansicht
Die Teilnehmeransicht ist der Standardmodus. Dort werden Hinweise zur lokalen Speicherung, Exportfunktionen und Analytics-Schaltflächen ausgeblendet.

Die Adminansicht wird über `Start-Admin.bat`, über `index.html?admin=1` oder über `Strg + Shift + A` aktiviert. Erst dann erscheinen der Button `Admin / Analytics`, Exportfunktionen und technische Hinweise.

Der Adminbereich zeigt:
- gespeicherte Teilnahmen
- gestartete Quizze
- abgeschlossene Quizze
- AI-PDF-Aufrufe
- Themeninteresse
- häufig falsch beantwortete Fragen

## Offline-Nutzung
Die App kann offline genutzt werden, sofern der komplette Ordner lokal auf dem Gerät liegt. PDFs, Bilder, Lead-Erfassung und Export funktionieren lokal.


## v1.1 Änderungen
- Finale Fragen aus „Fragen IBC Gewinnspiel.docx“ für alle vier Themen.
- Neue Abschlussseite „Geschafft! Deine Antwort ist im Lostopf.“ mit Lostopf-Illustration.
- Newsletter-CTA und separate Newsletter-Seite mit E-Mail-Pflichtfeld und verpflichtender Datenschutzbestätigung.
- Newsletter-Interesse wird in der Offline-Version lokal im Browser gespeichert.


## Bilingual version
`index.html` is now the language selection page. German quiz: `de.html`; English quiz: `en.html`. `Start-Quiz.bat` opens the language selection. `Start-Admin.bat` opens the German admin view.
