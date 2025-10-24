var map = L.map('map').setView([47.3769, 8.5417], 13);

        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //attribution: '© OpenStreetMap-Mitwirkende'
        }).addTo(map);

        
        L.marker([47.3769, 8.5417]).addTo(map)
            .bindPopup("Zürich")
            .openPopup();

const missiles = [
    { name: "RS-28 Sarmat"},
    { name: "RSM-56 Bulava"},
    { name: "RS-24 Yars"},
    { name: "R-29RMU Sineva"}
]

function createList(missiles){
    const missileList = document.getElementById("missileList");
    missileList.innerHTML = "";
    missiles.forEach ((element) => {
        const newLi = document.createElement("li");
        newLi.textContent = element.name;
        newLi.addEventListener('click', () =>{
            selectedCard = element;
            const cardName = document.getElementById("saTop");
            const cardPrice = document.getElementById("cardPrice");
            
            cardName.textContent = element.name;
            cardPrice.textContent = element.price.toFixed(2) + " CHF";

            const amount = parseInt(amountInput.value) || 0;
            const total = amount * selectedCard.price;
            document.getElementById("totalPrice").textContent = total.toFixed(2) + " CHF";

        });
        cardList.appendChild(newLi);
    });  
}