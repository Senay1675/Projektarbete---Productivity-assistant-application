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

/* ------------ TIMER  ------------*/

let startingMinutes = 1;
let time = startingMinutes * 60;
let countdownEl = document.querySelector("#timer");
let intervalId; // = setInterval(updateCountdown, 1000);
let isPaused = true;
const startTimerBtn = document.querySelector("#startTimer");
const stopTimerBtn = document.querySelector("#stopTimer");

startTimerBtn.addEventListener("click", toggleTimer);
stopTimerBtn.addEventListener("click", stopTimer);

// Toggla Start/pause/Resume funktionalitet:
function toggleTimer() {
  if (isPaused) {
    startTimer();
    startTimerBtn.innerText = "PAUSE";
    stopTimerBtn.style.display = "inline-block";
  } else {
    pauseTimer();
    startTimerBtn.textContent = "RESUME";
  }
  isPaused = !isPaused; // Om isPaused är true - gör isPaused till false
}

// Starta timer:
function startTimer() {
  clearInterval(intervalId); // Stoppa ev pågående upprepning
  intervalId = setInterval(updateCountdown, 1000);
}

// Pausa timer:
function pauseTimer() {
  clearInterval(intervalId);
}

// Stoppa timer:
function stopTimer() {
  clearInterval(intervalId);
  time = startingMinutes * 60;
  updateCountdown();
  isPaused = true;
  startTimerBtn.textContent = "START TIMER";
  stopTimerBtn.style.display = "none";
}

// Countdown funktionalitet:
function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  countdownEl.innerHTML = `${minutes}:${seconds}`;

  if (time <= 0) {
    clearInterval(intervalId);
    stopTimerBtn.style.display = "none";
  } else {
    time--;
  }
}

// let start = Date.now();
// setInterval(function () {
//   let delta = Date.now() - start; // Delta betyder skillnad i värde

//   output(Math.floor(delta / 1000));
//   output(new Date().toUTCString());
// }, 1000);

// const timer = {
//   pomodoro: 25,
//   longBreak: 15,
//   shortBreak: 5,
//   longBreakInterval: 4,
// };
