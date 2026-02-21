let currentMoney = 0;
updateMoney();


var map = L.map('map').setView([47.3769, 8.5417], 13);

        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        }).addTo(map);



let missiles = [];
async function loadMissilesFromAPI(){
    try{
        const res = await fetch("https://localhost:7224/api/Missile");
        missiles = await res.json();
    } catch(err){
        console.error("Missile load failed", err);
    }
}


let buildings = [];
async function loadBuildingsFromAPI(){
    try{
        const res = await fetch("https://localhost:7224/api/Building")
        buildings = await res.json();
        
        handleClick("base");
    } catch(err){
        console.error("Building load failed", err);
    }
}


let loadedSave = [];
async function loadGame(id){
    const res = await fetch(`https://localhost:7224/api/Save/${id}`);
        return await res.json();
}


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
let SavedMarkers = [];
let placedBuildings = [];
let allBuildingsDefs = [];
let selectedMissile;
let selectedBuilding;
let selectedSilo;
let spectatedUser;
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
const treeBtn = document.getElementById("treeBtn");
const skillTree = document.getElementById("skillTree");
const logoutBtn = document.getElementById("logoutBtn");
const sidebarBtn = document.getElementById("sidebarBtn");
const administrationOverlay = document.getElementById("administration-container");

let previewRadius;
let rangeCircle;
let selectedElement;
let previewCenter;
let target;
let menuSelected = "building";
let selectedType = "base";
let base;
let timerIds = [];
let baseTimerId;
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));


let unlocked = {
    longrange: 1,
    shortrange: 1
};

async function initGame(user){

    await loadMissilesFromAPI();
    await loadBuildingsFromAPI();

    map.eachLayer(layer => {
        if(layer instanceof L.Marker || layer instanceof L.Circle){
            map.removeLayer(layer);
        }
    });
    placedBuildings = [];

    allBuildingsDefs = [...buildings.base, ...buildings.attack, ...buildings.defense];

    if(user.saveGame){
        loadedSave = await loadGame(user.saveGame.id);
        SavedMarkers = loadedSave.markers;
        currentMoney = loadedSave.money;
        updateMoney();


        unlocked.longrange = loadedSave.longrangeStage;
        unlocked.shortrange = loadedSave.shortrangeStage;
    }

    unlockElements(missiles.shortrange, "missile");
    unlockElements(missiles.longrange, "missile");

    Object.values(buildings).forEach(category => {
        unlockElements(category, "building");
    });

    if(user.saveGame){
        loadBuildings(loadedSave);
    }
}


function loadBuildings(loadedSave){
    loadedSave.markers.forEach(m => {
        const bui = getBuildingById(m.buildingId);

        const latlng = [m.lat, m.lng];
        const icon = createIcon(bui.icon, bui.iconX, bui.iconY);

        if(bui.category === "attack"){
            placeSilo(bui, latlng, icon);
        } 
        else if(bui.category === "defense"){
            placeDefense(bui, latlng, icon);
        }
        else if(bui.category === "base"){

            if(bui.name === "Mainbase"){
                const marker = L.marker(latlng, {icon}).addTo(map);

                base = {
                    ...bui,
                    marker: marker
                };

                placedBuildings.push(base);
            } else {
                placeBuilding(bui, latlng, icon);
            }
            if(bui.income){
                generateMoneyFromBuilding(bui);
            }
        }
    })
}


function placeSilo(building, latlng, icon){
    const marker = L.marker(latlng, {icon: icon}).addTo(map);

    const silo = {
        ...building,
        marker: marker
    };
    silo.name = silo.name + " " + (silos.length + 1);
    marker.bindPopup(silo.name);

    silos.push(silo);
    placedBuildings.push(silo);
}

function placeDefense(building, latlng, icon){
    const marker = L.marker(latlng, {icon: icon}).addTo(map);

    const rangeCircle = L.circle(latlng, {
        color: building.name === "Airdefense" ? "yellow" : "blue",
        fillColor: building.name === "Airdefense" ? "yellow" : "blue",
        fillOpacity: 0.3,
        radius: building.range
    }).addTo(map);

    const defense = {
        ...building,
        marker: marker,
        rangeCircle: rangeCircle
    };
    defense.name = airdefenses.name + " " + (airdefenses.length + 1);
    marker.bindPopup(defense.name);

    airdefenses.push(defense);
    placedBuildings.push(defense);
}

function placeBuilding(building, latlng, icon){
    const marker = L.marker(latlng, {icon: icon}).addTo(map);
    
    const bui = {
        ...building,
        marker
    }

    placedBuildings.push(bui);
}

