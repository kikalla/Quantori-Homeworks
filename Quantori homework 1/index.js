const timeEl = document.querySelector(".time");
const monthEl = document.querySelector(".month");
const offBtn = document.querySelector(".off_btn");
const phoneScreen = document.querySelector(".phone_screen");
const offScreen = document.querySelector(".off_screen");
const homeBtn = document.querySelector(".home_btn");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function setCurrentTime() {
  let now = new Date();

  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");

  let month = months[now.getMonth()];
  let day = days[now.getDay()];
  let date = now.getDate();

  timeEl.textContent = `${hours}:${minutes} `;
  monthEl.textContent = `${day}, ${date} ${month}`;
  setTimeout(function () {
    setCurrentTime();
  }, 1000);
}
setCurrentTime();

offBtn.addEventListener("click", function () {
  phoneScreen.classList.toggle("hiden");
  offScreen.classList.toggle("active");
});
homeBtn.addEventListener("click", function () {
  if (offScreen.classList.contains("active")) {
    phoneScreen.classList.toggle("hiden");
    offScreen.classList.toggle("active");
  }
});
