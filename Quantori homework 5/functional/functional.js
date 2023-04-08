(function () {
  let state = undefined;

  function useState(initialValue) {
    state = state || initialValue;

    function setValue(newValue) {
      state = newValue;
      renderApp();
    }

    return [state, setValue];
  }

  function List({ tasks }) {
    const listTasks = tasks
      .map(
        (task) =>
          `<li class="tasks__list flex">
            <div class="tasks__containter flex">
                <h2 class="tasks__text">${task.task}</h2>
                <div class="tasks__info flex">
                    <p class="tasks__info--${task.info}" >${task.info}</p>
                    <p class="tasks__info--time">${task.date}</p>
                </div>
            </div>
            <img class="tasks__delete" src="images/delete.svg">
          </li>`
      )
      .join("");

    const div = document.createElement("div");
    const ul = document.createElement("ul");
    const h2 = document.createElement("h2");

    h2.innerText = "All Tasks";
    h2.classList.add("tasks__h2");
    ul.classList.add("tasks__ul", "flex");
    ul.innerHTML = listTasks;
    div.classList.add("tasks");

    div.append(h2, ul);

    return div;
  }

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

  function App() {
    const [tasks, setTasks] = useState([
      {
        task: "gio",
        info: "work",
        date: "Friday, 23 Mar",
      },
      {
        task: "ana",
        info: "health",
        date: "Friday, 23 Mar",
      },
      {
        task: "irakli",
        info: "other",
        date: "Friday, 23 Mar",
      },
      {
        task: "mari",
        info: "home",
        date: "Friday, 23 Mar",
      },
    ]);

    function addTask(task) {
      setTasks([...tasks, task]);
    }

    const div = document.createElement("div");
    const form = Form({ addTask });
    const header = Header();
    const list = List({ tasks });

    div.append(header, list, form);

    return div;
  }

  /**
   * Render the app.
   * On change whole app is re-rendered.
   */
  function renderApp() {
    const appContainer = document.querySelector("body");
    appContainer.innerHTML = "";
    appContainer.append(App());
  }
  // initial render
  renderApp();
})();
