const todoTitle = document.querySelector("#todoName");
const addTodoBtn = document.querySelector("#addTodo");
const todoDesc = document.querySelector("#todoDesc");
const todoDate = document.querySelector("#todoDate");
const todoEstValue = document.querySelector("#estTime");
const todoEst = document.querySelector("#todoEstimate");
const todoCategory = document.querySelector("#todoCategory");

addTodoBtn.addEventListener("click", () => {
  console.log(todoTitle.value);
  console.log(todoDesc.value);
  console.log(todoDate.value);
  console.log(todoEst.value);
  console.log(todoEstValue.value);
  console.log(todoCategory.value);
});
