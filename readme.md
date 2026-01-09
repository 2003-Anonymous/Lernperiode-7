# Lern-Periode 7

24.10. bis 19.12.2025

## Grob-Planung

1. OpenStreetMap
2. Racketen von einer Basis auf Städte schiessen.
3. Ich möchte lernen, wie ich Javascript mit HTML kombinieren und verändern kann.

## 24.10.25

- [ ] Arbeitspaket 1: Erstellen Sie mehrere Skizzen von Ihrem *front end*. Überlegen Sie sich auch, welche Elemente die Interaktion mit dem *back end* auslösen und wie sich die Oberfläche dadurch verändert. Bauen Sie auch Interaktionen ein, die *keinen* Aufruf der API benötigen, sondern sich im *client* bearbeiten lassen (sortieren, suchen etc.)
- [ ] Arbeitspaket 2: Setzen Sie in HTML und CSS Ihren Entwurf auf rudimentäre Weise um.
- [ ] Arbeitspaket 3: Schreiben Sie ersten JS-Code als *proof of concept* (bspw. Meldung bei Klick auf Knopf-Element)

Heute habe ich eine Skizze meiner verschiedenen HTML-Seiten erstellt und ich habe auch noch das grobe Gerüste der Start- und Hautpseite programmiert. Dann habe ich mit der API OpenStreetMap eine Karte und einen Marker auf meiner Webseite hinzugefügt. Die Karte kann man herein und herauszoomen und auch andere Länder anschauen. Dann habe ich noch eine kurze Liste mit 5 intercontinental ballistic missiles(ICBMs) als Beispiele geschrieben. Daraus werden dann in der Schleife darunter li-Elemente erstellt und auf der Seite angezeigt. Diese Schleife konnte ich von meiner letzten Seite wiederverwenden.

<img width="1402" height="2048" alt="image" src="https://github.com/user-attachments/assets/91a06b4b-54f5-44af-8b74-714c12d35c31" />


## 31.10.25

- [x] Die Webseite mit den richtigen grafisch anschaulicher gestalten.
- [x] Die Liste mit den ICBMs wird automatisch erstellt.
- [x] Programmieren, dass man Marker(Base) mit Rechtsklick auf der Karte hinzufügen kann.
- [x] Wenn man eine Rackete anklickt, soll sie unter der Karte mit den Stats angezeigt werden.

Heute habe ich die Webseite anschaulicher gestaltet. Die Farben und das Design ist noch nicht perfekt, aber es sieht schon gut aus. Dann habe ich programmiert, dass es die ICBM-Liste automatisch mit js erstellt. Jedem li-Element wird auch gleich noch ein click-Event angehängt. Wenn man dann eines dieser Elemente anklickt, wird unter der Karte ein 3D-Modell der Rackete angezeigt. Das mit den Stats funktioniert noch nicht und es gibt auch erst für eine Rackete ein Modell. Dann habe ich noch hinzugefügt, dass man mit Linksklick einen Marker auf der Karte erstellen kann. Mit Rechtsklick entsteht ein temporärer Marker und ein kleines Menü erscheint, wo man zwischen zwei Markertypen auswählen kann. Je nach auswahl wird der temporäre Marker mit einem anderen Icon ersetzt. Zum Schluss habe ich noch ausprobiert, ob ich kreise auf der Karte erstellen kann und das funktioniert sehr gut. Den Radius des Kreises kann man in Kilometern angeben, was sehr praktisch ist. Zudem hat der Kreis einen Rand und ist durchscheinend, sodass man die Karte darunter immer noch erkennen kann.


## 07.11.25
- [x] Programmieren, dass die Stats der Rackete unter der Karte angezeigt werden.
- [x] Wenn eine Rackete in der Liste ausgewählt wird, soll um die Base ein Kreis entstehen, der die Reichweite anzeigt.
- [x] Wenn man in diesem Bereich mit Linksklick einen Marker setzt, soll dort ein Kreis entstehen, der den Explosionsradius anzeigt.

