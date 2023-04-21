import { convertDate, addLisenersToButtons } from "./helpers";
import { filterCompletedTasks } from "./helpers";
import state from "./state";
import { Task } from "./state";

import checkSVG from "../images/check.svg";
import deleteSVG from "../images/delete.svg";

function Completed({
  completedTasks: tasks,
  deleteTask,
  updateTask,
}: {
  completedTasks: Task[];
  deleteTask: Function;
  updateTask: Function;
}) {
  const listTasks = tasks
    .map(
      (task) =>
        `<li class="completed-tasks__list flex" id=${task.id}>
              <div class="flex">
                <img class="completed-tasks__check completed-tasks__check--active" src="${checkSVG}">
                <div class="completed-tasks__containter flex">
                    <h2 class="completed-tasks__text">${task.task}</h2>
                    <div class="completed-tasks__info flex">
                        <p class="completed-tasks__info--type" >${task.info}</p>
                        <p class="completed-tasks__info--time">${convertDate(
                          task.date
                        )}</p>
                    </div>
                </div>
              </div>
              <img class="completed-tasks__delete" src="${deleteSVG}">
            </li>`
    )
    .join("");

  const div = document.createElement("div");
  const ul = document.createElement("ul");
  const h2 = document.createElement("h2");

  h2.innerText = "Completed Tasks";
  h2.classList.add("completed-tasks__h2");
  ul.classList.add("completed-tasks__ul", "flex");
  ul.innerHTML = listTasks;
  div.classList.add("completed-tasks");

  div.append(h2, ul);

  addLisenersToButtons(
    ".completed-tasks__delete",
    ".completed-tasks__list",
    deleteTask
  );
  addLisenersToButtons(
    ".completed-tasks__check",
    ".completed-tasks__list",
    updateTask
  );

  return div;
}
function renderCompletedTasks(
  tasks: Task[],
  deleteTask: Function,
  updateTask: Function
) {
  const appContainer = document.querySelector(".completed-tasks")!;
  appContainer.innerHTML = "";
  const completedTasks = filterCompletedTasks(tasks, state.search);
  appContainer.append(Completed({ completedTasks, deleteTask, updateTask }));
}

export { Completed, renderCompletedTasks };
