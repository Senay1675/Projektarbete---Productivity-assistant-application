const todoTitle = document.querySelector("#todoName");
const addTodoBtn = document.querySelector("#addTodo");

const todoDesc = document.querySelector("#todoDesc");
const todoDate = document.querySelector("#todoDate");

const todoEstValue = document.querySelector("#estTime");
const todoEst = document.querySelector("#todoEstimate");

const todoCategory = document.querySelector("#todoCategory");
const todoList = document.querySelector(".your-todo");

const sortFilter = document.querySelector("#riseFall");
const deadlineCheck = document.querySelector("#deadlineEst");
const timeCheck = document.querySelector("#timeEst");
console.log(deadlineCheck.checked, timeCheck.checked);

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
  <span>Est. time: <span>${estimation}</span> ${estimationUnit}</span>
  <span>Deadline: <span>${deadline}</span></span>`;

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

sortFilter.addEventListener("change", () => {
  let filter = sortFilter.value;
  timeSort(filter);
});

const deadlineSort = (filter) => {
  console.log(filter);
  const todoCards = Array.from(todoList.getElementsByClassName("todo"));

  todoCards.sort((a, b) => {
    const timeA = extractTimeDate(a);
    const timeB = extractTimeDate(b);
    console.log(timeA);
    if (filter === "rising") {
      return timeA - timeB;
    } else if (filter === "falling") {
      return timeB - timeA;
    }
  });

  todoList.innerHTML = "";
  todoCards.forEach((card) => {
    todoList.appendChild(card);
  });
};

const timeSort = (filter) => {
  console.log(filter);
  const todoCards = Array.from(todoList.getElementsByClassName("todo"));

  todoCards.sort((a, b) => {
    const timeA = extractTimeDate(a);
    const timeB = extractTimeDate(b);
    console.log(timeA);
    if (filter === "rising") {
      return timeA - timeB;
    } else if (filter === "falling") {
      return timeB - timeA;
    }
  });

  todoList.innerHTML = "";
  todoCards.forEach((card) => {
    todoList.appendChild(card);
  });
};

const extractTimeDate = (todoCard) => {
  if (timeCheck.checked) {
    const details = todoCard.querySelector(
      ".todoStatus span:nth-child(2) > span"
    );
    console.log(details);
    if (!details) return 0;
    console.log(details);
    const estText = details.textContent;
    console.log(estText);
    const [estimation, _] = estText.split(" ");
    return parseInt(estimation) || 0;
  }
  if (deadlineCheck.checked) {
    const details = todoCard.querySelector(
      ".todoStatus span:nth-child(3) > span"
    );
    console.log(details);
    if (!details) return 0;

    const estText = details.textContent;
    console.log(estText);

    const deadlineDate = new Date(estText);
    console.log(deadlineDate);

    if (isNaN(deadlineDate.getTime())) {
      console.error("Invalid date format:", deadline);
      return null;
    }
    return deadlineDate;
  }
};

const extractTodoDate = (todoCard) => {
  const details = todoCard.querySelector("");
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
  const estimation = todoEst.value;
  const estimationUnit = todoEstValue.value;
  const deadline = todoDate.value;
  console.log(estimation);

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

//   localStorage.setItem("name", loginUsernameInput.value);
// });

/* ----------- LOGIN FUNKTIONALITET SLUT ---------- */

// const inputHabit = document.querySelector("#habitInput");
// const lowBtn = document.querySelector("#low");
// const mediumBtn = document.querySelector("#medium");
// const highBtn = document.querySelector("#high");
// const addHabit = document.querySelector("addHabitBtn");

// addHabit.addEventListener("click", () => {});