Heute habe ich programmiert, dass unter der Karte die Stats der Rackete angezeigt werden. Zudem wird um die Base ein grüner Kreis erstellt. Dieser hat den Radius der Reichweite der Rackete. Wenn man jetzt über die Karte hovert, wird ein roter Kreis angezeigt, welcher die Zerstörung der Rackete anzeigt. Wenn man mit dem Mauszeiger die Karte verlässt, wird dieser Kreis unsichtbar und wieder sichtbar, sobald man den Mauszeiger wieder über die Karte bewegt. Innerhalb des grünen Kreises kann man den roten Kreis platzieren, jedoch ausserhalb nicht. Wenn man dann auf den Launchbutton klickt, wird ein Racketenicon bei der Base erstellt. Dieses fliegt dann zum markierten Ziel und verschwindet, wenn das Ziel erreicht wurde. Der Zielkreis wird dann schwarz. Es gibt aber noch ein kleines Problem und zwar wenn man mehrere Ziele gesetzt hat, wird nur das letzte angegriffen. Das mit der Animation war nicht so einfach und ich habe viel hilfe benötigt. Am Ende hat es mir aber viel gebracht und ich habe jetzt auch verstanden, wie der nächste Punkt der Rackete automatisch berrechnet wird und auch wie man die Dauer der Animation so steuert, dass sie unabhängig von der Leistung des Computers ist, sondern auf der vergangenen Dauer basiert.


## 14.11.25
- [x] Programmieren, dass alle markierten Ziele in einer Liste gespeichert werden.
- [x] Hinzufügen, dass alle Ziele aus der Liste gleichzeitig angegriffen werden.
- [x] Einen Tab neben den Racketen erstellen, wo man Gebäude auswählen kann, welche man auf der Karte platzieren kann.
- [x] Dort soll man am Anfang auch seine Base platzieren können.

Heute habe ich programmiert, dass alle Ziele, die man setzt, in einer Liste gespeichert und gleichzeitig angegriffen werden, wenn man den "Launch"-Button klickt. Dann habe ich noch ein Menu oberhalb der Suchleiste erstellt, wo man zwischen den Racketen und Gebäuden wechseln kann. Wenn man ein Gebäude auswählt, kann man es mit Linksklick der Karte hinzufügen. Dadurch musste ich die Funktion, welche die Liste erstellt, noch ein wenig abändern, dass selectedMissile und selectedBuilding richtig gesetzt werden und unter der Karte auch die richtigen Infos angezeigt werden. Zudem musste ich noch ergänzen, dass der rote Kreis nur erscheint, wenn eine Rackete ausgewählt ist und nicht auch, wenn man ein Gebäude platzieren will. Das mit dem Gebäudemarker hinzufügen war am Anfang ein wenig kompliziert, da ich an die vorhin genannten Dinge denken und einiges am Code umstellen musste. Jetzt funktioniert es aber einwandfrei. Zum schluss habe ich noch das Menu entfert, welches erscheint, wenn man die rechte Maustaste auf der Karte klickt. Dieses wird nun nicht mehr benötigt.


## 21.11.25
- [x] Die Racketen sollen von dem Racketensilo abgeschossen werden und nicht mehr von der Basis.
- [x] Eine Auswahl der platzierten Racketensilos hinzufügen.
- [x] In dieser Auswahl soll man auswählen können, von welchem Silo man schissen möchte.

Heute habe ich die Basis, welche vorher schon am Anfang da war, entfernt. Jetzt muss man zuerst eine Basis bauen. Man kann immer nur eine Basis bauen und diese ist notwendig, damit man überhaubt Racketen abfeuern kann. Dann habe ich noch hinzugefügt, dass die platzierten Silos in einer Liste neben dem Tab "Buildings" angezeigt werden. Diese Liste sind nummeriert. Wenn man ein Silo anklickt, ist es ausgewählt und man kann von diesem aus Racketen abschiessen. Die Reichweite der ausgewählten Rackete wird dann von dem ausgewählten Silo angezeigt. Zuerst wollte ich, dass bei allen Silos die Reichweite gleichzeitig angezeigt wird und die Rackete vom nächsten Silo abgeschossen wird. Ich habe mich dann aber umentschieden, weil ich vorhabe, verschiedene Silotypen einzufügen, von denen man verschiedene Racketen abschiessen kann, je nach Typ.

