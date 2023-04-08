function getFormInputs() {
  let task = document.querySelector(".form__input");
  let radios = Array.from(document.getElementsByName("task"));
  let selectedInput = radios.find((radio) => radio.checked);
  let date = document.querySelector(".form__date");
  return [task, radios, selectedInput, date];
}

function checkValidity() {
  [task, radio, selectedInput, date] = getFormInputs();
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
  addInput.classList.add("form__input");

  addInput.addEventListener("input", () => {
    checkValidity();
  });

  return addInput;
}

function AddRadioButtons() {
  let texts = ["health", "work", "home", "other"];
  let values = ["health", "work", "home", "other"];

  const array = [];

  for (let i = 0; i < 4; i++) {
    const radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "task");
    radio.setAttribute("value", values[i]);
    radio.setAttribute("id", values[i]);
    radio.classList.add("form__radio");

    const label = document.createElement("label");
    label.textContent = texts[i];
    label.setAttribute("for", values[i]);
    label.classList.add(`form__radio--${values[i]}`);

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

function CancelButton() {
  const cancelButton = document.createElement("button");
  cancelButton.innerText = "Cancel";
  cancelButton.classList.add("form__cancel-button");

  cancelButton.addEventListener("click", (e) => {
    const form = document.querySelector(".form");

    e.preventDefault();
    form.classList.add("hidden");
  });

  return cancelButton;
}

function AddButton({ text, onClick }) {
  const addButton = document.createElement("button");
  addButton.innerHTML = text;
  addButton.setAttribute("type", "submit");
  addButton.classList.add("form__add-button");

  addButton.addEventListener("click", (e) => {
    e.preventDefault();

    [task, radio, selectedInput, date] = getFormInputs();

    if (checkValidity()) {
      onClick.addTask({
        task: task.value,
        info: selectedInput.value,
        date: date.value,
      });
      document.querySelector(".form").classList.add("hidden");
    }
  });

  return addButton;
}

function Form(action) {
  const form = document.createElement("form");
  form.classList.add("form", "flex");

  const addInput = AddInput();
  const radios = AddRadioButtons();
  const addDate = AddDate();
  const cancelButton = CancelButton();
  const addButton = AddButton({ text: "Add task", onClick: action });
  const dateRadioDiv = document.createElement("div");
  const h2 = document.createElement("h2");

  h2.innerText = "Add New Task";
  h2.classList.add("form__h2");

  dateRadioDiv.classList.add("form__radio-date", "flex");
  dateRadioDiv.append(radios, addDate);

  const buttons = document.createElement("div");
  buttons.append(cancelButton, addButton);
  buttons.classList.add("form__buttons", "flex");

  form.append(h2, addInput, dateRadioDiv, buttons);

  return form;
}
