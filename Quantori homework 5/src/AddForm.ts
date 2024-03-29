function getFormInputs(): [
  HTMLInputElement,
  HTMLInputElement[],
  HTMLInputElement,
  HTMLInputElement
] {
  const task = document.querySelector(".form__input")! as HTMLInputElement;
  const radios = Array.from(
    document.getElementsByName("task")!
  ) as HTMLInputElement[];
  const selectedInput = radios.find(
    (radio) => radio.checked
  )! as HTMLInputElement;
  const date = document.querySelector(".form__date")! as HTMLInputElement;

  return [task, radios, selectedInput, date];
}

function checkValidity(): boolean {
  const [task, radio, selectedInput, date] = getFormInputs();

  const addButton = document.querySelector(".form__add-button")!;

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
  addInput.setAttribute("maxlength", "40");
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

function CancelButton(
  background: HTMLElement,
  form: HTMLFormElement
): HTMLElement {
  const cancelButton = document.createElement("button");
  cancelButton.innerText = "Cancel";
  cancelButton.classList.add("form__cancel-button");

  function listenCloseEvent(element: HTMLElement) {
    element.addEventListener("click", (e: Event) => {
      e.preventDefault();
      form.classList.add("hidden");
      background.classList.add("hidden");
    });
  }
  listenCloseEvent(cancelButton);
  listenCloseEvent(background);

  return cancelButton;
}

function AddButton({
  text,
  onClick,
}: {
  text: string;
  onClick: Function;
}): HTMLButtonElement {
  const addButton = document.createElement("button");
  addButton.innerHTML = text;
  addButton.setAttribute("type", "submit");
  addButton.classList.add("form__add-button");

  addButton.addEventListener("click", (e) => {
    e.preventDefault();

    const [task, radio, selectedInput, date] = getFormInputs();

    if (checkValidity()) {
      onClick({
        task: task.value,
        info: selectedInput.value,
        date: date.value,
        id: Math.random(),
        completed: false,
      });
      document.querySelector(".form")!.classList.add("hidden");
      document.querySelector(".background")!.classList.add("hidden");
    }
  });

  return addButton;
}

function Form(action: Function) {
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
