//allow usr to toggle between themes
function changeTheme() {
  let body = document.querySelector("body");
  body.classList.toggle("dark");
}

// sources weather details from axios api, via search Input
function refreshWeather(response) {
  let citySearch = document.querySelector("#city");
  //   console.log(response.data.temperature.current);
  let temperature = document.querySelector("#weather-temp");
  let temp = response.data.temperature.current;
  //   console.log(response.data.condition.description);
  let description = document.querySelector("#weather-description");
  //   console.log(response.data.temperature.feels_like);
  let feels = document.querySelector("#feels-temp");
  let tempFeels = response.data.temperature.feels_like;
  //   console.log(response.data.temperature.humidity);
  let humidity = document.querySelector("#current-humidity");
  //   console.log(response.data.wind.speed);
  let wind = document.querySelector("#current-wind");
  let windSpeed = response.data.wind.speed;
  windSpeed = Math.round(windSpeed);

  //date&time element
  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  //icon
  let icon = document.querySelector("#weather-icon");

  //city, date and time, icon
  citySearch.innerHTML = response.data.city;
  time.innerHTML = formatDate(date);
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`; //injecting the HTML via JS to get and load the image file

  //temperature variables
  temperature.innerHTML = Math.round(temp);
  description.innerHTML = response.data.condition.description;
  feels.innerHTML = Math.round(tempFeels);
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${windSpeed}km/h`;

  getForecast(response.data.city);
}

//date, day time function and format
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
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

  let number = date.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let calMonth = months[date.getMonth()];

  return `${day}, ${number} ${calMonth} at ${hours}:${minutes}`;
}

// sets api search funtion, sourcing city from searchInput
// establishes axios function to retrive weather details
function searchCity(city) {
  let apiKey = "9e058oe463d4208a93884ffdc59t0b6e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-city");
  // moved next 2 lines to refreshWeather function and modified to return API city name.
  //   let citySearch = document.querySelector("#city");
  //   citySearch.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiForecastKey = "9e058oe463d4208a93884ffdc59t0b6e";
  let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiForecastKey}&units=metric`;
  axios.get(apiForecastUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  // let forecast = document.querySelector("#forecast");

  let shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  shortDays.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="forecast-days">
    <div class="forecast-day">${day}</div>
    <div class="forecast-icon">🌤️</div>
    <div class="forecast-temperatures">
      <div>
        <span class="forecast-variable-max">15&deg;</span>
        <span class="forecast-variable-min">9&deg;</span>
      </div>
    </div>
  </div>
`;
  });

  forecast.innerHTML = forecastHtml;
}

let themeButton = document.querySelector(".themeButton");
themeButton.addEventListener("click", changeTheme);

let searchFormCity = document.querySelector("#search-form");
searchFormCity.addEventListener("submit", searchSubmit);

searchCity("Melbourne");

// displayForecast();
