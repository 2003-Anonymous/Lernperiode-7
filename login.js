const usernameField = document.getElementById("name");
const passwordField = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const signinBtn = document.getElementById("signInBtn");

let users = [];
function getUsersFromAPI(){
  fetch("https://localhost:7224/api/User")
    .then(response => {
        if(!response.ok){
            throw new Error("API error");
        }
        return response.json();
    })
    .then(data => {
        users = data;
    })
    .catch(error => console.error(error));
}
getUsersFromAPI();

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const userInput = usernameField.value.trim();
  const passwordInput = passwordField.value.trim();

  const user = users.find(
    u =>
      u.username === userInput &&
      u.password === passwordInput
  );

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    location.href = "game.html";
  } else {
    alert("Login fehlgeschlagen!");
  }
});

signinBtn.addEventListener("click", async () => {
  const userInput = usernameField.value.trim();
  const passwordInput = passwordField.value.trim();

  let valid;

  for(const u of users){
    if(userInput === u.username){
      valid = false;
      alert("User existiert schon");
      break;
    }
    else {
      valid = true;
      alert("User wird erstellt");
    }
  }

  let user = {
    username: userInput,
    password: passwordInput,
    role: "user",
    saveGame: null
  }

  if(valid){
    await fetch("https://localhost:7224/api/User", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
    alert("User erstellt");
    getUsersFromAPI();
  }
  
})