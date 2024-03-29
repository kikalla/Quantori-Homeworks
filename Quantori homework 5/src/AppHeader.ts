import state from "./state";
import config from "./config";
import { renderCompletedTasks } from "./CompletedTasks";
import { renderTasks } from "./TasksList";
import { Task, weatherResponse, navigationPosition } from "./interfaces";

function NewTaskButton(): HTMLButtonElement {
  const newTaskButton = document.createElement("button");
  newTaskButton.classList.add("header__button");
  newTaskButton.innerText = "+ New Task";

  newTaskButton.addEventListener("click", (e) => {
    const form = document.querySelector(".form")!;
    const background = document.querySelector(".background")!;

    e.preventDefault();
    form.classList.remove("hidden");
    background.classList.remove("hidden");
  });

  return newTaskButton;
}

function SearchInput(
  deleteTask: Function,
  updateTask: Function,
  tasks: Task[]
) {
  const searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("placeholder", "Search Task");
  searchInput.classList.add("header__input");
  searchInput.value = state.search;

  searchInput.addEventListener("input", (e: any) => {
    state.search = e.target.value;
    renderTasks(tasks, deleteTask, updateTask);
    renderCompletedTasks(tasks, deleteTask, updateTask);
  });

  return searchInput;
}

function Weather() {
  const weather = document.createElement("span");

  const icon = document.createElement("img");
  const temp = document.createElement("span");
  const cityEl = document.createElement("span");

  icon.setAttribute("src", state.weatherSrc);
  temp.innerText = state.weatherTemp;
  cityEl.innerText = state.weatherCity;

  weather.append(icon, temp, cityEl);
  weather.classList.add("header__weather", "flex");
  temp.classList.add("header__weather--temp");
  cityEl.classList.add("header__weather--city");

  function setWeatherData(weatherData: weatherResponse) {
    icon.setAttribute("src", weatherData.current.condition.icon);
    temp.innerText = `${weatherData.current.temp_c}°`;
    cityEl.innerText = weatherData.location.name;

    state.weatherSrc = weatherData.current.condition.icon;
    state.weatherTemp = `${weatherData.current.temp_c}° `;
    state.weatherCity = weatherData.location.name;
  }
  const getWeatherForUserLocation = async (position: navigationPosition) => {
    const { latitude, longitude } = position.coords;
    try {
      const locationResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      const locationData = await locationResponse.json();
      const city = locationData.address.city;

      const weatherRes = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${config.key}&q=${city}&aqi=no`
      );
      if (weatherRes.status !== 200) throw new Error();

      const weatherData = await weatherRes.json();
      setWeatherData(weatherData);
    } catch {
      temp.innerText = `Something Went Wrong`;
    }
  };

  const getWeatherForDefaultLocation = async () => {
    try {
      const weatherRes = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${config.key}&q=${config.DEFAULT_CITY}&aqi=no`
      );
      if (weatherRes.status !== 200) throw new Error();
      const weatherData = await weatherRes.json();
      setWeatherData(weatherData);
    } catch {
      temp.innerText = `Something Went Wrong`;
    }
  };

  navigator.geolocation.getCurrentPosition(
    getWeatherForUserLocation,
    getWeatherForDefaultLocation
  );

  return weather;
}

function Header(deleteTask: Function, updateTask: Function, tasks: Task[]) {
  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  const searchInput = SearchInput(deleteTask, updateTask, tasks);
  const newTaskButton = NewTaskButton();
  const searchDiv = document.createElement("div");

  const headerDiv = document.createElement("div");
  const weather = Weather();

  headerDiv.append(h1, weather);

  searchDiv.append(searchInput, newTaskButton);
  searchDiv.classList.add("header__search", "flex");
  headerDiv.classList.add("header__container", "flex");
  header.classList.add("header", "flex");
  h1.textContent = "To Do List";

  header.append(headerDiv, searchDiv);

  return header;
}

export default Header;