## 28.11.25

- [x] Sollte die Basis zerstört werden, also wenn sie im Explosionsradius liegt, soll das Spiel vorbei sein.
- [x] Hinzufügen, dass das ausgewählte Silo angezeigt wird(entweder HTML-Objekt mit Text oder optisch am Silo-Icon)
- [x] Ein weiteres Gebäude(Racketenabwehr) hinzufügen, welches eine Reichweite hat und auch Platziert werden kann.
- [x] Diese Racketenabwehr soll Racketen abschiessen können, welche in Reichweite sind.

Heute habe ich ein dunkles Overlay mit einem "Game over!" Button programmiert, welches angezeigt wird, wenn die Base im Explosionsradius liegt. Wenn man auf den Button clickt, wird die Seite neu geladen. Das ausgewählte Silo wird jetzt unten im Stats-Container unter der Karte angezeigt. Darunter befindet sich der Launch-Button. Dann habe ich noch eine Racketenabwehr programmiert, welche man auch platzieren kann. Die Reichweite wird durch einen blauen Kreis angezeigt. Wenn eine Rackete durch diesen Kreis fliegt, gibt es bei jedem Frame eine 2% Chance, dass die Rackete zerstört wird. Diese Wahrscheindlichkeit habe ich für jeden Frame gesetzt, damit es realistischer wirkt und die Rackete nicht einfach z.B. zu 50% beim betreten des blauen Kreises zerstört wird. Zum Schluss habe ich noch die Racketen- und Gebäude-Liste in ein JSON umgelagert. Deshalb kann es sein, dass nicht alles ganz richtig funktioniert, weil noch nicht alles im Code angepasst wurde.


## 12.12.25

- [x] Untermenus für die Gebäude einfügen, damit man die verschiedenen Gebäudeartein einzeln anzeigen kann
- [x] Weitere Silos und Luftabwehr hinzufügen.
- [x] Die verschiedenen Luftabwehr haben verschiedene Reichweiten und Abschusswahrscheindlichkeiten.
- [x] Die unterschiedlichen Silos sollen unterschiedliche Racketen schiessen können, bassierend auf dem Typ der Rackete.

Heute habe ich die Untermenus Base, Attack und Defense eingefügt. Auf diese kann man klicken und dann werden die dazugehörigen Gebäude angezeigt. Dann habe ich noch hinzugefügt, dass das Missilesilo nur bestimmte Racketen schiessen kann(die mit grosser Reichweite) und das Shortrange Silo kann nur solche mit kurzer Reichweite schiessen. Danach habe ich noch eine zweite Luftabwehr hinzugefügt, welche eine höhere Abschusswahrscheindlichkeit hat, dafür  nicht eine so grosse Reichweite. Zudem habe ich noch programmiert, dass wenn eine Luftabwehr oder ein Silo im Explosionsradius liegt, dass diese dann zerstört werden. Als ich damit fertig war, habe ich noch eine Währung hinzugefügt, welche oberhalb der Karte angezeigt wird. Wenn man eine Rackete abschiesst, werden im Explosionsbereich alle Gebäude gezählt. Das funktioniert mithilfe von der Overpass-API. Pro zerstörtes Gebäude bekommt man 10 Geld. Es dauert aber bei grösseren Explosionen in Städten ein wenig, da es dort sehr viele Gebäude hat. Als ich die Zarbombe an Tokio getestet habe, habe ich 0 Gebäude nach langer Zeit bekommen. Ansonsten funktioniert es aber sehr gut. Zuerst habe ich es so gemacht, dass ich die Gebäude zurückbekomme und nicht nur die Anzahl. Das habe ich dann aber umgeändert, weil die Wartezeit sonst viel zu lang wäre und die Seite auch ein paar mal abgestürtzt ist.


## 19.12.25

- [x] Einen "Skiltree" erstellen
- [x] Stufen im Skilltree können mit Geld gekauft werden
- [x] Racketen müssen so zuerst über den Skilltree freigeschaltet werden.

