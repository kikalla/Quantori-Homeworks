const selectBtn = document.querySelector("#selectMenu");
const arrow = document.querySelector("#arrow");
const list = document.querySelector(".sidebar__ul");

selectBtn.addEventListener("click", () => {
  arrow.classList.toggle("rotate");
  list.classList.toggle("hiden");
});
