function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${currentDay}, ${currentHour}:${currentMinutes}`;
}
let h2 = document.querySelector("h2");
let now = new Date();
h2.innerHTML = formatDate(now);

function searchCity(event) {
  event.preventDefault();
  let apiKey = "f1a24663f0cb0588bb9ad4c51ce1de8b";
  let units = "metric";
  let cityInput = document.querySelector("#city-search");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity);

function searchLocation(position) {
  let apiKey = "f1a24663f0cb0588bb9ad4c51ce1de8b";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f1a24663f0cb0588bb9ad4c51ce1de8b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showTemp(response) {
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let newTemp = document.querySelector("#current-temp");
  newTemp.innerHTML = `${temp} °C`;
  let weatherCond = document.querySelector("#current-condition");
  weatherCond.innerHTML = `${response.data.weather[0].description},`;
}

function getCurrentPosition(location) {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);
