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

  function App() {
    const [tasks, setTasks] = useState(
      JSON.parse(localStorage.getItem("tasks")) || []
    );

    function addTask(task) {
      setTasks([...tasks, task]);
      localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
    }

    function removeTask(removeTask) {
      localStorage.setItem(
        "tasks",
        JSON.stringify([
          ...tasks.filter((task) => Number(task.id) !== Number(removeTask.id)),
        ])
      );
      setTasks([
        ...tasks.filter((task) => Number(task.id) !== Number(removeTask.id)),
      ]);
    }

    function markTask(markedTask) {
      const task = tasks.find(
        (task) => Number(task.id) === Number(markedTask.id)
      );
      task.completed = !task.completed;
      setTasks([...tasks]);
      localStorage.setItem("tasks", JSON.stringify([...tasks]));
    }

    const uncompletedTasks = tasks
      .filter((task) => !task.completed)
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
    const completedTasks = tasks
      .filter((task) => task.completed)
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });

    const div = document.createElement("div");
    const form = Form({ addTask });
    const header = Header();
    const list = List({ uncompletedTasks, removeTask, markTask });
    const completed = Completed({ completedTasks, removeTask, markTask });

    div.append(header, list, completed, form);

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
