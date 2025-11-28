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
        createList(buildings);
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
let base;

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

            const nameLabel = document.getElementById("name_label");
            const typeLabel = document.getElementById("type_label");
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
            center: null
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

        if(selectedBuilding.name === "Base"){
            if(base) map.removeLayer(base);
            base = L.marker(e.latlng, {icon: icon}).addTo(map);
        } else if(selectedBuilding.name === "Missilesilo"){
            let siloMarker = L.marker(e.latlng, {icon: icon}).addTo(map);
            let silo = {
                name: selectedBuilding.name + " " + (silos.length + 1),
                marker: siloMarker,
                type: "attack"
            }
            silos.push(silo);
        } else if(selectedBuilding.name === "Airdefense"){
            let airdefenseMarker = L.marker(e.latlng, {icon: icon}).addTo(map);
            
            let airdefense = {
                name: selectedBuilding.name + " " + (airdefenses.length + 1),
                marker: airdefenseMarker,
                range: 100000,
                rangeCircle: null
            }
            airdefenses.push(airdefense);

            let airdefenseRange = L.circle(e.latlng, {
                color: 'blue',
                fillColor: '#0f28e5ff',
                fillOpacity: 0.3,
                radius: airdefense.range
            }).addTo(map);

            airdefense.rangeCircle = airdefenseRange;
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

        airdefenses.forEach((a) =>{
            let distanceToA = map.distance(a.marker.getLatLng(), missile.getLatLng());

            if(distanceToA < a.range){
                if(Math.random() < 0.02){
                    missile.remove();
                    missileDestroyed = true;
                }
            }
        })

        if(t < 1){
            requestAnimationFrame(step);
            
        } else {
            missile.remove();
            if(!missileDestroyed){
                target.radius.setStyle({ fillColor: 'black', color: 'black'});
                target.center.setStyle({fillcolor: 'black', color: 'black'});
                
                targets = targets.filter(t => t !== target);


                let distanceToBase = map.distance(base.getLatLng(), target.center.getLatLng());

                if(distanceToBase <= selectedMissile.radius){
                    gameOver.style.display = "flex";
                    gameOverOverlay.style.display = "flex";
                }
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
    createList(missiles);
    menuSelected = "missile";
})

menu_building.addEventListener('click', () => {
    createList(buildings);
    menuSelected = "building";
})

menu_silo.addEventListener('click', () => {
    createList(silos);
    menuSelected = "silo";
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


//<a href="https://www.flaticon.com/free-icons/missile" title="missile icons">Missile icons created by Nhor Phai - Flaticon</a>