function getBuildingById(id){
    return allBuildingsDefs.find(b => b.id === id);
}

if(loggedInUser.role != "admin"){
    sidebarBtn.style.display = "none";
}
else{
    currentMoney = 1000000000;
    updateMoney();
}

function selectVisuals(element, bg){
    element.style.backgroundColor = bg;
    element.style.color = "var(--bg-color)";
}

function deselectVisuals(element, bg){
    element.style.backgroundColor = bg;
    element.style.color = "var(--text-color)";
}

selectVisuals(menu_building, "var(--highlight)");

function unlockElements(list, t){
    if(t === "missile"){
        list.forEach(missile => {
            if(missile.stage <= unlocked[missile.type]){
                missile.unlocked = true;
            }
        });
    }

    if(t === "building"){
        const totalUnlockedStages = unlocked.shortrange + unlocked.longrange;

        list.forEach(building => {
            if(building.stage <= totalUnlockedStages){
                building.unlocked = true;
            }
        });
    }
}


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

        if(!element.unlocked){
            newLi.classList.add("locked");
            newLi.textContent = "🔒 Locked"
        } else {
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
        }

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
            if(base){
                map.removeLayer(base.marker);
                const index = placedBuildings.indexOf(base);
                if(index !== -1){
                    placedBuildings.splice(index, 1);
                }
            }
            let ma = L.marker(e.latlng, {icon: icon}).addTo(map);

            base = {
                ...selectedBuilding,
                marker: ma
            };

            placedBuildings.push(base);
            generateMoneyFromBuilding(selectedBuilding);

        } else if(selectedBuilding.name === "Factory"){
            let marker = L.marker(e.latlng, {icon: icon}).addTo(map);

            let factory = {
                ...selectedBuilding,
                marker: marker
            };

            placedBuildings.push(factory);
            generateMoneyFromBuilding(selectedBuilding);

        } else if(selectedBuilding.name === "Missilesilo"){
            
            createSilo(e.latlng);

        } else if(selectedBuilding.name === "Shortrange Silo"){
            
            createSilo(e.latlng);
        
        } else if(selectedBuilding.name === "Missiledefense"){

            createDefense("blue", e.latlng);

        } else if(selectedBuilding.name === "Airdefense"){    

           createDefense("yellow", e.latlng);

        }
    }
});

function createDefense(color, latlng) {
    let icon = createIcon(selectedBuilding.icon, selectedBuilding.iconX, selectedBuilding.iconY);

    let marker = L.marker(latlng, {icon: icon}).addTo(map)
        .bindPopup(selectedBuilding.name + " " + (airdefenses.length + 1));

    let object = {
        ...selectedBuilding,
        marker: marker
    }

    let range = L.circle(latlng, {
        color: color,
        fillColor: color,
        fillOpacity: 0.3,
        radius: object.range
    }).addTo(map);

    object.name = selectedBuilding.name + " " + (airdefenses.length + 1);
    object.rangeCircle = range;
    airdefenses.push(object);
    placedBuildings.push(object);
}

function createSilo(latlng) {
    let icon = createIcon(selectedBuilding.icon, selectedBuilding.iconX, selectedBuilding.iconY);
    let marker = L.marker(latlng, {icon: icon}).addTo(map)
        .bindPopup(selectedBuilding.name + " " + (silos.length + 1));

    let silo = {
        ...selectedBuilding,
        marker: marker,
    }
    silo.name = selectedBuilding.name + " " + (silos.length + 1),
    silos.push(silo);
    placedBuildings.push(silo);
}


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
                target.center.setStyle({fillColor: 'black', color: 'black'});
                
                targets = targets.filter(t => t !== target);


                let distanceToBase = map.distance(base.marker.getLatLng(), target.center.getLatLng());
                
                if(distanceToBase <= target.missile.radius){
                    gameOver.style.display = "flex";
                    gameOverOverlay.style.display = "flex";
                    deleteSave(loggedInUser.saveGame.id);
                }

                placedBuildings = placedBuildings.filter(b => {
                    let distanceToB = map.distance(b.marker.getLatLng(), target.center.getLatLng());
                    if(distanceToB <= target.missile.radius){
                        destroyBuilding(b);
                        return false;
                    }
                    return true;
                })

                getBuildings(target.center.getLatLng(), target.missile.radius)
                    .then(hitCount => {
                        alert("Zerstörte Gebäude: " + hitCount);

                        let money = Math.round(hitCount * target.missile.warhead / 1000);
                        generateIncome(money);
                    });
            
            }
        }
    }
    requestAnimationFrame(step);
    
}

