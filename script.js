/* ----------- LOGIN FUNKTIONALITET -------------- */
const loginUsernameInput = document.querySelector("#loginUsername");
const loginPasswordInput = document.querySelector("#loginPassword");
const loginRegisterBtn = document.querySelector(".loginRegisterBtn");
const loginBtn = document.querySelector(".loginBtn");

let users = JSON.parse(localStorage.getItem(users)) || [];

loginRegisterBtn.addEventListener("click", () => {
  let username = loginUsernameInput.value;
  let password = loginPasswordInput.value;

  localStorage.setItem("name", loginUsernameInput.value);
});

/* ----------- LOGIN FUNKTIONALITET SLUT ---------- */
