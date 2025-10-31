var map = L.map('map').setView([47.29977627719577, 8.12394213320905], 13);

        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //attribution: '© OpenStreetMap-Mitwirkende'
        }).addTo(map);

        
        // L.marker([47.29977627719577, 8.12394213320905]).addTo(map)
        //     .bindPopup("Oberkulm")
        //     .openPopup();

const missiles = [
    { name: "RS-28 Sarmat",
      src: "Models/fattah_hypersonic_missile.glb",
      radius: 50
    },
    { name: "RSM-56 Bulava"},
    { name: "RS-24 Yars"},
    { name: "R-29RMU Sineva"}
]

const viewer = document.getElementById("modelViewer");

function createList(missiles){
    const missileList = document.getElementById("missileList");
    missileList.innerHTML = "";
    missiles.forEach ((element) => {
        const newLi = document.createElement("li");
        newLi.textContent = element.name;
        newLi.addEventListener('click', () =>{


            viewer.src = element.src;
        });
        missileList.appendChild(newLi);
    });  
}


L.circle([47.3769, 8.5417], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.3,
    radius: 2500
}).addTo(map).bindPopup("25 km Umkreis von Zürich");


var BaseIcon = L.icon({
    iconUrl: 'Images/barracks.png',    
    iconSize: [20, 20],       
    iconAnchor: [10, 10],     
    popupAnchor: [0, -40]     
});


L.marker([47.3769, 8.5417], { icon: BaseIcon })
    .addTo(map)
    .bindPopup("Base");





// Wenn du auf die Karte klickst, füge einen Marker hinzu
map.on('click', function(e) {
    L.marker(e.latlng).addTo(map)
        .bindPopup("Marker bei: " + e.latlng.toString());
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








createList(missiles);