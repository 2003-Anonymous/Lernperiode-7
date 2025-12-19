window.currentMoney = parseFloat(localStorage.getItem("currentMoney"));

const trees = {
    longrange: {
        name: "Longrange",
        levels: 15
    },
    shortrange: {
        name: "Shortrange",
        levels: 15
    }
};


let unlocked = {
    longrange: 1,
    shortrange: 1
};


function buildTrees() {
    for (const tree in trees) {
        const treePa = document.getElementById(tree);
        treePa.innerHTML = "";

        for (let i = 1; i <= trees[tree].levels; i++) {
            const box = document.createElement("div");
            box.className = "box";

            const price = i * 1000;

            if (i > unlocked[tree]) {
                box.classList.add("locked");
                box.innerHTML = `
                    <strong>Level ${i}</strong>
                    <div class="lock-overlay">🔒 ${price}$</div>
                `;

                 box.addEventListener("click", () => {
                    unlockLevel(tree, i, price);
                 })
                
            } else {
                box.innerHTML = `
                    <strong>Level ${i}</strong>
                    <div>Unlocked</div>
                `;
            }
           
            
            treePa.appendChild(box);
        }
    }
}

function unlockLevel(tree, level, price){
    alert(window.currentMoney);
    if  (window.currentMoney >= price){
        if (unlocked[tree] + 1 === level){
            unlocked[tree] = level;
            window.currentMoney -= price;
            localStorage.setItem("currentMoney", window.currentMoney);
            
            buildTrees();
        }
    } else {
        alert("Nicht genug Geld!");
    }

   
}



function showTree(name) {
    document.querySelectorAll(".tree").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

    document.getElementById(name).classList.add("active");
    event.target.classList.add("active");
}

buildTrees();
