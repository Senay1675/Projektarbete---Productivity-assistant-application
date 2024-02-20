const todoTitle = document.querySelector("#todoName");
const addTodoBtn = document.querySelector("#addTodo");
const todoDesc = document.querySelector("#todoDesc");
const todoDate = document.querySelector("#todoDate");
const todoEstValue = document.querySelector("#estTime");
const todoEst = document.querySelector("#todoEstimate");
const todoCategory = document.querySelector("#todoCategory");
const todoList = document.querySelector(".your-todo");

addTodoBtn.addEventListener("click", () => {
  let todoCard = document.createElement("div");
  todoCard.classList.add("todo");
  let status = document.createElement("div");
  status.classList.add("todoStatus");
  let statusP = document.createElement("span");
  statusP.textContent = "To-do";
  let todoName = document.createElement("h4");
  todoName.textContent = todoTitle.value;
  let description = document.createElement("p");
  description.textContent = todoDesc.value;
  let estimate = document.createElement("span");
  estimate.innerHTML = `<p>Est.time: ${todoEst.value} ${todoEstValue.value}</p>`;

  todoCard.append(estimate);
  status.append(statusP);
  todoCard.append(status);
  todoCard.append(todoName);
  todoCard.append(description);
  todoList.append(todoCard);
  console.log(todoCard);
});
