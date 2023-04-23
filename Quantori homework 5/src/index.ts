import config from "./config";
import state from "./state";
import Form from "./AddForm";
import { List } from "./TasksList";
import { Completed } from "./CompletedTasks";
import { filterCompletedTasks, filterUncompletedTasks } from "./helpers";
import Header from "./AppHeader";
import { Task } from "./interfaces";

import "../index.css";

function App(tasks: Task[], setTasks: Function) {
  function addTask(task: Task): void {
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

  function deleteTask(task: Task) {
    const selectedTask = tasks.find(
      (task) => Number(task.id) === Number(task.id)
    )!;
    tasks = tasks.filter((task) => task.id !== selectedTask.id);
    state.renderApp(tasks, setTasks);
    fetch(`${config.DBurl}tasks/${task.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function updateTask(task: Task) {
    const selectedTask = tasks.find(
      (task) => Number(task.id) === Number(task.id)
    )!;

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
  const form = Form(addTask);
  const header = Header(deleteTask, updateTask, tasks);
  const list = List({ uncompletedTasks, deleteTask, updateTask });
  const completed = Completed({ completedTasks, deleteTask, updateTask });

  div.append(header, list, completed, form);

  return div;
}

export default App;
