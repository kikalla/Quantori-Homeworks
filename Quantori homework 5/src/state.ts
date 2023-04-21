import config from "./config";
import App from "./index";

export interface Task {
  task: string;
  info: string;
  date: string;
  id: number;
  completed: boolean;
}

let state: any = null;
let search = "";
let weatherSrc = "";
let weatherCity = "";
let weatherTemp = "";

(async () => {
  const response = await fetch(`${config.DBurl}tasks`);
  const data = await response.json();
  const [tasks, setTasks] = useState(data);
  (function () {
    renderApp(tasks, setTasks);
  })();
})();

function useState(initialValue: any): [any, Function] {
  state = state || initialValue;

  function setValue(newValue: any) {
    state = newValue;
    renderApp(state, setValue);
  }

  return [state, setValue];
}

function renderApp(tasks: Task[], setTasks: Function) {
  const appContainer = document.querySelector("body");
  if (appContainer) {
    appContainer.innerHTML = "";
    appContainer.append(App(tasks, setTasks));
  }
}

export default {
  search,
  weatherSrc,
  weatherCity,
  weatherTemp,
  renderApp,
};
