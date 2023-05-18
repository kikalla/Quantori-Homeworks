import Task from "./models/Task";
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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

function filterTasks(tasks: Task[], completed: boolean, search: string) {
  return tasks
    .filter((task) => {
      return (
        (completed ? task.completed : !task.completed) &&
        task.text.includes(search)
      );
    })
    .sort((a, b) => {
      const dateA: number = new Date(a.date).getTime();
      const dateB: number = new Date(b.date).getTime();

      return dateA - dateB;
    });
}

function convertDate(dateString: string) {
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
    const dayOfWeek = daysOfWeek[date.getDay()];
    const monthName = monthNames[date.getMonth()];
    const formattedDate = `${dayOfWeek}, ${day} ${monthName}`;
    return formattedDate;
  }
}

export { filterTasks, convertDate };
