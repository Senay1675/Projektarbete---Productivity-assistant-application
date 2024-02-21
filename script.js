const todoTitle = document.querySelector("#todoName");
const addTodoBtn = document.querySelector("#addTodo");
const todoDesc = document.querySelector("#todoDesc");
const todoDate = document.querySelector("#todoDate");
const todoEstValue = document.querySelector("#estTime");
const todoEst = document.querySelector("#todoEstimate");
const todoCategory = document.querySelector("#todoCategory");
const todoList = document.querySelector(".your-todo");

const createTodoItem = (
  title,
  description,
  estimation,
  estimationUnit,
  deadline
) => {
  //Create Todo-card
  const todoCard = createDiv("todo");

  //Add divs for structure in To-do card
  let upperTodo = createDiv("upperCard");

  let middleTodo = createDiv("middleCard");

  let lowerTodo = createDiv("lowerCard");

  // Append to upper card position
  let status = createDiv("todoStatus");

  status.innerHTML = `<span>To-do</span>
  <span>Est. time: ${estimation} ${estimationUnit}</span>
  <span>Deadline: ${deadline}</span>`;

  //Append to mid card position
  let todoDetails = createDiv("todoDetails");

  todoDetails.innerHTML = `<h4>${title}</h4>
  <p>${description}</p>
  `;
  //Append to lower card position
  const doneBtn = createButton("Done", "todoDoneBtn");
  const editBtn = createButton("Edit", "todoEditBtn");
  const deleteBtn = createButton("Done", "todoDeleteBtn");

  upperTodo.append(status);
  middleTodo.append(todoDetails);
  lowerTodo.append(doneBtn, editBtn, deleteBtn);
  todoCard.append(upperTodo, middleTodo, lowerTodo);
  return todoCard;
};

const createDiv = (className) => {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add(className);
  return todoDiv;
};

const createButton = (text, className) => {
  const button = document.createElement("button");
  button.innerText = text;
  button.classList.add(className);
  return button;
};

todoDate.addEventListener("change", () => {
  const deadline = todoDate.value;

  if (new Date(deadline) < new Date()) {
    errorMessage.style.display = "block";
    addTodoBtn.disabled = true;
  } else {
    errorMessage.style.display = "none";
    addTodoBtn.disabled = false;
  }
});

addTodoBtn.addEventListener("click", () => {
  const title = todoTitle.value;
  const description = todoDesc.value;
  const estimation = todoEstValue.value;
  const estimationUnit = todoEstValue.value;
  const deadline = todoDate.value;

  const todoItem = createTodoItem(
    title,
    description,
    estimation,
    estimationUnit,
    deadline
  );
  todoList.append(todoItem);
});

/* ----------- LOGIN FUNKTIONALITET -------------- */


// const loginUsernameInput = document.querySelector("#loginUsername");
// const loginPasswordInput = document.querySelector("#loginPassword");
// const loginRegisterBtn = document.querySelector(".loginRegisterBtn");
// const loginBtn = document.querySelector(".loginBtn");

// let users = JSON.parse(localStorage.getItem("users")) || [];


// loginRegisterBtn.addEventListener("click", () => {
//   let username = loginUsernameInput.value;
//   let password = loginPasswordInput.value;


//   let newUser = {
//     username,
//     password,
//   };

//   users.push(newUser);

//   localStorage.setItem("users", JSON.stringify(users));

//   console.log("Användaren har registrerats", newUser);
//   //   localStorage.setItem("name", loginUsernameInput.value);


// loginBtn.addEventListener("click", () => {
//   let username = loginUsernameInput.value;
//   let password = loginPasswordInput.value;

//   let user = users.find(
//     (user) => user.username === username && user.password === password
//   );

//   let h2 = document.querySelector("#loginH2");
//   console.log(user);

//   if (user) {
//     h2.textContent = `Welcome ${user.username}`;
//   } else {
//     h2.textContent = `Failed 2 login`;
//   }
// });

/* ----------- LOGIN FUNKTIONALITET SLUT ---------- */

/* ------------------- Habits ---------------------- */

const inputHabit = document.querySelector("#habitInput");
const lowBtn = document.querySelector("#low");
const mediumBtn = document.querySelector("#medium");
const highBtn = document.querySelector("#high");
const addHabit = document.querySelector("#addHabitBtn");
const habitCardContainer = document.querySelector("#habitCard-container");
console.log(habitCardContainer);

// När man trycker på knappen så dyker kortet för habits fram

addHabit.addEventListener("click", () => {
  let habitCard = document.createElement("div");
  let habitName = document.createElement("h4");
  habitName.innerText = inputHabit.value;

  habitCard.append(habitName)

  habitCardContainer.append(habitCard);

  let habitCounter = document.createElement("div");
  let habitStreakTitle = document.createElement("h3")
  habitStreakTitle.innerText = "Streak";

habitCounter.append(habitStreakTitle);
habitCard.append(habitCounter);

let counterDiv = document.createElement("div")

let incrementBtn = document.createElement("button");
incrementBtn.innerText = "+";
let decrementBtn = document.createElement("button");
decrementBtn.innerText = "-";
let resetBtn = document.createElement("button"); 
resetBtn.innerText = "Reset";
let counterValue = document.createElement("div")
counterValue.innerText = "0";



counterDiv.appendChild(incrementBtn);
counterDiv.appendChild(counterValue);
counterDiv.appendChild(decrementBtn);
counterDiv.appendChild(resetBtn);
habitCard.appendChild(counterDiv);

let counter = 0;

incrementBtn.addEventListener("click",() =>{
    counter++;
    counterValue.innerText = counter;
});

decrementBtn.addEventListener("click", () =>{
    counter--;
    counterValue.innerText = counter;

});

resetBtn.addEventListener("click", () =>{
    counter = 0;
    counterValue.innerText = counter;
})



});

/* ------------------- Habits ---------------------- */

