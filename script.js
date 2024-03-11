/* ------------------- Habits ---------------------- */
const radioCategories = document.querySelectorAll('input[name="priority"]');

const inputHabit = document.querySelector("#habitInput");
const lowBtn = document.querySelector("#low");
const mediumBtn = document.querySelector("#medium");
const highBtn = document.querySelector("#high");
const addHabit = document.querySelector("#addHabitBtn");
const habitCardContainer = document.querySelector("#habitCard-container");

const sortSelect = document.querySelector("#sort-select");
const sortRadioStreak = document.querySelector("#sort-streak-radio");
const sortRadioPriority = document.querySelector("#sort-priority-radio");

 // Min sorteringsfunktion


sortSelect.addEventListener("change",() =>{
  let sorting = sortSelect.value;

  sortingHabits(sorting);
  console.log(sortingHabits(sorting));
});

const sortingHabits = (filter) => {

  console.log(habitCardContainer);
  
  const habitCardSort = Array.from(habitCardContainer.querySelectorAll(".habit-card"));
  console.log(habitCardSort);

  habitCardSort.forEach((card)=>{
    let result = card.querySelector("div:nth-child(4) > div");
    console.log(result.textContent);

  });
  console.log(habitCardSort);
  
  habitCardSort.sort((a, b) =>{

    // IF sortera på streaks

    let habitA = a.querySelector("div:nth-child(4) > div").textContent;
    let habitB = b.querySelector("div:nth-child(4) > div").textContent;
    
    // här gör jag om  streak value till integers 

    let valueA = parseInt(habitA);
    let valueB = parseInt(habitB);
    console.log(valueA);
    console.log(valueB);

    // Använd lämplig jämförelse beroende på vad du sorterar (strängar, nummer, etc.)

    console.log(filter);
    if (filter === "rising") {
      return valueA - valueB;
    } else if (filter === "falling") {
      return valueB - valueA;
    }
  
    //Else sortera på prio
    const priorityA = a.querySelector('input[name="priority"]:checked').value;
    const priorityB = b.querySelector('input[name="priority"]:checked').value;
  
    // Jämför prioriteterna som strängar (Low, Medium, High)
    if (priorityA === priorityB) {
      return 0; // Ingen förändring i ordningen
    } else if (priorityA === "Low") {
      return -1; // Sortera habitA före habitB
    } else if (priorityB === "Low") {
      return 1; // Sortera habitB före habitA
    } else if (priorityA === "Medium" && priorityB === "High") {
      return -1; // Sortera habitA före habitB
    } else {
      return 1; // Sortera habitB före habitA (om priorityA är "High" eller priorityB är "Medium")
    }
  });

  // här så tömmer jag den gamla listan och lägger till Nya kort som är sorterade och appendar dem 

  habitCardContainer.innerHTML = "";
  habitCardSort.forEach((card) => {
   habitCardContainer.append(card)
  });  

};



// den här koden är filter funktionen

const filterBtn = document.querySelector("#filter-btn");

filterBtn.addEventListener("click", () => {
  const habitCards = habitCardContainer.querySelectorAll(".habit-card");
  const filteredCards = []; // En tillfällig array för att lagra matchande kort

  // Återställ display-stilen för alla habit-kort
  habitCards.forEach((item) => {
    item.style.display = 'block';
  });

  const filterCheckboxes = document.querySelectorAll('input[name="filtrera"]:checked');
  console.log(filterCheckboxes);

  // Om ingen checkbox är markerad, visa alla kort
  if (filterCheckboxes.length === 0) {
    return;
  }

  // Loopa genom markerade checkboxar och lagra matchande kort i den temporära arrayen
  filterCheckboxes.forEach((filter) => {
    const priority = filter.value;
    console.log("vald prioritet", priority);

    habitCards.forEach((item) => {
      let habitCard2 = item.querySelector("p").textContent;

      console.log("habitcard value " + habitCard2);
      console.log("priority value " + priority);

      if (priority === habitCard2) {
        // Lagra matchande kort i den temporära arrayen
        filteredCards.push(item);
      }
    });
  });

  // Loopa igenom alla habit-kort och visa/dölj baserat på prioritet
  habitCards.forEach((item) => {
    // Om kortet finns i den temporära arrayen, visa det, annars dölj det
    if (filteredCards.includes(item)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
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
  let habitName = document.createElement("h3");
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
  let habitStreakTitle = document.createElement("p");
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

  counterDiv.appendChild(counterValue);
  counterDiv.appendChild(incrementBtn);
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
