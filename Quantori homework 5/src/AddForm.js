// import

function getFormInputs() {
  const task = document.querySelector(".form__input");
  const radios = Array.from(document.getElementsByName("task"));
  const selectedInput = radios.find((radio) => radio.checked);
  const date = document.querySelector(".form__date");

  return [task, radios, selectedInput, date];
}

function checkValidity() {
  const [task, radio, selectedInput, date] = getFormInputs();

  const addButton = document.querySelector(".form__add-button");

  if (date.value && task.value && selectedInput?.value) {
    addButton.classList.add("form__add-button--active", "pointer");
    return true;
  } else {
    addButton.classList.remove("form__add-button--active", "pointer");
    return false;
  }
}

function AddInput() {
  const addInput = document.createElement("input");
  addInput.setAttribute("type", "text");
  addInput.setAttribute("placeholder", "Task Title");
  addInput.setAttribute("maxlength", 40);
  addInput.classList.add("form__input");

  addInput.addEventListener("input", () => {
    checkValidity();
  });

  return addInput;
}

function AddRadioButtons() {
  const options = [
    { title: "health", value: "health" },
    { title: "work", value: "work" },
    { title: "home", value: "home" },
    { title: "other", value: "other" },
  ];
  const array = [];

  for (let i = 0; i < options.length; i++) {
    const radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "task");
    radio.setAttribute("value", options[i].value);
    radio.setAttribute("id", options[i].value);
    radio.classList.add("form__radio");

    const label = document.createElement("label");
    label.textContent = options[i].title;
    label.setAttribute("for", options[i].value);
    label.classList.add(`form__radio--${options[i].value}`);

    radio.addEventListener("input", () => {
      checkValidity();
    });

    array.push([radio, label]);
  }
  const radios = document.createElement("div");
  radios.classList.add("form__radios", "flex");
  radios.append(...array.flat());

  return radios;
}

function AddDate() {
  const addDate = document.createElement("input");
  addDate.setAttribute("type", "date");
  addDate.classList.add("form__date");

  addDate.addEventListener("input", () => {
    checkValidity();
  });

  return addDate;
}

function CancelButton(background, form) {
  const cancelButton = document.createElement("button");
  cancelButton.innerText = "Cancel";
  cancelButton.classList.add("form__cancel-button");

  function listenCloseEvent(element) {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      form.classList.add("hidden");
      background.classList.add("hidden");
    });
  }
  listenCloseEvent(cancelButton);
  listenCloseEvent(background);

  return cancelButton;
}

function AddButton({ text, onClick }) {
  const addButton = document.createElement("button");
  addButton.innerHTML = text;
  addButton.setAttribute("type", "submit");
  addButton.classList.add("form__add-button");

  addButton.addEventListener("click", (e) => {
    e.preventDefault();

    const [task, radio, selectedInput, date] = getFormInputs();

    if (checkValidity()) {
      onClick.addTask({
        task: task.value,
        info: selectedInput.value,
        date: date.value,
        id: Math.random(),
        completed: false,
      });
      document.querySelector(".form").classList.add("hidden");
      document.querySelector(".background").classList.add("hidden");
    }
  });

  return addButton;
}

function Form(action) {
  const form = document.createElement("form");
  form.classList.add("form", "flex", "hidden");

  const background = document.createElement("div");
  const addInput = AddInput();
  const radios = AddRadioButtons();
  const addDate = AddDate();
  const cancelButton = CancelButton(background, form);
  const addButton = AddButton({ text: "Add task", onClick: action });
  const dateRadioDiv = document.createElement("div");
  const h2 = document.createElement("h2");
  const formDiv = document.createElement("div");

  background.classList.add("background", "hidden");

  h2.innerText = "Add New Task";
  h2.classList.add("form__h2");

  dateRadioDiv.classList.add("form__radio-date", "flex");
  dateRadioDiv.append(radios, addDate);

  const buttons = document.createElement("div");
  buttons.append(cancelButton, addButton);
  buttons.classList.add("form__buttons", "flex");

  form.append(h2, addInput, dateRadioDiv, buttons);
  formDiv.append(form, background);

  return formDiv;
}

export default Form;
