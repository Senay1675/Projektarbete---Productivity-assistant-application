// const todoTitle = document.querySelector("#todoName");
// const addTodoBtn = document.querySelector("#addTodo");
// const todoDesc = document.querySelector("#todoDesc");
// const todoDate = document.querySelector("#todoDate");
// const todoEstValue = document.querySelector("#estTime");
// const todoEst = document.querySelector("#todoEstimate");
// const todoCategory = document.querySelector("#todoCategory");
// const todoList = document.querySelector(".your-todo");

// addTodoBtn.addEventListener("click", () => {
//   let todoCard = document.createElement("div");
//   todoCard.classList.add("todo");
//   let status = document.createElement("div");
//   status.classList.add("todoStatus");
//   let statusP = document.createElement("span");
//   statusP.textContent = "To-do";
//   let todoName = document.createElement("h4");
//   todoName.textContent = todoTitle.value;
//   let description = document.createElement("p");
//   description.textContent = todoDesc.value;
//   let estimate = document.createElement("span");
//   estimate.innerHTML = `<p>Est.time: ${todoEst.value} ${todoEstValue.value}</p>`;

//   todoCard.append(estimate);
//   status.append(statusP);
//   todoCard.append(status);
//   todoCard.append(todoName);
//   todoCard.append(description);
//   todoList.append(todoCard);
//   console.log(todoCard);
// });
// ...
/* ----------- LOGIN FUNKTIONALITET -------------- */

const loginUsernameInput = document.querySelector("#loginUsername");
const loginPasswordInput = document.querySelector("#loginPassword");
const loginRegisterBtn = document.querySelector(".loginRegisterBtn");
const loginBtn = document.querySelector(".loginBtn");
const loginHeader = document.querySelector("#loginHeader");
const loginHeaderH1 = document.querySelector("#loginHeaderH1");

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
    console.log("user found: " + user);
    window.location.href = "index.html";
    loginHeaderH1.textContent = `Welcome ${user.username}`;
    // h2.textContent = `Welcome ${user.username}`;
  } else {
    h2.textContent = `Failed 2 login`;
  }
});

/* ----------- LOGIN FUNKTIONALITET SLUT ---------- */

/* ------------------- Habits ---------------------- */

// const inputHabit = document.querySelector("#habitInput");
// const lowBtn = document.querySelector("#low");
// const mediumBtn = document.querySelector("#medium");
// const highBtn = document.querySelector("#high");
// const addHabit = document.querySelector("#addHabitBtn");
// const habitCardContainer = document.querySelector("#habitCard-container")

// addHabit.addEventListener("click", () => {
//     let habitCard = document.createElement("div");
//     let habitName = document.createElement("h4");
//     habitName.innerText = inputHabit.value;

// addHabit.addEventListener("click", ()=>{

// })
