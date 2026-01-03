const btn = document.getElementById("search-button");
const error = document.getElementById("error");
const des = document.getElementById("weather-description");
const temp = document.getElementById("temperature");
const city = document.getElementById("city-name");
const icon = document.getElementById("icon");
const humidity = document.getElementById("humidity-value");
const wind = document.getElementById("wind-value");

const apikey = "017c772959058b4fb318461bcafff2f1";

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let val = document.getElementById("city").value;
  let main_url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${val}`;
  if (!val) {
    alert("Enter a city name");
  }
  try {
    let response = await fetch(main_url + `&appid=${apikey}`);
    let data = await response.json();
    if (data.cod === "404") {
      error.classList.remove("hidden");
      document.getElementById("weather_data").classList.add("hidden");
      document.getElementById("additional_info").classList.add("hidden");
    } else {
      console.log(data);
      city.innerHTML = data.name;
      error.classList.add("hidden");
      temp.innerHTML = Math.round(data.main.temp) + "&deg;C";
      des.innerHTML = data.weather[0].description;
      humidity.innerHTML = `<i class="fa-solid fa-droplet text-4xl"></i> ${data.main.humidity} %`;
      wind.innerHTML = `<i class="fa-solid fa-wind text-4xl"></i> ${( data.wind.speed * 3.6 ).toFixed(2)} km/hr`;

      if (data.weather[0].main.toLowerCase() === "clear") {
        icon.src = "images/clear.png";
      } else if (data.weather[0].main.toLowerCase() === "clouds") {
        icon.src = "images/clouds.png";
      } else if (data.weather[0].main.toLowerCase() === "drizzle") {
        icon.src = "images/drizzle.png";
      } else if (data.weather[0].main.toLowerCase() === "mist") {
        icon.src = "images/mist.png";
      } else if (data.weather[0].main.toLowerCase() === "rain") {
        icon.src = "images/rain.png";
      } else if (data.weather[0].main.toLowerCase() === "snow") {
        icon.src = "images/snow.png";
      } else if (data.weather[0].main.toLowerCase() === "thunderstorm") {
        icon.src = "images/thunderstorm.png";
      } else if (data.weather[0].main.toLowerCase() === "haze") {
        icon.src = "images/haze.png";
      } else if (data.weather[0].main.toLowerCase() === "fog") {
        icon.src = "images/fog.png";
      }
      document.getElementById("weather_data").classList.remove("hidden");
      document.getElementById("additional_info").classList.remove("hidden");
    }
  } catch (err) {
    console.log(err);
    alert("Something went wrong");
    error.classList.remove("hidden");
    document.getElementById("weather_data").classList.add("hidden");
    document.getElementById("additional_info").classList.add("hidden");
  }
  document.querySelector("input").value = "";
});
