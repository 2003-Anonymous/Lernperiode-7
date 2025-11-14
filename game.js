var map = L.map('map').setView([47.3769, 8.5417], 13);

        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //attribution: '© OpenStreetMap-Mitwirkende'
        }).addTo(map);

        
        // L.marker([47.29977627719577, 8.12394213320905]).addTo(map)
        //     .bindPopup("Oberkulm")
        //     .openPopup();

const missiles = [
    { 
        name: "ATACMS (USA)",
        type: "cruise",
        warhead: 230,
        radius: 300,
        range: 300000,
        src: "Models/fattah-1.glb"
    },
    { 
        name: "SCUD-B (UdSSR)",
        type: "ballistic",
        warhead: 985,
        radius: 750,
        range: 300000
    },
    { 
        name: "Iskander-M (Russland)",
        type: "tactical ballistic",
        warhead: 600,
        radius: 450,
        range: 500000
    },
    { 
        name: "Tomahawk (USA)",
        type: "cruise missile",
        warhead: 450,
        radius: 400,
        range: 1600000
    },
    {
        name: "DF-21 (China)",
        type: "middlerange ballistic",
        warhead: 600,
        radius: 1500,
        range: 1500000
    },
    {
        name: "AN602",
        type: "thermobaric",
        warhead: 57000,
        radius: 35000,
        range: 1000000
    },
    {
        name: "RS-28 Sarmat (Russland)",
        type: "dreistufige Feststoffrakete",
        warhead: 10000,
        radius: 5000,
        range: 18000000
    }
]

const buildings = [
    {
        name: "Base",
        type: "base",
        icon: "",
    },
    {
        name: "Missilesilo",
        type: "attack",
        icon: 'Images/MissileSilo.png'
    },
    {
        name: "Airdefense",
        type: "defense",
        icon: ""
    }
]

let targets = [];

var BaseIcon = L.icon({
    iconUrl: 'Images/barracks.png',    
    iconSize: [20, 20],       
    iconAnchor: [10, 10],     
    popupAnchor: [0, -40]     
});

