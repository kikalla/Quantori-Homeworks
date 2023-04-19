function NewTaskButton() {
  const newTaskButton = document.createElement("button");
  newTaskButton.classList.add("header__button");
  newTaskButton.innerText = "+ New Task";

  newTaskButton.addEventListener("click", (e) => {
    const form = document.querySelector(".form");
    const background = document.querySelector(".background");

    e.preventDefault();
    form.classList.remove("hidden");
    background.classList.remove("hidden");
  });

  return newTaskButton;
}

function SearchInput(removeTask, markTask, tasks) {
  const searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("placeholder", "Search Task");
  searchInput.classList.add("header__input");
  searchInput.value = search;

  searchInput.addEventListener("input", (e) => {
    search = e.target.value;
    renderTasks(tasks, removeTask, markTask);
    renderCompletedTasks(tasks, removeTask, markTask);
  });

  return searchInput;
}

function Weather() {
  const weather = document.createElement("span");

  const icon = document.createElement("img");
  const temp = document.createElement("span");
  const cityEl = document.createElement("span");

  icon.setAttribute("src", weatherSrc);
  temp.innerText = weatherTemp;
  cityEl.innerText = weatherCity;

  weather.append(icon, temp, cityEl);
  weather.classList.add("header__weather", "flex");
  temp.classList.add("header__weather--temp");
  cityEl.classList.add("header__weather--city");

  let city = "Tbilisi";

  function setWeatherData(weatherData) {
    icon.setAttribute("src", weatherData.current.condition.icon);
    temp.innerText = `${weatherData.current.temp_c}°`;
    cityEl.innerText = weatherData.location.name;

    weatherSrc = weatherData.current.condition.icon;
    weatherTemp = `${weatherData.current.temp_c}° `;
    weatherCity = weatherData.location.name;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      city = data.address.city;
      const weatherRes = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`
      );
      const weatherData = await weatherRes.json();
      setWeatherData(weatherData);
    },
    async () => {
      const weatherRes = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`
      );
      const weatherData = await weatherRes.json();
      setWeatherData(weatherData);
    }
  );

  return weather;
}

function Header(removeTask, markTask, tasks) {
  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  const searchInput = SearchInput(removeTask, markTask, tasks);
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
