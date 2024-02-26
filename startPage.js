/* -------- KOD FÖR LOGIN-FUNKTIONALITET: ----------- */

/* --------------- USER GREETIGN ----------*/

const loginHeader = document.querySelector("#loginHeader");
const loginHeaderH1 = document.querySelector("#loginHeaderH1");
const loginQuoteContainer = document.querySelector("#loginQuoteContainer");
const currentUser = localStorage.getItem("currentUser");
const logOutBtn = document.querySelector("#logOutBtn");

if (currentUser) {
  console.log("Current user:", currentUser);

  loginHeaderH1.innerText = `Welcome ${currentUser}!`;
}

/* --------------- FETCH CITAT-API -------------------- */

async function randomQuote() {
  const response = await fetch("https://api.quotable.io/random");
  const quote = response.json();

  return quote;
}

randomQuote().then((quote) => {
  loginQuoteContainer.innerHTML = `${quote.content} </br> - ${quote.author}`;
});

/* ---------------- LOGOUT BUTTON ---------------- */

logOutBtn.addEventListener("click", () => {
  window.location.href = "login.html";
});
