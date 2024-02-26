const todoTitle = document.querySelector("#todoName");
const addTodoBtn = document.querySelector("#addTodo");

const todoDesc = document.querySelector("#todoDesc");
const todoDate = document.querySelector("#todoDate");

const todoEstValue = document.querySelector("#estTime");
const todoEst = document.querySelector("#todoEstimate");

const todoCategory = document.querySelector("#todoCategory");
const todoList = document.querySelector(".your-todo");
const allTodoCategories = document.querySelectorAll(
  "input[type='checkbox'][name='todo-category']"
);
const allCategBtn = document.querySelector("#selectAllCateg");

const sortFilter = document.querySelector("#riseFall");
const deadlineCheck = document.querySelector("#deadlineEst");
const timeCheck = document.querySelector("#timeEst");

const filterTodo = document.querySelector("#filterTodo");
const todoFilterReset = document.querySelector("#todoFilterReset");
const toggleFilterBtn = document.querySelector("#toggleFilter");
const filterContainer = document.querySelector(".filter-todo");

toggleFilterBtn.addEventListener("click", () => {
  filterContainer.classList.toggle("collapsed");
  filterContainer.classList.toggle("expanded");
});

let userTodo = [];

const createTodoItem = (
  title,
  description,
  estimation,
  estimationUnit,
  deadline,
  category,
  cardID
) => {
  //Create CardID
  //Create Todo-card
  const todoCard = createDiv("todo");
  cardID = Math.floor(1000 + Math.random() * 9000);
  todoCard.classList.add(cardID);
  //Add divs for structure in To-do card
  let upperTodo = createDiv("upperCard");

  let middleTodo = createDiv("middleCard");

  let lowerTodo = createDiv("lowerCard");

  // Append to upper card position
  let status = createDiv("todoStatus");
  let statusText = "To-do";
  status.innerHTML = `<span>${statusText}</span>
  <span>Est. time: <span>${estimation}</span> ${estimationUnit}</span>
  <span>Deadline: <span>${deadline}</span></span>`;

  //Append to mid card position
  let todoDetails = createDiv("todoDetails");

  todoDetails.innerHTML = `<h4>${title}</h4>
  <p>${description}</p>
  <span>${category}</span>
  `;
  //Append to lower card position
  const doneBtn = createButton("Done", "todoDoneBtn");
  const editBtn = createButton("Edit", "todoEditBtn");
  const deleteBtn = createButton("Delete", "todoDeleteBtn");

  editBtn.addEventListener("click", () => {
    if (editBtn.innerText === "Edit") {
      editBtn.innerText = "Save";
      todoDetails.innerHTML = "";
      todoDetails.innerHTML = `<input id="titleEdit" type="text" value="${title}" />
        <input type="text"  id="descEdit" value="${description}"/>
        <select id="categEdit">
                <option value="Health">Health</option>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Work">Work</option>
                <option value="Music">Music</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>`;
    } else {
      const titleEdit = document.getElementById("titleEdit");
      const descEdit = document.getElementById("descEdit");
      const categEdit = document.getElementById("categEdit");
      todoDetails.innerHTML = `<h4>${titleEdit.value}</h4>
      <p>${descEdit.value}</p>
      <span>${categEdit.value}</span>
      `;
    }
  });
  doneBtn.addEventListener("click", () => {
    const lowTodo = doneBtn.parentElement;
    const status = lowTodo.parentElement.querySelector(
      ".todoStatus > span:first-child"
    );
    status.textContent = "Done";
    doneBtn.parentElement.parentElement.classList.add("todo-done");
    doneBtn.remove();
  });

  let allUserTodos = {
    userID: currentID,
    status: statusText,
    title: title,
    description: description,
    estTime: estimation,
    estUnit: estimationUnit,
    deadline: deadline,
    category: category,
    cardID: cardID,
  };
  let uniqueCardID = allUserTodos.cardID;
  deleteBtn.addEventListener("click", () => {
    deleteBtn.parentElement.parentElement.remove();
    const uniqueClass = deleteBtn.parentElement.parentElement.classList[1];

    let todoCards = JSON.parse(localStorage.getItem("userTodo")) || [];

    todoCards.forEach((card) => console.log(card.cardID));
    const updatedTodoList = todoCards.filter((item) => {
      return item.cardID !== +uniqueClass;
    });

    localStorage.setItem("userTodo", JSON.stringify(updatedTodoList));
  });

  upperTodo.append(status);
  middleTodo.append(todoDetails);
  lowerTodo.append(doneBtn, editBtn, deleteBtn);
  todoCard.append(upperTodo, middleTodo, lowerTodo);
  console.log(todoCard);

  userTodo.push(allUserTodos);
  console.log(userTodo);
  localStorage.setItem("userTodo", JSON.stringify(userTodo));

  return todoCard;
};

