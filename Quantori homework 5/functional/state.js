let state = undefined;
let search = "";
let weatherSrc = "";
let weatherCity = "";
let weatherTemp = "";

(async () => {
  const response = await fetch(`${DBurl}tasks`);
  const data = await response.json();
  const [tasks, setTasks] = useState(data);
  (function () {
    renderApp(tasks, setTasks);
  })();
})();

function useState(initialValue) {
  state = state || initialValue;

  function setValue(newValue) {
    state = newValue;
    renderApp(state, setValue);
  }

  return [state, setValue];
}

function renderApp(tasks, setTasks) {
  const appContainer = document.querySelector("body");
  appContainer.innerHTML = "";
  appContainer.append(App(tasks, setTasks));
}
