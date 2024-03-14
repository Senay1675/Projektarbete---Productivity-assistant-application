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

// Starting contitions:

let startingMinutes = 25;
let time = startingMinutes * 60;
let countdownEl = document.querySelector("#timer");
let intervalId; // = setInterval(updateCountdown, 1000);
let isPaused = true;
const startTimerBtn = document.querySelector("#startTimer");
const stopTimerBtn = document.querySelector("#stopTimer");
const pomodoroBtn = document.querySelector("#pomodoroBtn");
const longBreakBtn = document.querySelector("#longBreak");
const shortBreakBtn = document.querySelector("#shortBreak");

startTimerBtn.addEventListener("click", toggleTimer);
stopTimerBtn.addEventListener("click", stopTimer);
pomodoroBtn.addEventListener("click", () => setTimer(25));
longBreakBtn.addEventListener("click", () => setTimer(15));
shortBreakBtn.addEventListener("click", () => setTimer(5));

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

function setTimer(minutes) {
  startingMinutes = minutes;
  time = startingMinutes * 60;
  updateCountdown();
}

let focusTimeButton = document.querySelectorAll("[data-modal-target]");
let closeModalButtons = document.querySelectorAll("[data-close-button]");
let overlay = document.querySelector("#timerOverlay");

focusTimeButton.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

// ------ CUSTOM TIME FUNCTIONALLITY -------------

countdownEl.addEventListener("click", function () {
  // ta bort eventlyssnare för att förhindra dubbelklicksproblem

  this.removeEventListener("click", arguments.callee);

  // Spara det nuvarande värdet för att kunna använda det senare
  let originalValue = this.innerText;

  // Rensainnehållet när det klickas för att låta användaren skriva in egen tid
  this.innerText = "";

  // Skapa ett textinmatningsfält för att låta användaren skriva i tiden
  let inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = originalValue;

  // Lägg till eventlyssnare för attreagera på ändringar
  inputField.addEventListener("blur", function () {
    // Återställ till det ursprungliga värdet om inget har skrivits in
    countdownEl.innerText = this.value || originalValue;

    // återlägg eventlyssnaren
    countdownEl.addEventListener("click", arguments.callee);
  });

  // Ersätt textinmatningsfältet för att låta användaren redigera tiedn
  this.innerHTML = "";
  this.append(inputField);

  // Fokus på inputfältet
  inputField.focus();
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

// ------------ VÄDER API := ---------------------

// const apiKey = "88cc3776d9e1a3fd596dea8ca64d74db";
// const apiURL = `https://api.openweathermap.org/data/3.0/onecall?lat={59;33}&lon={18;06}&exclude={part}&appid=${apiKey}`;

// fetch("${apiURL}?apikey=${apiKey}")
//   .then((response) => response.jason())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => console.error("Fel vid hämtning av väderdata"));

async function getWeather() {
  const response = await fetch(
    "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59.34&lon=18.06"
  );
  const weather = response.json();

  return weather;
}

getWeather().then((weather) => {
  let weatherDetails = weather.properties.timeseries[0].data.instant.details;
  let temp = weatherDetails.air_temperature;
  let clouds = weatherDetails.cloud_area_fraction;
  let wind = weatherDetails.wind_speed;

  let weatherIcon;
  let weatherImg;

  let weatherContainer = document.querySelector(".headerLeft");

  if (clouds < 60) {
    weatherIcon = `fair_day.svg`;
  } else if (clouds > 60) {
    weatherIcon = `cloudy.svg`;
  } else if (clouds < 30) {
    weatherIcon = `clearsky_day.svg`;
  }

  weatherImg = document.createElement("img");
  weatherImg.src = "./weather-icons/cloudy.svg";

  let showTemp = document.createElement("p");
  showTemp.innerHTML = `${temp} °C`;

  let currentWind = document.createElement("p");
  currentWind.innerHTML = `${wind} m/s`;

  //   /Users/charleslindberg/weathericons/weather/svg

  //     weatherImg.innerHTML = `<img src="/weather/svg/${weatherIcon}" />`;
  weatherContainer.append(weatherImg);
  weatherContainer.append(showTemp);
  weatherContainer.append(currentWind);

  console.log(weather);
  console.log(temp);
  console.log(clouds);
  console.log(wind);
  console.log(weatherIcon);
});

// // function openModal() {
// //   document.querySelector("#timerModal").style.display = "block";
// // }

// // function closeModal() {
// //   document.querySelector("#timerModal").style.display = "none";
// // }

// // document.querySelector("#focusTimeBtn").addEventListener("click", openModal);

// // let start = Date.now();
// // setInterval(function () {
// //   let delta = Date.now() - start; // Delta betyder skillnad i värde

// //   output(Math.floor(delta / 1000));
// //   output(new Date().toUTCString());
// // }, 1000);

// // const timer = {
// //   pomodoro: 25,
// //   longBreak: 15,
// //   shortBreak: 5,
// //   longBreakInterval: 4,
// // };
