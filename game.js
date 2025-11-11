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
    }
]

var BaseIcon = L.icon({
    iconUrl: 'Images/barracks.png',    
    iconSize: [20, 20],       
    iconAnchor: [10, 10],     
    popupAnchor: [0, -40]     
});


let base = L.marker([47.3769, 8.5417], { icon: BaseIcon })
    .addTo(map)
    .bindPopup("Base");

let selectedMissile;
const viewer = document.getElementById("modelViewer");
let previewRadius;
let rangeCircle;
let selectedElement;
let previewCenter;
let target;

function createList(missiles){
    const missileList = document.getElementById("missileList");
    missileList.innerHTML = "";

    missiles.forEach ((element) => {
        const newLi = document.createElement("li");
        newLi.textContent = element.name;
        newLi.addEventListener('click', () =>{
            selectedMissile = element;
            
            const name = document.getElementById("name_field");
            const type = document.getElementById("type_field");
            const damage = document.getElementById("damage_field");
            const radius = document.getElementById("radius_field");
            const range = document.getElementById("range_field");

            name.textContent = element.name;
            type.textContent = element.type;
            damage.textContent = element.warhead;
            radius.textContent = element.radius;
            range.textContent = element.range;

            viewer.src = element.src;

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
        launchMissile(base, target, 3);
    }
    
});

createList(missiles);


//<a href="https://www.flaticon.com/free-icons/missile" title="missile icons">Missile icons created by Nhor Phai - Flaticon</a>