function createIcon(url){
    var building_icon = L.icon({
        iconUrl: url,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
    return building_icon;
}


let base = L.marker([47.3769, 8.5417], { icon: BaseIcon })
    .addTo(map)
    .bindPopup("Base");

let selectedMissile;
let selectedBuilding;
const viewer = document.getElementById("modelViewer");
const menu_missile = document.getElementById("menu_missile");
const menu_building = document.getElementById("menu_building");
const missileList = document.getElementById("missileList");
let previewRadius;
let rangeCircle;
let selectedElement;
let previewCenter;
let target;

function createList(list){
    missileList.innerHTML = "";

    list.forEach ((element) => {
        const newLi = document.createElement("li");
        newLi.textContent = element.name;
        newLi.addEventListener('click', () =>{
            
            
            
            
            const name = document.getElementById("name_field");
            const type = document.getElementById("type_field");
            const damage = document.getElementById("damage_field");
            const radius = document.getElementById("radius_field");
            const range = document.getElementById("range_field");

            name.textContent = element.name;
            type.textContent = element.type;
            
            if(list === missiles){
                selectedMissile = element;
                selectedBuilding = null;

                damage.style.display = 'block';
                radius.style.display = 'block';
                range.style.display = 'block';
                damage.textContent = element.warhead;
                radius.textContent = element.radius;
                range.textContent = element.range;

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
                rangeCircle = L.circle(base.getLatLng(), {
                    color: 'green',
                    fillColor: '#0fa11b',
                    fillOpacity: 0.3,
                    radius: selectedMissile.range
                }).addTo(map);
            } else if(list === buildings){
                selectedBuilding = element;
                selectedMissile = null;

                damage.style.display = 'none';
                radius.style.display = 'none';
                range.style.display = 'none';

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

            if(element.src) viewer.src = element.src;


            
        });
        missileList.appendChild(newLi);
    });  
}


// L.circle([47.3769, 8.5417], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.3,
//     radius: 2500
// }).addTo(map).bindPopup("25 km Umkreis von Zürich");








// Wenn du auf die Karte klickst, füge einen Marker hinzu
map.on('click', function(e) {
    let distance = map.distance(base.getLatLng(), e.latlng);
    if(selectedMissile){
        if(distance < selectedMissile.range){

        if(previewRadius){
            let radius = L.circle(e.latlng, {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.3,
                radius: selectedMissile.radius,
                weight: 1
            }).addTo(map);
            target = radius;
            targets.push(target);
        }
    
        if(previewCenter){
            L.circle(e.latlng,{
                color: 'red',
                fillColor: '#f03',
                radius: 4,
                weight: 1
            }).addTo(map);
        }

        map.removeLayer(previewCenter);
        previewCenter = null;
        map.removeLayer(previewRadius);
        previewRadius = null;
    }
    }

    if(selectedBuilding){
        let icon = createIcon(selectedBuilding.icon)
        L.marker(e.latlng, {icon: icon}).addTo(map);
    }
});







let tempMarker = "";
map.on('contextmenu', function(e){
    const menu = document.getElementById("contextMenu");
    menu.style.display = 'block';

    
    //Mauskoordinaten, wird nicht vom Zoom beeinflusst
    menu.style.left = e.originalEvent.clientX + 5 + 'px';
    menu.style.top = e.originalEvent.clientY + 5 + 'px';

    menu.dataset.lat = e.latlng.lat;
    menu.dataset.lng = e.latlng.lng;

    tempMarker = L.marker(e.latlng).addTo(map);
});

document.querySelectorAll('#contextMenu .menu-item').forEach(item => {
    item.addEventListener('click', () => {
        const menu = document.getElementById('contextMenu');
        const lat = parseFloat(menu.dataset.lat);
        const lng = parseFloat(menu.dataset.lng);

        const type = item.dataset.type;

        let icon;
        if(type === 'base'){
            icon = L.icon({iconUrl: 'Images/barracks.png', iconSize:[20,20], iconAnchor:[10,10]});
        }
        else if(type === 'camp')
        {
            icon = L.icon({iconUrl: 'Images/target.png', iconSize:[20,20], iconAnchor:[10,10]});
        }

        L.marker([lat, lng], {icon: icon}).addTo(map);

        map.removeLayer(tempMarker);
        menu.style.display = 'none';
    })
})


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
        previewRadius.setStyle({opacity: 0, fillOpacity: 0});
    }
    if(previewCenter){
        previewCenter.setStyle({opacity: 0, fillOpacity: 0});
    }
});

//lineare interpolation
function lerp(a, b, t){ return a + (b - a) * t; }
function launchMissile(start, target, durationSec = 3){
    const startLatLng = start.getLatLng();
    const targetLatLng = target.getLatLng();

    let missileIcon = L.icon({iconUrl: 'Images/missile.png', iconSize:[20,20], iconAnchor:[10,10]});
    const missile = L.marker(startLatLng, { icon: missileIcon }).addTo(map);

    const startTime = performance.now();
    const durationMs = durationSec * 1000;

    function step(now){
        const elapsed = now - startTime;

        //gibt einen Wert zwischen 0 und 1 zurück: 1 = am Ziel.
        const t = Math.min(1, elapsed / durationMs);

        const lat = lerp(startLatLng.lat, targetLatLng.lat, t);
        const lng = lerp(startLatLng.lng, targetLatLng.lng, t);
        missile.setLatLng([lat, lng]);

        if(t < 1){
            requestAnimationFrame(step);
        } else {
            missile.remove();
            target.setStyle({ fillColor: 'black', color: 'black'});
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
            launchMissile(base, t, 3);
        })
        targets = [];
    }
    
});

createList(missiles);

menu_missile.addEventListener('click', () => {
    createList(missiles);
})

menu_building.addEventListener('click', () => {
    createList(buildings);
})

// function menu_building(){
//     createList(buildings);
// }
//<a href="https://www.flaticon.com/free-icons/missile" title="missile icons">Missile icons created by Nhor Phai - Flaticon</a>