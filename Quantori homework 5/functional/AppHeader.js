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

function SearchInput() {
  const searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("placeholder", "Search Task");
  searchInput.classList.add("header__input");

  return searchInput;
}

function Header() {
  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  const searchInput = SearchInput();
  const newTaskButton = NewTaskButton();
  const div = document.createElement("div");

  div.append(searchInput, newTaskButton);
  div.classList.add("header__container", "flex");
  header.classList.add("header", "flex");
  h1.textContent = "To Do List";

  header.append(h1, div);

  return header;
}
