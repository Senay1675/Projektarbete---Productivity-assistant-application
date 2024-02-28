/* ------------------- Habits ---------------------- */
const radioCategories = document.querySelectorAll('input[name="priority"]');

const inputHabit = document.querySelector("#habitInput");
const lowBtn = document.querySelector("#low");
const mediumBtn = document.querySelector("#medium");
const highBtn = document.querySelector("#high");
const addHabit = document.querySelector("#addHabitBtn");
const habitCardContainer = document.querySelector("#habitCard-container");

const sortSelect = document.querySelector("#sortSelect");

// den här koden är filter funktionen

const filterBtn = document.querySelector("#filter-btn");

filterBtn.addEventListener("click", () =>{
  
  const filterCheckboxes = document.querySelectorAll('input[name="filtrera"]');
  console.log(filterCheckboxes);

  filterCheckboxes.forEach((filter)=>{ 
    console.log(filter.checked);

    if (filter.checked){
      priority = filter.value;
      console.log("vald prioritet", priority);
    }
  
  habitCardContainer.querySelectorAll(".habit-card").forEach((item)=>{
    let habitCard2 = item.querySelector("p").textContent;

    console.log("habitcard value " + habitCard2);
    console.log("priority value " + priority);

    if (priority === habitCard2){
          // Gör något med de matchande habitCard-elementen
          item.style.display = 'block'; // Visa elementet
        } else {
          item.style.display = 'none'; // Dölj elementet om det inte matchar
    }
  });

  });
});





console.log(habitCardContainer);

console.log(radioCategories);
// När man trycker på knappen så dyker kortet för habits fram

addHabit.addEventListener("click", () => {
  // För varje kort som skapas så gör jag en en till funktion som tar ut prioritet värde från radio buttons

  // Dessa kodrader skapar en div för att lägga korten i och tar valuet från inputen för att göra en rubrik för ärendet

  let habitCard = document.createElement("div");
  habitCard.classList.add("habit-card");
  let habitName = document.createElement("h4");
  habitName.innerText = inputHabit.value;


  radioCategories.forEach((radio) => {
    if (radio.checked) {
      priority = radio.value;
      console.log("Vald prioritet", priority);

      let prioritytext = document.createElement("p");
      prioritytext.innerText = radio.value;
      habitCard.append(prioritytext);
    }
  });

  habitCard.append(habitName);

  habitCardContainer.append(habitCard);

  let habitCounter = document.createElement("div");
  let habitStreakTitle = document.createElement("h3");
  habitStreakTitle.innerText = "Streak";

  habitCounter.append(habitStreakTitle);
  habitCard.append(habitCounter);

  // Här koden som skapar counter elementen och appendar dem till DOMen

  let counterDiv = document.createElement("div");

  let incrementBtn = document.createElement("button");
  incrementBtn.innerText = "+";
  let decrementBtn = document.createElement("button");
  decrementBtn.innerText = "-";
  let resetBtn = document.createElement("button");
  resetBtn.innerText = "Reset";
  let counterValue = document.createElement("div");
  counterValue.innerText = "0";

  counterDiv.appendChild(incrementBtn);
  counterDiv.appendChild(counterValue);
  counterDiv.appendChild(decrementBtn);
  counterDiv.appendChild(resetBtn);
  habitCard.appendChild(counterDiv);

  // Med denna kod så räknar countern upp ner och nollställer den

  let counter = 0;

  incrementBtn.addEventListener("click", () => {
    counter++;
    counterValue.innerText = counter;
  });

  decrementBtn.addEventListener("click", () => {
    if (counter > 0) {
      counter--;
      counterValue.innerText = counter;
    }
  });

  resetBtn.addEventListener("click", () => {
    counter = 0;
    counterValue.innerText = counter;
  });
});

/* ------------------- Habits ---------------------- */

/* ------------------- Habits ---------------------- */
