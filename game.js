var map = L.map('map').setView([47.3769, 8.5417], 13);

        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //attribution: '© OpenStreetMap-Mitwirkende'
        }).addTo(map);

        
        // L.marker([47.29977627719577, 8.12394213320905]).addTo(map)
        //     .bindPopup("Oberkulm")
        //     .openPopup();

let missiles = [];
fetch("Data/missiles.json")
    .then(response => response.json())
    .then(data =>{
        missiles = data;
    })
    .catch(error => console.error(error));

let buildings = [];
fetch("Data/buildings.json")
    .then(response => response.json())
    .then(data => {
        buildings = data;
        handleClick("base");
    })
    .catch(error => console.error(error));




var BaseIcon = L.icon({
    iconUrl: 'Images/barracks.png',    
    iconSize: [20, 20],       
    iconAnchor: [10, 10],     
    popupAnchor: [0, -40]     
});

function createIcon(url, x, y){
    var building_icon = L.icon({
        iconUrl: url,
        iconSize: [x, y],
        iconAnchor: [(x/2), (y/2)]
    });
    return building_icon;
}


let silos = [];
let targets = [];
let airdefenses = [];
let selectedMissile;
let selectedBuilding;
let selectedSilo;
const viewer = document.getElementById("modelViewer");
const menu_missile = document.getElementById("menu_missile");
const menu_building = document.getElementById("menu_building");
const menu_silo = document.getElementById("menu_silo");
const type_menu = document.getElementById("type_menu");
const type_attack = document.getElementById("type_attack");
const type_defense = document.getElementById("type_defense");
const type_base = document.getElementById("type_base");
const missileList = document.getElementById("missileList");
const searchField = document.getElementById("searchField");
const siloBox = document.getElementById("selectedSilo");
const gameOverOverlay = document.getElementById("gameOverOverlay");
const gameOver = document.getElementById("gameOver");

let previewRadius;
let rangeCircle;
let selectedElement;
let previewCenter;
let target;
let menuSelected = "building";
let selectedType = "base";
let base;

// function separateBuildings(){
//     let separatedBuildings = [];
//     buildings.forEach((b) => {
//         if(b.)
//     })
// }

function selectVisuals(element, bg){
    element.style.backgroundColor = bg;
    element.style.color = "var(--bg-color)";
}

function deselectVisuals(element, bg){
    element.style.backgroundColor = bg;
    element.style.color = "var(--text-color)";
}

selectVisuals(menu_building, "var(--highlight)");
handleClick("base");





function hideElement(element){
    element.style.visibility = 'hidden';
}

function showElement(element){
    element.style.visibility = 'visible';
}

function createList(list){
    missileList.innerHTML = "";

    list.forEach ((element) => {

        const newLi = document.createElement("li");
        newLi.textContent = element.name;

        newLi.addEventListener('click', () =>{

            const name = document.getElementById("name_field");
            const type = document.getElementById("type_field");
            const range = document.getElementById("range_field");
            const damage = document.getElementById("damage_field");
            const radius = document.getElementById("radius_field");

            const rangeLabel = document.getElementById("range_label");
            const damageLabel = document.getElementById("damage_label");
            const radiusLabel = document.getElementById("radius_label");

            name.textContent = element.name;
            type.textContent = element.type;
            
            if(menuSelected === "missile"){
                selectedMissile = element;
                selectedBuilding = null;

                showElement(damage);
                showElement(radius);
                showElement(range);
                showElement(damageLabel);
                showElement(radiusLabel);
                showElement(rangeLabel);
                damage.textContent = element.warhead;
                radius.textContent = element.radius;
                range.textContent = element.range;

                createPreviewCircles();

            } else if(menuSelected === "building"){
                selectedBuilding = element;
                selectedMissile = null;

                hideElement(damage);
                hideElement(radius);
                hideElement(damageLabel);
                hideElement(radiusLabel);

                if(selectedBuilding.range){
                    showElement(rangeLabel);
                    showElement(range);
                    range.textContent = selectedBuilding.range;
                } else {
                    hideElement(rangeLabel);
                    hideElement(range);
                }
                

                deletePreviewCircles();

            } else if(menuSelected === "silo"){
                selectedSilo = element;
                siloBox.textContent = "Silo: " + selectedSilo.name;
                hideElement(range);
                hideElement(damage);
                hideElement(radius);
                hideElement(rangeLabel);
                hideElement(damageLabel);
                hideElement(radiusLabel);
            }

            if(element.src) viewer.src = element.src;

        });
        missileList.appendChild(newLi);
    });  
}

