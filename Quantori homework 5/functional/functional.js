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

  const uncompletedTasks = filterUncompletedTasks(tasks, search);

  const completedTasks = filterCompletedTasks(tasks, search);

  const div = document.createElement("div");
  const form = Form({ addTask });
  const header = Header(removeTask, markTask);
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
(function () {
  renderApp();
})();
