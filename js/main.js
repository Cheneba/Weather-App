let country = document.querySelector("#country");
let city = document.querySelector("#city");
let check = document.querySelector("#check");
let cityValue = "Barcelona"; // Default city
let countryValue = "Spain"; // Default country

let tempIcon = document.querySelector("#tempIcon");
let weatherCountry = document.querySelector("#weatherCountry");
let temperature = document.querySelector("#temperature");
let weatherDescription = document.querySelector("#weatherDescription");

let feelsLike = document.querySelector("#feelsLike");
let humidity = document.querySelector("#humidity");
let longitude = document.querySelector("#longitude");
let latitude = document.querySelector("#latitude");

// Links data to page after it has been gotten
function resolveData(data) {
  weatherCountry.innerText = `${data.name} / ${data.sys.country}`;
  temperature.innerHTML = `${data.main.temp}°<b>C</b>`;

  data.weather.forEach((items) => {
    weatherDescription.innerText = items.description;
    if (items.id < 250) {
      tempIcon.src = `assets/storm.svg`;
    } else if (items.id < 350) {
      tempIcon.src = `assets/drizzle.svg`;
    } else if (items.id < 550) {
      tempIcon.src = `assets/snow.svg`;
    } else if (items.id < 650) {
      tempIcon.src = `assets/rain.svg`;
    } else if (items.id < 800) {
      tempIcon.src = `assets/atmosphere.svg`;
    } else if (items.id === 800) {
      tempIcon.src = `assets/sun.svg`;
    } else if (items.id > 800) {
      tempIcon.src = `assets/clouds.svg`;
    }
  });

  feelsLike.innerText = `Feels Like ${data.main.feels_like}°C`;

  humidity.innerText = `Humidity ${data.main.humidity}`;
  latitude.innerText = `Latitude ${data.coord.lat}`;
  longitude.innerText = `Latitude ${data.coord.lon}`;
}

// Fetches data
async function fetchFunc(link) {
  try {
    let response = await fetch(link);
    let data = await response.json();
    if (data.cod === 401) {
      throw new Error(data.message);
    } else {
      resolveData(data);
    }
  } catch (error) {}
}

// Listens for new data
check.addEventListener("click", () => {
  cityValue = city.value;
  countryValue = country.value;
  call(cityValue, countryValue);
});

// Main function
function call(cityValue, countryValue) {
  let key = `bd4ea33ecf905116d12af172e008dbae`;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&lang=en&units=metric&appid=${key}`;
  fetchFunc(url);
}

// Repeat the function every 5 minutes
setInterval(() => {
  call(cityValue, countryValue);
}, 1200000);