function createPreviewCircles(){
    if(previewRadius){
        map.removeLayer(previewRadius);                    
        previewRadius = null;
    }
    previewRadius = L.circle([0, 0], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.3,
        radius: selectedMissile.radius,
        weight: 1
    }).addTo(map);

    if(previewCenter){
        map.removeLayer(previewCenter);
        previewCenter = null;
    }
    previewCenter = L.circleMarker([0, 0],{
        color: 'red',
        fillColor: '#f03',
        radius: 2,
    }).addTo(map);

    
    if(rangeCircle){
        map.removeLayer(rangeCircle);
        
        rangeCircle = null;
    }

    if(selectedMissile && selectedSilo){
        rangeCircle = L.circle(selectedSilo.marker.getLatLng(), {
            color: 'green',
            fillColor: '#0fa11b',
            fillOpacity: 0.3,
            radius: selectedMissile.range
        }).addTo(map);
        
    }
    else {
        alert("Bitte zuerst ein Silo auswählen!");
    }
}

function deletePreviewCircles(){
    if(previewRadius){
        map.removeLayer(previewRadius);
        previewRadius = null;
    }
    if(previewCenter){
        map.removeLayer(previewCenter);
        previewCenter = null;
    }
    if(rangeCircle){
        map.removeLayer(rangeCircle);
        rangeCircle = null;
    }
}

function createCircles(position){
    if(previewRadius){
        radius = L.circle(position, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.3,
            radius: selectedMissile.radius,
            weight: 1
        }).addTo(map);
        target = {
            radius: radius,
            center: null,
            missile: selectedMissile
        }
        targets.push(target);
    }

    if(previewCenter){
        center = L.circle(position,{
            color: 'red',
            fillColor: '#f03',
            radius: 4,
            weight: 1
        }).addTo(map);

        target.center = center;
    }
    map.removeLayer(previewCenter);
    previewCenter = null;
    map.removeLayer(previewRadius);
    previewRadius = null;
}
// Wenn du auf die Karte klickst, füge einen Marker hinzu
map.on('click', function(e) {
    if(base != null){
        
        if(selectedMissile){
            let distance = map.distance(selectedSilo.marker.getLatLng(), e.latlng);

            if(distance <= selectedMissile.range){
                createCircles(e.latlng);
            }
        }
    }

    if(selectedBuilding){
        let icon = createIcon(selectedBuilding.icon, selectedBuilding.iconX, selectedBuilding.iconY);

        if(selectedBuilding.name === "Mainbase"){
            if(base) map.removeLayer(base);
            base = L.marker(e.latlng, {icon: icon}).addTo(map);

        } else if(selectedBuilding.name === "Missilesilo"){
            let siloMarker = L.marker(e.latlng, {icon: icon}).addTo(map)
            .bindPopup(selectedBuilding.name + " " + (silos.length + 1));
            let silo = {
                name: selectedBuilding.name + " " + (silos.length + 1),
                marker: siloMarker,
                type: "longrange"
            }
            silos.push(silo);
        } else if(selectedBuilding.name === "Shortrange Silo"){
            let marker = L.marker(e.latlng, {icon: icon}).addTo(map)
            .bindPopup(selectedBuilding.name + " " + (silos.length + 1));

            let silo = {
                name: selectedBuilding.name + " " + (silos.length + 1),
                marker:marker,
                type: "shortrange"
            }
            silos.push(silo);
        
        } else if(selectedBuilding.name === "Missiledefense"){
            let marker = L.marker(e.latlng, {icon: icon}).addTo(map)
            .bindPopup(selectedBuilding.name + " " + (airdefenses.length + 1));
            
            let missiledefense = {
                ...selectedBuilding,
                marker: marker,
                rangeCircle: null
            }

            let range = L.circle(e.latlng, {
                color: 'blue',
                fillColor: '#0f28e5ff',
                fillOpacity: 0.3,
                radius: missiledefense.range
            }).addTo(map);

            missiledefense.rangeCircle = range;
            missiledefense.name = selectedBuilding.name + " " + (airdefenses.length + 1);
            airdefenses.push(missiledefense);

        } else if(selectedBuilding.name === "Airdefense"){
            let marker = L.marker(e.latlng, {icon: icon}).addTo(map)
            .bindPopup(selectedBuilding.name + " " + (airdefenses.length + 1));

            let airdefense = {
                ...selectedBuilding,
                marker: marker,
                rangeCircle: null
            }

            let range = L.circle(e.latlng, {
                color: 'yellow',
                fillColor: 'yellow',
                fillOpacity: 0.3,
                radius: airdefense.range
            }).addTo(map);

            airdefense.name = selectedBuilding.name + " " + (airdefenses.length + 1);
            airdefense.rangeCircle = range;
            airdefenses.push(airdefense);
        }
        
    }
});

