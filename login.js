const loginUsernameInput = document.querySelector("#loginUsername");
const loginPasswordInput = document.querySelector("#loginPassword");
const loginRegisterBtn = document.querySelector(".loginRegisterBtn");
const loginBtn = document.querySelector(".loginBtn");

let users = JSON.parse(localStorage.getItem("users")) || [];

/* ---------- REGISTER BUTTON ------------ */

let userExistPara = document.querySelector("#userExistsMessage");

function showSnackbar() {
  let snackbar = document.querySelector("#snackbar");
  snackbar.classList.add("show");
  setTimeout(function () {
    snackbar.classList.remove("show"); // Använd remove istället för replace
  }, 3000);
}

loginRegisterBtn.addEventListener("click", () => {
  let username = loginUsernameInput.value;
  let password = loginPasswordInput.value;

  // Kontrollera att användarnamnet inte redan finns

  let usernameExists = users.some((user) => user.username === username);

  if (usernameExists) {
    console.log("Användarnamnet finns redan, välj ett annat");
    userExistPara.textContent = "Username already exists";
  } else {
    let newUser = {
      username,
      password,
      id: crypto.randomUUID(),
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    showSnackbar();
  }
});

/* ---------- LOGIN BUTTON -------------- */

loginBtn.addEventListener("click", () => {
  let username = loginUsernameInput.value;
  let password = loginPasswordInput.value;

  let user = users.find(
    (user) => user.username === username && user.password === password
  );

  let h2 = document.querySelector("#loginH2");

  if (user) {
    console.log("user found: " + user.username);
    localStorage.setItem("currentUser", user.username);
    localStorage.setItem("currentUserId", user.id);
    window.location.href = "index.html";
  } else {
    userExistPara.textContent = `Wrong username or password`;
  }
});

// export function goToIndexHTML(user) {
//   if (user) {
//     console.log("user found: " + user.username);
//     // loginHeaderH1.innerText = `Welcome ${user.username}`;
//     window.location.href = "index.html";
//     h2.textContent = `Welcome ${user.username}`;
//   } else {
//     h2.textContent = `Failed 2 login`;
//   }
// }

// Bryt ut if-satsen. Få if satsen att köras på index.html. Export functions to different js files. Kanske genom att göra en funktion i loginBtn.addEventListerner - switchPages
// document.addEventListener("DOMContentLoaded", function () {
//   const loginHeaderH1 = document.querySelector("#loginHeaderH1");
//   console.log("Efter querySelector", loginHeaderH1);

//   // Testkod
//   //   loginHeaderH1.innerText = "Testar manipulation";
// });