Heute habe ich für beide Siloarten eine Art Skilltree als neues html hinzugefügt. Dort gibt es verschiedene Stufen, welche man der Reihe nach mit Geld kaufen muss. Je nach Stufe werden neue Racketen Freigeschaltet. Das funktioniert aber noch nicht. Diesen Skilltree zu erstellen hat unerwartet lange gedauert, bis ich es hinbekommen habe, dass das locked-overlay ausgeblendet wird. Dafür habe ich gelernt, dass man mit der classList z.B. hinten an eine  Klasse active dranhängen kann und so ihr aussehen mithilfe von css verändern kann. Das ist sehr praktisch und hätte mir bei anderen Projekten sehr geholfen. Mit dieser Technik werde ich auch den Skilltree noch in mein anderes html einfügen, weil so wie es jetzt ist, werden alle Marker zurückgesetzt, wenn man wieder zurück geht. Das aktuelle Geld wird im LocalStorage gespeichert und im js vom Skilltree dann abgerufen und nach dem Kauf wieder hochgeladen. Wenn ich dann beide html-Seiten kombiniert habe, kann ich das vielleicht auf eine andere Art machen, aber das war gerade die einfachste, die ich gefunden habe. Zuerst habe ich es noch mit window. probiert, weil ich das zuerst gefunden habe. Das hat aber nicht funktioniert.


## Ferien
In den Ferien ist einiges geschehen. Ich habe die beiden Skilltrees fertig gestellt. Jede Stufe schaltet eine neue Rackete frei und manchmal auch ein Gebäude. Wann etwas freigeschaltet wird, entscheidet die Stage des Objektes. Zudem habe ich die Skilltrees jetzt in ein anderes HTML File eingefügt und sie werden dynamisch geladen, damit nicht alle Marker verschwinden, wenn man die Seite neu lädt. Ich habe es so gemacht, dass die Anzahl an freigeschalteten Dingen in einer einzigen Zahl gespeichert wird. Das erleichtert das speichern eines Spielstandes enorm. Da wir jetzt gerade das Backend in der Schule anschauen, habe ich auch ein eigenes Backend für den MissileSimulator geschrieben. Dort werden alle Racketen, Gebäude, User und später auch die Spielstände gespeichert. Um die Änderungen dauerhaft zu machen, habe ich das Backend mit einer SQLight-Datenbank verbunden. Das Backend zu programmieren war gar nicht so schwer, da wir einen guten Kurs von der Schule zur Verfügung gestellt bekommen haben. Das schwierigste war, die Daten bei der Get-Methode im richtigen Format zurückzugeben, also im selben Format, wie davor mein JSON war, damit ich nicht alles abändern muss. Das habe ich dann mit einer Sortierung nach Typ gelöst. Bis jetzt hat es immer funktioniert. Damit später der Spielstand gespeichert werden kann, braucht es noch ein Login. Genau das habe ich auch noch programmiert und mit meiner API verbunden. Ich habe im Game noch oben rechts einen Menubutton hinzugefügt, welcher nur angezeigt wird, wenn man als Admin angemeldet ist. Dort ist für später die Verwaltung der Konten(auch das Ansehen von Passwörtern und vom Spielstand) geplant. Ich hatte auch noch die Idee, hinzuzufügen, dass man dort im Menu die Stats der Racketen und die Stage, also wann etwas freigeschaltet wird, anpassen kann.

## 09.01.2026
Heute habe ich meine API noch weiter ausgebaut. Ich habe begonnen, die SaveGame-Logik zu programmieren. Im moment wird aber noch nichts gespeichert, ich habe einfach die Klasse SaveGame und den SaveController erstellt und auch schon grob alle Http-Methoden implementiert. Dafür habe ich mithilfe von Electron meine Webseite in eine Desktop-App verwandelt. Mehr dazu in Lernperiode-8.

## 16.01.2026

- [ ] Das Speichern des Spielstandes fertig programmieren.
- [ ] Programmieren, das nach dem Login der zum User gespeicherte Spielstand geladen wird.


































