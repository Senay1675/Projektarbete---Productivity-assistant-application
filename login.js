const loginUsernameInput = document.querySelector("#loginUsername");
const loginPasswordInput = document.querySelector("#loginPassword");
const loginRegisterBtn = document.querySelector(".loginRegisterBtn");
const loginBtn = document.querySelector(".loginBtn");

let users = JSON.parse(localStorage.getItem("users")) || [];

/* ---------- REGISTER BUTTON ------------ */

loginRegisterBtn.addEventListener("click", () => {
  let username = loginUsernameInput.value;
  let password = loginPasswordInput.value;

  let newUser = {
    username,
    password,
    id: crypto.randomUUID(),
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  //   console.log("Användaren har registrerats", newUser);
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
    // loginHeaderH1.innerText = `Welcome ${user.username}`;
    window.location.href = "index.html";
    // h2.textContent = `Welcome ${user.username}`;
  } else {
    h2.textContent = `Failed 2 login`;
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
