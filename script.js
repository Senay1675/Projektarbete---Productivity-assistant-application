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
let allUserHabits = [];

let habitUser = localStorage.getItem("currentUserId");
console.log(habitUser);

// Min sorteringsfunktion

sortSelect.addEventListener("change", () => {
  let sorting = sortSelect.value;
  console.log(sorting);
  sortingHabits(sorting);
  console.log(sortingHabits(sorting));
});

const sortingHabits = (filter) => {
  console.log(filter);

  console.log(habitCardContainer);

  const habitCardSort = Array.from(
    habitCardContainer.querySelectorAll(".habit-card")
  );
  console.log(habitCardSort);

  habitCardSort.forEach((card) => {
    let result = card.querySelector("div:nth-child(4) > div");
    console.log(result.textContent);
  });
  console.log(habitCardSort);

  habitCardSort.sort((a, b) => {
    // IF sortera på streaks
    
    console.log(a);
    let habitB = b.querySelector(
      ".habit-card div:nth-child(4) > div"
    ).textContent;
    let habitA = a.querySelector(
      ".habit-card div:nth-child(4) > div"
    ).textContent;
    console.log(a.querySelector("div:nth-child(4) > div"));

    console.log("habit A " + habitA);
    console.log("habit B " + habitB);
    // här gör jag om  streak value till integers

    let valueA = parseInt(habitA);
    let valueB = parseInt(habitB);
    console.log(valueA);
    console.log(valueB);

    // Använd lämplig jämförelse beroende på vad du sorterar (strängar, nummer, etc.)
   
  if(sortRadioStreak.checked){

  console.log(filter);
  if (filter === "rising") {
    return valueA - valueB;
  } else if (filter === "falling") {
    return valueB - valueA;
  }
}
    //}

    //Else sortera på prio
    else if (sortRadioPriority.checked) {
      
     console.log(a.querySelector("p").innerText);
     console.log(b.querySelector("p").innerText);
//console.log(a.querySelector("#habitCard-container > div:nth-child(1) > p"));
//console.log(b.querySelector("#habitCard-container > div:nth-child(1) > p"));

      const priorityA = a.querySelector("p").innerText;
      const priorityB = b.querySelector("p").innerText;

      // Jämför prioriteterna som strängar (Low, Medium, High)
if (priorityA === priorityB) {
  return 0; // Ingen förändring i ordningen
} else if (filter === "rising") {
  // Stigande ordning
  if (priorityA === "Low") {
    return -1; // Sortera habitA före habitB
  } else if (priorityB === "Low") {
    return 1; // Sortera habitB före habitA
  } else if (priorityA === "Medium" && priorityB === "High") {
    return -1; // Sortera habitA före habitB
  } else {
    return 1; // Sortera habitB före habitA (om priorityA är "High" eller priorityB är "Medium")
  }
}
 else if (filter === "falling") {
  // Fallande ordning
  if (priorityA === "Low") {
    return 1; // Sortera habitB före habitA
  } else if (priorityB === "Low") {
    return -1; // Sortera habitA före habitB
  } else if (priorityA === "Medium" && priorityB === "High") {
    return 1; // Sortera habitB före habitA
  } else {
    return -1; // Sortera habitA före habitB (om priorityA är "High" eller priorityB är "Medium")
  }
}

    }
  });

  // här så tömmer jag den gamla listan och lägger till Nya kort som är sorterade och appendar dem

  habitCardContainer.innerHTML = "";
  habitCardSort.forEach((card) => {
    habitCardContainer.append(card);
  });
};

// den här koden är filter funktionen

const filterBtn = document.querySelector("#filter-btn");

