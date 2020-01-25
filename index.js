const outerDiv = document.createElement("div")
outerDiv.id = "outer"
document.body.appendChild(outerDiv)
mountWeatherDiv();

// create weather div
function mountWeatherDiv() {
  const form = document.createElement("form");
  form.id = "form";
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = document.querySelector("input").value
    getWeather(searchTerm);
  })

  const input = document.createElement("input");
  input.placeholder = "Enter Zip"

  const button = document.createElement("button")
  button.innerText = "Get Weather!"

  const weatherDiv = document.createElement("div");
  weatherDiv.id = "weather";

  form.appendChild(input)
  form.appendChild(button)
  weatherDiv.appendChild(form)

  outerDiv.appendChild(weatherDiv);
}

function getWeather(searchTerm) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${searchTerm},us&appid=96bb92363fb165a6ba2456bbb1f2a53a`)
  .then(res => res.json())
  .then(weatherObj => displayWeather(weatherObj))
}

function displayWeather(weatherObj) {
  if (weatherObj.message) {
    alert(weatherObj.message.toUpperCase())
  }
  let currentWeatherDiv = document.querySelector("#current")
  // replace current weather if we've already searched
  if (currentWeatherDiv != null) {
    currentWeatherDiv.remove();
  }
  // default temp is in Kelvin
  const kel = weatherObj.main.temp
  // convert to farenheit
  let currentTemp = (kel - 273.15) * 9/5 + 32

  let currentWeather = document.createElement("div")
  currentWeather.id="current";
  const mainForecast = weatherObj.weather[0].main;
  currentWeather.innerHTML = `
      <h2>Current weather in ${weatherObj.name}:</h2>
      <h4 className="current-weather">${mainForecast} - ${weatherObj.weather[0].description}</h4>
      <h4>Temperature: ${Math.trunc(currentTemp)}ºF</h4>
      <h4>Humidity: ${weatherObj.main.humidity}%</h4>
    `

  document.body.className = `${mainForecast.toLowerCase()}`
  const weatherDiv = document.querySelector("#weather");
  outerDiv.insertBefore(currentWeather, weatherDiv)

}
