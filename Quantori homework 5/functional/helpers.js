function convertDate(dateString) {
  const dateParts = dateString.split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  const day = parseInt(dateParts[2]);

  const date = new Date(year, month, day);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthName = monthNames[date.getMonth()];
    const formattedDate = `${dayOfWeek}, ${day} ${monthName}`;
    return formattedDate;
  }
}

function addLisenersToButtons(btnClass, taskClass, action) {
  let promise = new Promise(function (resolve, reject) {
    let interval = setInterval(() => {
      if (document.querySelectorAll(btnClass)) {
        resolve(document.querySelectorAll(btnClass));
        clearInterval(interval);
      } else reject();
    }, 0);
  });
  promise.then((deleteIcons) => {
    deleteIcons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const task = btn.closest(taskClass);
        action(task);
      });
    });
  });
}