map.on('mousemove', (e) => {
    if(previewRadius){
        previewRadius.setStyle({opacity: 1, fillOpacity: 0.3});
        previewRadius.setLatLng(e.latlng);
    }
    if(previewCenter){
        previewCenter.setStyle({opacity: 1, fillOpacity: 0.3});
        previewCenter.setLatLng(e.latlng);
    }
});

map.on('mouseout', () => {
    if(previewRadius){
        hideMarker(previewRadius);
    }
    if(previewCenter){
        hideMarker(previewCenter);
    }
});

function hideMarker(element){
    element.setStyle({opacity: 0, fillOpacity: 0});
}

//lineare interpolation
function lerp(a, b, t){ return a + (b - a) * t; }
function launchMissile(start, target, durationSec = 3){
    const startLatLng = start.marker.getLatLng();
    const targetLatLng = target.center.getLatLng();

    let missileIcon = L.icon({iconUrl: 'Images/missile.png', iconSize:[20,20], iconAnchor:[10,10]});
    const missile = L.marker(startLatLng, { icon: missileIcon }).addTo(map);

    const startTime = performance.now();
    const durationMs = durationSec * 1000;

    let missileDestroyed = false;

    function step(now){
        const elapsed = now - startTime;

        //gibt einen Wert zwischen 0 und 1 zurück: 1 = am Ziel.
        const t = Math.min(1, elapsed / durationMs);

        const lat = lerp(startLatLng.lat, targetLatLng.lat, t);
        const lng = lerp(startLatLng.lng, targetLatLng.lng, t);
        missile.setLatLng([lat, lng]);

        for (let a of airdefenses)
        {
            let distanceToA = map.distance(a.marker.getLatLng(), missile.getLatLng());

            if(distanceToA < a.range){
                if(Math.random() < a.hitOdds) {
                    missile.remove();
                    missileDestroyed = true;
                    return;
                }
            }
        }

        if(t < 1){
            requestAnimationFrame(step);
            
        } else {
            missile.remove();
            if(!missileDestroyed){
                target.radius.setStyle({ fillColor: 'black', color: 'black'});
                target.center.setStyle({fillcolor: 'black', color: 'black'});
                
                targets = targets.filter(t => t !== target);


                let distanceToBase = map.distance(base.getLatLng(), target.center.getLatLng());
                
                if(distanceToBase <= target.missile.radius){
                    gameOver.style.display = "flex";
                    gameOverOverlay.style.display = "flex";
                }

                airdefenses = airdefenses.filter(a => {
                    let distanceToA = map.distance(a.marker.getLatLng(), target.center.getLatLng());
                    
                    if(distanceToA <= target.missile.radius){
                        map.removeLayer(a.marker);
                        map.removeLayer(a.rangeCircle);
                        return false;
                    }
                    return true;
                });

                silos = silos.filter(s => {
                    let distanceToS = map.distance(s.marker.getLatLng(), target.center.getLatLng());

                    if(distanceToS <= target.missile.radius){
                        map.removeLayer(s.marker);
                        selectedSilo = null;
                        return false;
                    }
                    return true;
                })

                getBuildings(target.center.getLatLng(), target.missile.radius)
                    .then(hitCount => {
                        alert("Zerstörte Gebäude: " + hitCount);

                        let money = hitCount * 10;

                        const moneyText = document.getElementById("money");

                        let currentMoney = parseInt(moneyText.textContent.replace(/\D/g, ''), 10) || 0;
                        let actualMoney = currentMoney + money;
                        moneyText.textContent = `Money: ${actualMoney}`;

                        
                    });
            
            }
        }
    }
    requestAnimationFrame(step);
    
}

