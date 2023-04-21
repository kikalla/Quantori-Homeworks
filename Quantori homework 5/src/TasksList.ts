import { convertDate, addLisenersToButtons } from "./helpers";
import { filterUncompletedTasks } from "./helpers";
import state from "./state";
import { Task } from "./state";

import checkSVG from "../images/check.svg";
import deleteSVG from "../images/delete.svg";

function List({
  uncompletedTasks: tasks,
  deleteTask,
  updateTask,
}: {
  uncompletedTasks: Task[];
  deleteTask: Function;
  updateTask: Function;
}) {
  const listTasks = tasks
    .map(
      (task) =>
        `<li class="tasks__list flex" id=${task.id}>
            <div class="flex">
              <img class="tasks__check" src="${checkSVG}">
              <div class="tasks__containter flex">
                  <h2 class="tasks__text">${task.task}</h2>
                  <div class="tasks__info flex">
                      <p class="tasks__info--${task.info}" >${task.info}</p>
                      <p class="tasks__info--time">${convertDate(task.date)}</p>
                  </div>
              </div>
            </div>
            <img class="tasks__delete" src="${deleteSVG}">
          </li>`
    )
    .join("");

  const tasksWrapper = document.createElement("div");
  const tasksList = document.createElement("ul");
  const tasksTitle = document.createElement("h2");

  tasksTitle.innerText = "All Tasks";
  tasksTitle.classList.add("tasks__title");
  tasksList.classList.add("tasks__ul", "flex");
  tasksList.innerHTML = listTasks;
  tasksWrapper.classList.add("tasks");

  tasksWrapper.append(tasksTitle, tasksList);

  addLisenersToButtons(".tasks__delete", ".tasks__list", deleteTask);
  addLisenersToButtons(".tasks__check", ".tasks__list", updateTask);

  return tasksWrapper;
}

function renderTasks(
  tasks: Task[],
  deleteTask: Function,
  updateTask: Function
) {
  const appContainer = document.querySelector(".tasks")!;
  appContainer.innerHTML = "";
  const uncompletedTasks = filterUncompletedTasks(tasks, state.search);
  appContainer.append(List({ uncompletedTasks, deleteTask, updateTask }));
}

export { List, renderTasks };
