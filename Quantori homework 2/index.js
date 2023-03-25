const btn = document.querySelector(".btn");
const logoFirst = document.querySelector(".logo_first");
const logoSecond = document.querySelector(".logo_second");

// Set timer foreach wall hit sound, steps must be % when in animation image hits wall

function playAudio(length, steps) {
  const audio = new Audio("dvdWall.mp3");

  steps.forEach((step) => {
    setTimeout(() => audio.play(), (length / 100) * step * 1000);
  });
}

// Starts infinite loop

function setAudio(length, steps, element) {
  element.classList.remove("hiden");
  playAudio(length, steps);
  setInterval(() => {
    playAudio(length, steps);
  }, length * 1000);
}

// Event lisener

btn.addEventListener("click", () => {
  setAudio(10, [30, 50, 80, 100], logoFirst);
  setAudio(15, [15, 50, 65, 100], logoSecond);
  btn.classList.add("hiden");
});
