function NewTaskButton() {
  const newTaskButton = document.createElement("button");
  newTaskButton.classList.add("header__button");
  newTaskButton.innerText = "+ New Task";

  newTaskButton.addEventListener("click", (e) => {
    const form = document.querySelector(".form");

    e.preventDefault();
    form.classList.remove("hidden");
  });

  return newTaskButton;
}

function SearchInput(removeTask, markTask) {
  const searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("placeholder", "Search Task");
  searchInput.classList.add("header__input");
  searchInput.value = search;

  searchInput.addEventListener("input", (e) => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    search = e.target.value;
    renderTasks(tasks, removeTask, markTask);
    renderCompletedTasks(tasks, removeTask, markTask);
  });

  return searchInput;
}

function Header(removeTask, markTask) {
  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  const searchInput = SearchInput(removeTask, markTask);
  const newTaskButton = NewTaskButton();
  const div = document.createElement("div");

  div.append(searchInput, newTaskButton);
  div.classList.add("header__container", "flex");
  header.classList.add("header", "flex");
  h1.textContent = "To Do List";

  header.append(h1, div);

  return header;
}
