const todoTitle = document.querySelector("#todoName");
const addTodoBtn = document.querySelector("#addTodo");
const addTodoContainer = document.querySelector(".add-todo");

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
const toggleAddcardCont = document.querySelector("#collapse");
const deadlineCheck = document.querySelector("#deadlineEst");
const timeCheck = document.querySelector("#timeEst");

const filterTodo = document.querySelector("#filterTodo");
const todoFilterReset = document.querySelector("#todoFilterReset");
const toggleFilterBtn = document.querySelector("#toggleFilter");
const filterContainer = document.querySelector(".filter-todo");

toggleAddcardCont.addEventListener("click", () => {
  if (addTodoContainer.classList.contains("expanded")) {
    toggleAddcardCont.innerHTML =
      "Add To-dos <i class='fa-solid fa-angles-down'></i>";
    if (toggleAddcardCont.classList.contains("exp")) {
      toggleAddcardCont.classList.toggle("coll");
    }
    toggleAddcardCont.classList.add("coll");
    toggleAddcardCont.classList.remove("exp");
  } else {
    toggleAddcardCont.classList.remove("coll");
    toggleAddcardCont.classList.add("exp");
    toggleAddcardCont.innerHTML =
      "Collapse <i class='fa-solid fa-angles-up'></i>";
  }
  addTodoContainer.classList.toggle("expanded");
  addTodoContainer.classList.toggle("collapsed");
});

toggleFilterBtn.addEventListener("click", () => {
  if (filterContainer.classList.contains("collapsed")) {
    // If collapsed, change to expanded icon
    toggleFilterBtn.innerHTML =
      "Filtering <i class='fa-solid fa-angles-up'></i>";
  } else {
    // If expanded, change to collapsed icon
    toggleFilterBtn.innerHTML =
      "Filtering <i class='fa-solid fa-angles-down'></i>";
  }
  filterContainer.classList.toggle("collapsed");
  filterContainer.classList.toggle("expanded");
});

let userTodo = [];

const createTodoItem = (
  title,
  cardStatus,
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
  if (cardStatus === "Done") {
    todoCard.classList.add("todo-done");
  }
  cardID = Math.floor(1000 + Math.random() * 9000);
  todoCard.classList.add(cardID);
  //Add divs for structure in To-do card
  let upperTodo = createDiv("upperCard");

  let middleTodo = createDiv("middleCard");

  let lowerTodo = createDiv("lowerCard");

  // Append to upper card position
  let status = createDiv("todoStatus");
  let statusText = cardStatus;
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
  if (cardStatus === "Done") {
    doneBtn.style.display = "none";
  }

  editBtn.addEventListener("click", () => {
    const parentElement = editBtn.parentElement.parentElement;
    const uniqueCard = parentElement.classList.contains("todo-done")
      ? parentElement.classList[2]
      : parentElement.classList[1];
    console.log("EditBtn " + parentElement.classList[1]);
    const editStatus = todoCard.querySelector(".todoStatus span").textContent;
    if (editBtn.innerText === "Edit") {
      editBtn.textContent = "Save";
      todoDetails.innerHTML = "";
      todoDetails.innerHTML = `<p>Title:</p>
      <input id="titleEdit" type="text" value="${title}"/>
      <p>Desc:</p>
        <input type="text"  id="descEdit" value="${description}"/>
        <p>Categ:</p>
        <select id="categEdit">
                <option value="Health">Health</option>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Work">Work</option>
                <option value="Music">Music</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>`;
      status.innerHTML = `<span>${editStatus}</span>
                <span>Est. time:</span>
              <input id="estiTime" type="text" value="${estimation}"/>
              <select id="estiValue">
                <option value="Minutes">Minutes</option>
                <option value="Days">Days</option>
               />
               </select>`;
    } else {
      editBtn.textContent = "Edit";
      const titleEdit = document.getElementById("titleEdit").value;
      const descEdit = document.getElementById("descEdit").value;
      const categEdit = document.getElementById("categEdit").value;
      const getEstTime = document.getElementById("estiTime").value;
      const getEstValue = document.getElementById("estiValue").value;

      todoDetails.innerHTML = `<h4>${titleEdit}</h4>
      <p>${descEdit}</p>
      <span>${categEdit}</span>
      `;

      `<span>${statusText}</span>
  <span>Est. time: <span>${estimation}</span> ${estimationUnit}</span>
  <span>Deadline: <span>${deadline}</span></span>`;

      status.innerHTML = `<span>${editStatus}</span>
      <span>Est. time: <span>${getEstTime}</span>
            ${getEstValue}</span></span>
            <span>Deadline: <span>${deadline}</span></span>`;
      console.log(userTodo);

      const editedCard = {
        userID: currentID,
        status: editStatus,
        title: titleEdit,
        description: descEdit,
        estimation: getEstTime,
        estimationUnit: getEstValue,
        deadline,
        category: categEdit,
        cardID: uniqueCard,
      };
      console.log(editedCard.estimation);
      //Update localStorage list of todos

      let todoLocalCards = JSON.parse(localStorage.getItem("userTodo")) || [];
      console.log(todoLocalCards);
      todoLocalCards.forEach((card, index) => {
        if (card.cardID === +uniqueCard) {
          todoLocalCards[index] = editedCard;
        }
      });
      console.log(editedCard);

      //CREATE A FUNCTION THAT UPDATES LOCALSTORAGE!!!!!!!!!!
      console.log(todoLocalCards);
      localStorage.setItem("userTodo", JSON.stringify(todoLocalCards));
    }
  });
  doneBtn.addEventListener("click", () => {
    const lowTodo = doneBtn.parentElement;
    const status = lowTodo.parentElement.querySelector(
      ".todoStatus > span:first-child"
    );
    //Get current todos from localStorage
    status.textContent = "Done";
    let localCards = JSON.parse(localStorage.getItem("userTodo")) || [];
    const parentElement = editBtn.parentElement.parentElement;
    const todoID = parentElement.classList.contains("todo-done")
      ? parentElement.classList[2]
      : parentElement.classList[1];
    console.log("DoneBtn " + parentElement.classList);
    // const uniqueCard = parentElement.classList.contains("todo-done")
    //   ? parentElement.classList[2]
    //   : parentElementclassList[1];
    console.log(todoID, localCards);
    localCards.forEach((todo) => {
      const todoIndex = localCards.findIndex((todo) => todo.cardID === +todoID);
      console.log(todoIndex);
      console.log(localCards[todoIndex].status);
      localCards[todoIndex].status = "Done";
      console.log(localCards[todoIndex].status);
      localStorage.setItem("userTodo", JSON.stringify(localCards));
    });

    console.log(localCards);

    // console.log(localCards, cardID);
    // let state = document.querySelector(".todoStatus > span");
    // console.log(state.textContent);

    doneBtn.parentElement.parentElement.classList.add("todo-done");
    doneBtn.remove();
  });

  let allUserTodos = {
    userID: currentID,
    status: statusText,
    title,
    description,
    estimation,
    estimationUnit,
    deadline,
    category,
    cardID,
  };

  deleteBtn.addEventListener("click", () => {
    deleteBtnFunc(deleteBtn);
    deleteBtn.parentElement.parentElement.remove();
  });

  upperTodo.append(status);
  middleTodo.append(todoDetails);
  lowerTodo.append(doneBtn, editBtn, deleteBtn);
  todoCard.append(upperTodo, middleTodo, lowerTodo);

  userTodo.push(allUserTodos);
  localStorage.setItem("userTodo", JSON.stringify(userTodo));

  return todoCard;
};