let currentID = localStorage.getItem("currentUserId");
const getTodoData = () => {
  let parsedUserTodo = JSON.parse(localStorage.getItem("userTodo") || "[]");
  console.log(currentID);
  parsedUserTodo.forEach((todo) => {
    console.log(todo);
    console.log(todo.userID);
    console.log(currentID);
    if (todo.userID === currentID) {
      let localTodo = createTodoItem(
        todo.title,
        todo.description,
        todo.estTime,
        todo.estUnit,
        todo.deadline,
        todo.category,
        todo.cardID
      );
      console.log(localTodo);
      todoList.append(localTodo);
    }
  });
  /*
    title,
  description,
  estimation,
  estimationUnit,
  deadline,
  category
) => {*/
};

sortFilter.addEventListener("change", () => {
  let filter = sortFilter.value;
  //Call the timesort function
  timeSort(filter);
});

const timeSort = (filter) => {
  console.log(filter);
  //Get an array of all the cards in the DOM
  const todoCards = Array.from(todoList.getElementsByClassName("todo"));

  todoCards.sort((a, b) => {
    const timeA = extractTimeDate(a);
    const timeB = extractTimeDate(b);
    console.log(timeA);
    //Check if sorting by rising or falling order
    if (filter === "rising") {
      return timeA - timeB;
    } else if (filter === "falling") {
      return timeB - timeA;
    }
  });
  //Clear and append the cards according to new order
  todoList.innerHTML = "";
  todoCards.forEach((card) => {
    todoList.appendChild(card);
  });
};

const extractTimeDate = (todoCard) => {
  //Check which checkbox is checked in sorting and sort according to

  if (timeCheck.checked) {
    const details = todoCard.querySelector(
      ".todoStatus span:nth-child(2) > span"
    );
    if (!details) return 0;
    const estText = details.textContent;
    const [estimation, _] = estText.split(" ");
    return parseInt(estimation) || 0;
  }
  if (deadlineCheck.checked) {
    const details = todoCard.querySelector(
      ".todoStatus span:nth-child(3) > span"
    );
    if (!details) return 0;
    const estText = details.textContent;
    const deadlineDate = new Date(estText);

    if (isNaN(deadlineDate.getTime())) {
      console.error("Invalid date format:", deadlineDate);
      return null;
    }
    return deadlineDate;
  }
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
  console.log("start");
  const deadline = todoDate.value;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (new Date(deadline) < new Date(today)) {
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
  const category = todoCategory.value;
  console.log(estimation);

  const todoItem = createTodoItem(
    title,
    description,
    estimation,
    estimationUnit,
    deadline,
    category
  );
  todoList.append(todoItem);
  console.log(todoItem);
});

const filterTodoItems = (todoStatus, todoCategory) => {
  todoList.querySelectorAll(".todo").forEach((todo) => {
    const cardCategory = todo.querySelector(".todoDetails > span").textContent;
    const cardStatus = todo.querySelector(".todoStatus > span").textContent;

    let matchCategory = Array.from(todoCategory).some(
      (cat) => cat.value === cardCategory
    );

    let matchStatus = Array.from(todoStatus).some(
      (status) => status.value === cardStatus
    );

    if (matchStatus && matchCategory) {
      todo.style.display = "block";
    } else {
      todo.style.display = "none";
    }

    // }
  });
};

allCategBtn.addEventListener("click", () => {
  allTodoCategories.forEach((box) => {
    box.checked = true;
  });
});

filterTodo.addEventListener("click", () => {
  const filterTodoStat = document.querySelectorAll(
    "input[type='checkbox'][name='todoStatus']:checked"
  );
  const filterTodoCateg = document.querySelectorAll(
    "input[type='checkbox'][name='todo-category']:checked"
  );
  filterTodoItems(filterTodoStat, filterTodoCateg);
});

todoFilterReset.addEventListener("click", () => {
  allTodoCategories.forEach((box) => {
    box.checked = false;
  });
  const status = document.querySelectorAll(
    "input[type='checkbox'][name='todoStatus']"
  );
  status.forEach((stat) => {
    stat.checked = false;
  });
});

getTodoData();
