const adm_backBtn = document.getElementById("adm_backBtn");
const userTemplate = document.getElementById("user-template");
const userContainer = document.getElementById("user-container");


adm_backBtn.addEventListener("click", () =>{
    administrationOverlay.style.display = "none";
})

function createUserList(users){
    userContainer.innerHTML = "";

    users.forEach(u =>{
        const clone = userTemplate.content.cloneNode(true);

        clone.querySelector(".user_username").textContent = `Username: ${u.username}`;
        clone.querySelector(".user_password").textContent = `Password: ${u.password}`;
        clone.querySelector(".user_id").textContent = `ID: ${u.id}`;

        clone.querySelector(".user-preview").dataset.userId = u.id;
        clone.querySelector(".user_login").dataset.userId = u.id;
        clone.querySelector(".user_delete").dataset.userId = u.id;
        clone.querySelector(".user_delete").dataset.role = u.role;

        clone.querySelector(".user_delete").addEventListener("click", async (e) => {
            const userEl = e.target.closest(".user-preview");
            const id = e.target.dataset.userId;

            if(e.target.dataset.role != "admin"){
                await deleteUser(id);
                userEl.remove();

            } else {
                alert("Admin kann nicht gelöscht werden!");
            }
        })

        clone.querySelector(".user_login").addEventListener("click", async (e) => {
            const uI = Number(e.target.dataset.userId);
            const u = await getUserById(uI);

            spectatedUser = u;

            initGame(u);
            administrationOverlay.style.display = "none";
        })


        userContainer.appendChild(clone);
    })
}

async function deleteUser(id){
    await fetch(`https://localhost:7224/api/User/${id}`, {
        method: "DELETE"
    })
    getUsersFromAPI();
}

async function getUserById(id){
    const searchedUser = users.find(element => element.id === id);
    return searchedUser;
}