function destroyBuilding(building){
    if(building.marker){
        map.removeLayer(building.marker);
    }

    if(building.rangeCircle){
        map.removeLayer(rangeCircle);
    }

    silos = silos.filter(s => s !== building);
    airdefenses = airdefenses.filter(a => a !== building);

    if(selectedSilo === building){
        selectedSilo = null;
    }
}

const launchBtn = document.querySelector(".launch-button");
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
    missileList.innerHTML = "";
    if(selectedSilo){
        if(selectedSilo.type === "shortrange"){
            const shortrangeMissiles = missiles.shortrange;
            createList(shortrangeMissiles);
        } else {
            const icbms = missiles.longrange;
            createList(icbms);
        }
        
    }
   
    selectVisuals(menu_missile, "var(--highlight)");
    deselectVisuals(menu_building, "var(--accent-green)");
    deselectVisuals(menu_silo, "var(--accent-green)");
})

menu_building.addEventListener('click', () => {
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
        [...missiles.shortrange, ...missiles.longrange].forEach((element) => {
            let name = element.name.toLowerCase();
            if(name.includes(input)){
                newList.push(element);
            }
        })
        createList(newList);
    }else if(menuSelected === "building"){
        [...buildings.base, ...buildings.attack, ...buildings.defense].forEach((element) =>{
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

    menuSelected = "building";
    const b = buildings[type];
    createList(b);

    deselectVisuals(type_base, "var(--bg-color)");
    deselectVisuals(type_attack, "var(--bg-color)");
    deselectVisuals(type_defense, "var(--bg-color)");

    if (type === "base") {
        selectVisuals(type_base, "var(--highlight)");
    } 
    else if (type === "attack") {
        selectVisuals(type_attack, "var(--highlight)");
    } 
    else if (type === "defense") {
        selectVisuals(type_defense, "var(--highlight)");
    }
}

async function getBuildings(latlng, radius) {
    const overpassUrl = "https://overpass-api.de/api/interpreter";
    const query = `
        [out:json][timeout:5];
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

function generateMoneyFromBuilding(building){
    generateIncome(building.income);
    if(building.name === "Mainbase"){
        if(baseTimerId){
            clearTimeout(baseTimerId);
        }
        baseTimerId = setTimeout(() => generateMoneyFromBuilding(building), 10000);
    } else {
        timerIds.push(setTimeout(() => generateMoneyFromBuilding(building), 10000));
    }
    
}

function stopGenerateMoneyFromBuilding(){
    timerIds.forEach(t =>{
        clearTimeout(t);
    })
}

function generateIncome(income) {
    currentMoney += income;
    currentMoney = Math.round(currentMoney);
    
    updateMoney();
}

function updateMoney(){
    const money = document.getElementById("money");
    money.textContent = `Money: ${currentMoney}`;
}

treeBtn.addEventListener("click", () => {
    skillTree.style.display = "block";
    buildTrees();
})

if(logoutBtn){

    logoutBtn.addEventListener("click", async () => {

        stopGenerateMoneyFromBuilding();
        clearTimeout(baseTimerId);

        let u;
        if(spectatedUser != null){
            u = spectatedUser;
        } else {
            u = loggedInUser;
        }

        let save = {
            money: currentMoney,
            userId: u.id,
            shortrangeStage: unlocked.shortrange,
            longrangeStage: unlocked.longrange,
            markers: placedBuildings
                .map(b => ({
                    buildingId: b.id,
                    lat: b.marker.getLatLng().lat,
                    lng: b.marker.getLatLng().lng,
            }))
        }

        if(u.saveGame == null){
            await fetch("https://localhost:7224/api/Save", {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(save)
            });
            //alert(JSON.stringify(save, null, 2));
            console.log(save);

        }
        else {
            await fetch(`https://localhost:7224/api/Save/${u.saveGame.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(save)
            });
            // alert("Post");
            // alert(JSON.stringify(save, null, 2));
        }
        
        location.href = "login.html";
    })
}

async function deleteSave(id){
    await fetch(`https://localhost:7224/api/Save/${id}`, {
        method: "DELETE"
    });
}

sidebarBtn.addEventListener("click", () => {
    administrationOverlay.style.display = "flex";
    getUsersFromAPI();
    createUserList(users);
    stopGenerateMoneyFromBuilding();
    clearTimeout(baseTimerId);
})

initGame(loggedInUser);
//<a href="https://www.flaticon.com/free-icons/missile" title="missile icons">Missile icons created by Nhor Phai - Flaticon</a>