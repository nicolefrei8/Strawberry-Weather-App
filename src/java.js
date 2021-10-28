function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `Last updated:  ${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temp = document.querySelector("#temp");
  let weatherDescription = document.querySelector("#weather-description");
  let wind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  let dateElement = document.querySelector("#date-time");
  let iconElement = document.querySelector("#icon");

  celciusTemp = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temp.innerHTML = Math.round(response.data.main.temp);
  weatherDescription.innerHTML = response.data.weather[0].description;
  wind.innerHTML = `Wind: ${windSpeed}Km/H`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );

  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}
function search(cityName) {
  let apiKey = "72bb9dab46b9ec3d65f423c63f27a9b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function searchClick(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  search(cityInput.value);
}
function convertFahr(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  let fahrTemp = (celciusTemp * 9) / 5 + 32;
  celciusLink.classList.remove("active");
  fahrLink.classList.add("active");
  temp.innerHTML = Math.round(fahrTemp);
}

function convertCelcius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  celciusLink.classList.add("active");
  fahrLink.classList.remove("active");
  temp.innerHTML = Math.round(celciusTemp);
}
let celciusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchClick);

let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", convertFahr);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertCelcius);