const launchBtn = document.getElementById("launchBtn");
launchBtn.addEventListener('click', () =>{
    
    if (!target) {
        alert("Bitte zuerst ein Ziel auswählen!");
        return;
    }
    if(target){
        targets.forEach((t) => {
            launchMissile(selectedSilo, t, 3);
        })
    }
});


menu_missile.addEventListener('click', () => {

    menuSelected = "missile";
    type_menu.style.display = 'none';

    if(selectedSilo){
        if(selectedSilo.type === "shortrange"){
            const shortrangeMissiles = missiles.find(entry => entry.type === "shortrange").missiles;
            createList(shortrangeMissiles);
        } else {
            const icbms = missiles.find(entry => entry.type === "longrange").missiles;
            createList(icbms);
        }
        
    }
   
    selectVisuals(menu_missile, "var(--highlight)");
    deselectVisuals(menu_building, "var(--accent-green)");
    deselectVisuals(menu_silo, "var(--accent-green)");
})

menu_building.addEventListener('click', () => {
    createList(buildings);
    menuSelected = "building";
    type_menu.style.display = 'flex';
    handleClick("base");
    deselectVisuals(menu_missile, "var(--accent-green)");
    selectVisuals(menu_building, "var(--highlight)");
    deselectVisuals(menu_silo, "var(--accent-green)");
})

menu_silo.addEventListener('click', () => {
    createList(silos);
    menuSelected = "silo";
    type_menu.style.display = 'none';
    deselectVisuals(menu_missile, "var(--accent-green)");
    deselectVisuals(menu_building, "var(--accent-green)");
    selectVisuals(menu_silo, "var(--highlight)");
})

gameOver.addEventListener('click', () =>{
    location.reload();
})

searchField.addEventListener('input', () =>{
    const input = searchField.value.toLowerCase();
    const newList = [];

    if(menuSelected === "missile"){
        missiles.forEach((element) => {
            let name = element.name.toLowerCase();
            if(name.includes(input)){
                newList.push(element);
            }
        })
        createList(newList);
    }else if(menuSelected === "building"){
        buildings.forEach((element) =>{
            let name = element.name.toLowerCase();
            if(name.includes(input)){
                newList.push(element);
            }
        })
        createList(newList);
    }
})

document.querySelectorAll(".type").forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.type;

        handleClick(type);
    });
});

function handleClick(type){
    if(type === "base"){
        const bases = buildings
            .flatMap(category => category.buildings)
            .filter(building => building.type === "base");
        menuSelected = "building";
        createList(bases);

        selectVisuals(type_base, "var(--highlight)");
        deselectVisuals(type_attack, "var(--bg-color)");
        deselectVisuals(type_defense, "var(--bg-color)");

    } else if(type === "attack"){
        const attack = buildings
                .flatMap(category => category.buildings)
                .filter(building => building.type === "attack");
            menuSelected = "building";
            createList(attack);

            deselectVisuals(type_base, "var(--bg-color)");
            selectVisuals(type_attack, "var(--highlight)");
            deselectVisuals(type_defense, "var(--bg-color)");

    } else if(type === "defense"){
            const defenses = buildings
                .flatMap(category => category.buildings)
                .filter(building => building.type === "defense");
            menuSelected = "building";
            createList(defenses);

            deselectVisuals(type_base, "var(--bg-color)");
            deselectVisuals(type_attack, "var(--bg-color)");
            selectVisuals(type_defense, "var(--highlight)");

    }

}




function getBuildings(latlng, radius) {
    const overpassUrl = "https://overpass-api.de/api/interpreter";
    const query = `
        [out:json];
        (
            way["building"](around:${radius},${latlng.lat},${latlng.lng});
            relation["building"](around:${radius},${latlng.lat},${latlng.lng});
        );
        out count;
        `;

        return fetch(overpassUrl, {
            method: "POST",
            body: query
        })
        .then(res => res.json())
        .then(data => {
           const count = data.elements[0]?.tags?.total || 0;
           return count;
        });
}













































//<a href="https://www.flaticon.com/free-icons/missile" title="missile icons">Missile icons created by Nhor Phai - Flaticon</a>