//delete and edit button function

const deleteBtnFunc = (button) => {
  const btn = button.innerText;
  let cardId = button.parentElement.parentElement.classList[1];
  if (cardId === "todo-done") {
    console.log("Done todo, changing ID.");
    cardId = button.parentElement.parentElement.classList[2];
    console.log(cardId);
  }
  let todoCards = JSON.parse(localStorage.getItem("userTodo")) || [];

  todoCards.forEach((card) => console.log(card.cardID, cardId));
  const updatedTodoList = todoCards.filter((item) => {
    return item.cardID !== +cardId;
  });
  localStorage.setItem("userTodo", JSON.stringify(updatedTodoList));
  console.log(updatedTodoList);
  return;
};

let currentID = localStorage.getItem("currentUserId");

const getTodoData = () => {
  let parsedUserTodo = JSON.parse(localStorage.getItem("userTodo") || "[]");

  parsedUserTodo.forEach((todo) => {
    if (todo.userID === currentID) {
      let localTodo = createTodoItem(
        todo.title,
        todo.status,
        todo.description,
        todo.estimation,
        todo.estimationUnit,
        todo.deadline,
        todo.category,
        todo.cardID
      );

      todoList.append(localTodo);
    }
  });
};

sortFilter.addEventListener("change", () => {
  let filter = sortFilter.value;
  //Call the timesort function
  timeSort(filter);
});

const timeSort = (filter) => {
  console.log(filter);
  //Get an array of all the cards in the DOM
  console.log(todoList);
  const todoCards = Array.from(todoList.getElementsByClassName("todo"));
  console.log(todoCards);
  todoCards.sort((a, b) => {
    console.log(a, b);
    const timeA = extractTimeDate(a);
    const timeB = extractTimeDate(b);

    console.log("current estimate:", timeA, timeB);
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
    console.log(details);
    if (!details) return 0;
    const estText = details.textContent;
    const [estimation, _] = estText.split(" ");
    console.log(estimation);
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

todoEstValue.addEventListener("change", () => {
  if (todoEstValue.value === "Days") {
    const deadlineDate = new Date(todoDate.value);
    const today = new Date();
    const estEndDate = new Date(
      today.getTime() + todoEst.value * 24 * 60 * 60 * 1000
    );

    if (estEndDate > deadlineDate) {
      errorDays.style.display = "block";
    } else {
      errorDays.style.display = "none";
    }
  } else {
    errorDays.style.display = "none";
  }
});

addTodoBtn.addEventListener("click", () => {
  const title = todoTitle.value;
  const cardStatus = "To-do";
  const description = todoDesc.value;
  const estimation = todoEst.value;
  const estimationUnit = todoEstValue.value;
  const deadline = todoDate.value;
  const category = todoCategory.value;

  const todoItem = createTodoItem(
    title,
    cardStatus,
    description,
    estimation,
    estimationUnit,
    deadline,
    category
  );
  todoList.append(todoItem);
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
