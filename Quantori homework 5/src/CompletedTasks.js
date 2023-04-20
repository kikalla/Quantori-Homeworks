import { convertDate, addLisenersToButtons } from "./helpers.js";
import { filterCompletedTasks } from "./helpers.js";
import state from "./state.js";

function Completed({ completedTasks: tasks, removeTask, markTask }) {
  const listTasks = tasks
    .map(
      (task) =>
        `<li class="completed-tasks__list flex" id=${task.id}>
              <div class="flex">
                <img class="completed-tasks__check completed-tasks__check--active" src="images/check.svg">
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
              <img class="completed-tasks__delete" src="images/delete.svg">
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
    removeTask
  );
  addLisenersToButtons(
    ".completed-tasks__check",
    ".completed-tasks__list",
    markTask
  );

  return div;
}
function renderCompletedTasks(tasks, removeTask, markTask) {
  const appContainer = document.querySelector(".completed-tasks");
  appContainer.innerHTML = "";
  const completedTasks = filterCompletedTasks(tasks, state.search);
  appContainer.append(Completed({ completedTasks, removeTask, markTask }));
}

export { Completed, renderCompletedTasks };