filterBtn.addEventListener("click", () => {
  const habitCards = habitCardContainer.querySelectorAll(".habit-card");
  const filteredCards = []; // En tillfällig array för att lagra matchande kort

  // Återställ display-stilen för alla habit-kort
  habitCards.forEach((item) => {
    item.style.display = "block";
  });

  const filterCheckboxes = document.querySelectorAll(
    'input[name="filtrera"]:checked'
  );
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
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

console.log(habitCardContainer);

console.log(radioCategories);


addHabit.addEventListener("click", () => {
  // För varje kort som skapas så gör jag en en till funktion som tar ut prioritet värde från radio buttons
  let streak = "0";
  let prio;
  let title = inputHabit.value;

  radioCategories.forEach((radio) => {
    if (radio.checked) {
      prio = radio.value;
      console.log("Vald prioritet", prio);
    }
  });
  console.log(streak, prio, title);


  // Dessa kodrader skapar en div för att lägga korten i och tar valuet från inputen för att göra en rubrik för ärendet
  makeHabitcard(streak, prio, title);
});

const makeHabitcard = (habitStreak, habitPriority, habitTitle) => {
  let habitCard = document.createElement("div");
  habitCard.classList.add("habit-card");
  let cardID = Math.floor(1000 + Math.random() * 9000);
  habitCard.classList.add(cardID);
  let habitName = document.createElement("h3");
  habitName.innerText = habitTitle;

  let prioritytext = document.createElement("p");
  prioritytext.innerText = habitPriority;
  habitCard.append(prioritytext);

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
  counterValue.innerText = habitStreak;

  counterDiv.appendChild(counterValue);
  counterDiv.appendChild(incrementBtn);
  counterDiv.appendChild(decrementBtn);
  counterDiv.appendChild(resetBtn);
  habitCard.appendChild(counterDiv);


  
  // Med denna kod så räknar countern upp ner och nollställer den

  let counter = habitStreak;

  incrementBtn.addEventListener("click", () => {
    counter++;
    counterValue.innerText = counter;
    let id = resetBtn.parentElement.parentElement.classList[1];
    console.log(id);
    updateLocalStreak(id, counter);
  });

  decrementBtn.addEventListener("click", () => {
    if (counter > 0) {
      counter--;
      counterValue.innerText = counter;
      let id = resetBtn.parentElement.parentElement.classList[1];
      console.log(id);
      updateLocalStreak(id, counter);
    }
  });

  resetBtn.addEventListener("click", () => {
    counter = 0;
    counterValue.innerText = counter;
    let id = resetBtn.parentElement.parentElement.classList[1];
    console.log(id);
    updateLocalStreak(id, counter);
  });

 const updateLocalStreak = (id, counter) =>{
  let habitCards = JSON.parse(localStorage.getItem("userHabit")) || [];
  habitCards.forEach((habit) =>{
    console.log(id, habit.cardID)
    if(+habit.cardID == id){
      console.log("id stämmer");
      habit.streak = counter
    }
    console.log(habitCards);
  });
  localStorage.setItem("userHabit", JSON.stringify(habitCards));
  return;
 };

  // Funktion för att ta bort kort från local storage
const removeFromLocalStorage = (cardId) => {
  let habitCards = JSON.parse(localStorage.getItem("userHabit")) || [];

  // Filtrera ut det kortet med matchande cardId
  const updatedHabitCards = habitCards.filter((card) => card.cardID !== cardId);

  // Spara den uppdaterade listan till local storage
  localStorage.setItem("userHabit", JSON.stringify(updatedHabitCards));
};

// Anropa funktionen när du vill ta bort ett kort
const deleteFuncButton = (button) => { 
  console.log("Delete button clicked");
   let cardId = button.parentElement.classList[1];
   console.log(cardID);
  button.parentElement.remove();
  removeFromLocalStorage(+cardId); // Använd '+' för att konvertera cardId till en siffra
};

  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    deleteFuncButton(deleteButton);
    deleteButton.parentElement.remove();
  });

  habitCard.appendChild(deleteButton);

  let priorityValue = habitCard.querySelector("p").textContent;
  console.log(priorityValue);

  let allHabits = {
    streak: habitStreak,
    priority: priorityValue,
    titel: inputHabit.value,
    userID: habitUser,
    cardID,
  };
  console.log(allHabits);
  allUserHabits.push(allHabits);
  console.log(allUserHabits);
  localStorage.setItem("userHabit", JSON.stringify(allUserHabits));
};

const getHabitData = () => {
  let parsedUserHabits = JSON.parse(localStorage.getItem("userHabit"));
  console.log(parsedUserHabits);

  parsedUserHabits.forEach((card) => {
    if (card.userID === habitUser) {
      console.log("använder stämmer");
      makeHabitcard(card.streak, card.priority, card.titel);
    }
  });
};
getHabitData();


/* ------------------- Habits ---------------------- */

/* ------------------- Habits ---------------------- */


