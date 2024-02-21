const loginUsernameInput = document.querySelector("#loginUsername");
const loginPasswordInput = document.querySelector("#loginPassword");
const loginRegisterBtn = document.querySelector(".loginRegisterBtn");
const loginBtn = document.querySelector(".loginBtn");
const loginHeader = document.querySelector("#loginHeader");
console.log("före querySelector");
const loginHeaderH1 = document.querySelector("#loginHeaderH1");
console.log(loginHeaderH1);

let users = JSON.parse(localStorage.getItem("users")) || [];

loginRegisterBtn.addEventListener("click", () => {
  let username = loginUsernameInput.value;
  let password = loginPasswordInput.value;

  let newUser = {
    username,
    password,
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  console.log("Användaren har registrerats", newUser);
  //   localStorage.setItem("name", loginUsernameInput.value);
});

loginBtn.addEventListener("click", () => {
  let username = loginUsernameInput.value;
  let password = loginPasswordInput.value;

  let user = users.find(
    (user) => user.username === username && user.password === password
  );

  let h2 = document.querySelector("#loginH2");
  console.log(user);

  if (user) {
    console.log("user found: " + user.username);
    let title = document.createElement("h1");
    title.textContent = `Welcome ${user.username}`;

    console.log(title);
    // loginHeaderH1.innerText = `Welcome ${user.username}`;
    loginHeader.append(title);
    // window.location.href = "index.html";
    // h2.textContent = `Welcome ${user.username}`;
  } else {
    h2.textContent = `Failed 2 login`;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const loginHeaderH1 = document.querySelector("#loginHeaderH1");
  console.log("Efter querySelector", loginHeaderH1);

  // Testkod
  //   loginHeaderH1.innerText = "Testar manipulation";
});
