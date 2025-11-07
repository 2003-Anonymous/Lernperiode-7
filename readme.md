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

Heute habe ich programmiert, dass unter der Karte die Stats der Rackete angezeigt werden. Zudem wird um die Base ein grüner Kreis erstellt. Dieser hat den Radius der Reichweite der Rackete. Wenn man jetzt über die Karte hovert, wird ein roter Kreis angezeigt, welcher die Zerstörung der Rackete anzeigt. Wenn man mit dem Mauszeiger die Karte verlässt, wird dieser Kreis unsichtbar und wieder sichtbar, sobald man den Mauszeiger wieder über die Karte bewegt. Innerhalb des grünen Kreises kann man den roten Kreis platzieren, jedoch ausserhalb nicht. Wenn man dann auf den Launchbutton klickt, wird ein Racketenicon bei der Base erstellt. Dieses fliegt dann zum markierten Ziel und verschwindet, wenn das Ziel erreicht wurde. Der Zielkreis wird dann schwarz. Es gibt aber noch ein kleines Problem und zwar wenn man mehrere Ziele gesetzt hat, wird nur das letzte angegriffen. Das mit der Animation war nicht so einfach und ich habe viel hilfe benötigt. Am Ende hat es mir aber viel gebracht und ich habe jetzt auch verstanden, wie der nächste Punkt der Rackete automatisch berrechnet wird und auch wie man die Dauer der Animation so steuert, dass sie unabhängig von der Leistung des Computers ist, sondern auf der vergangenen Dauter basiert.


## 14.11.25
- [ ] Programmieren, dass alle markierten Ziele in einer Liste gespeichert werden.
- [ ] Hinzufügen, dass alle Ziele aus der Liste gleichzeitig angegriffen werden.
- [ ] Einen Tab neben den Racketen erstellen, wo man Gebäude auswählen kann, welche man auf der Karte platzieren kann.
- [ ] Dort soll man am Anfang auch seine Base platzieren können.




