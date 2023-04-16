function App(tasks, setTasks) {
  function addTask(task) {
    tasks.push(task);
    renderApp(tasks, setTasks);

    fetch(`${DBurl}tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  }

  function removeTask(removeTask) {
    selectedTask = tasks.find(
      (task) => Number(task.id) === Number(removeTask.id)
    );
    tasks = tasks.filter((task) => task.id !== selectedTask.id);
    renderApp(tasks, setTasks);
    fetch(`${DBurl}tasks/${removeTask.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function markTask(markedTask) {
    selectedTask = tasks.find(
      (task) => Number(task.id) === Number(markedTask.id)
    );

    selectedTask.completed = !selectedTask.completed;
    renderApp(tasks, setTasks);
    fetch(`${DBurl}tasks/${selectedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedTask),
    });
  }

  const uncompletedTasks = filterUncompletedTasks(tasks, search);

  const completedTasks = filterCompletedTasks(tasks, search);

  const div = document.createElement("div");
  const form = Form({ addTask });
  const header = Header(removeTask, markTask, tasks);
  const list = List({ uncompletedTasks, removeTask, markTask });
  const completed = Completed({ completedTasks, removeTask, markTask });

  div.append(header, list, completed, form);

  return div;
}
