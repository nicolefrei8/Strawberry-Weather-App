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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHtml = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
             <div class="col-2">
                <span class="forecast-day">
                  ${formatDay(forecastDay.dt)}
                </span>
                <img 
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                class="forecast-icon">
                <span class="high-temp">
                ${Math.round(forecastDay.temp.max)}°
                </span>
                <span class="low-temp">
                    ${Math.round(forecastDay.temp.min)}°
                </span>
            </div>`;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}
function getForecast(coordinates) {
  let apiKey = "72bb9dab46b9ec3d65f423c63f27a9b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temp = document.querySelector("#temp");
  let weatherDescriptior = document.querySelector("#weather-description");
  let wind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  let dateElement = document.querySelector("#date-time");
  let iconElement = document.querySelector("#main-icon");

  celciusTemp = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temp.innerHTML = Math.round(response.data.main.temp);
  weatherDescriptior.innerHTML = response.data.weather[0].description;
  wind.innerHTML = `Wind: ${windSpeed}km/h`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherDescriptior.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchClick);
