function List({ uncompletedTasks: tasks, removeTask, markTask }) {
  const listTasks = tasks
    .map(
      (task) =>
        `<li class="tasks__list flex" id=${task.id}>
            <div class="flex">
              <img class="tasks__check" src="images/check.svg">
              <div class="tasks__containter flex">
                  <h2 class="tasks__text">${task.task}</h2>
                  <div class="tasks__info flex">
                      <p class="tasks__info--${task.info}" >${task.info}</p>
                      <p class="tasks__info--time">${convertDate(task.date)}</p>
                  </div>
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

  addLisenersToButtons(".tasks__delete", ".tasks__list", removeTask);
  addLisenersToButtons(".tasks__check", ".tasks__list", markTask);

  return div;
}
