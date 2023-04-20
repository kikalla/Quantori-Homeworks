import config from "./config.js";
import state from "./state.js";
import Form from "./AddForm.js";
import { List } from "./TasksList.js";
import { Completed } from "./CompletedTasks.js";
import { filterCompletedTasks, filterUncompletedTasks } from "./helpers.js";
import Header from "./AppHeader.js";

import "../index.css";

function App(tasks, setTasks) {
  function addTask(task) {
    tasks.push(task);
    state.renderApp(tasks, setTasks);

    fetch(`${config.DBurl}tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  }

  function removeTask(removeTask) {
    const selectedTask = tasks.find(
      (task) => Number(task.id) === Number(removeTask.id)
    );
    tasks = tasks.filter((task) => task.id !== selectedTask.id);
    state.renderApp(tasks, setTasks);
    fetch(`${config.DBurl}tasks/${removeTask.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function markTask(markedTask) {
    const selectedTask = tasks.find(
      (task) => Number(task.id) === Number(markedTask.id)
    );

    selectedTask.completed = !selectedTask.completed;
    state.renderApp(tasks, setTasks);
    fetch(`${config.DBurl}tasks/${selectedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedTask),
    });
  }

  const uncompletedTasks = filterUncompletedTasks(tasks, state.search);

  const completedTasks = filterCompletedTasks(tasks, state.search);

  const div = document.createElement("div");
  const form = Form({ addTask });
  const header = Header(removeTask, markTask, tasks);
  const list = List({ uncompletedTasks, removeTask, markTask });
  const completed = Completed({ completedTasks, removeTask, markTask });

  div.append(header, list, completed, form);

  return div;
}

export default App;
