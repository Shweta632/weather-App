const API_KEY = "6c2c59f84537494bac865720250909";

function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!location) {
    alert("Please enter a location.");
    return;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=no`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Location not found");
      }
      return response.json();
    })
    .then(data => {
      const city = `${data.location.name}, ${data.location.country}`;
      const temperature = data.current.temp_c;
      const condition = data.current.condition.text;
      const iconUrl = `https:${data.current.condition.icon}`;

      document.getElementById("cityName").textContent = city;
      document.getElementById("temperature").textContent = temperature;
      document.getElementById("condition").textContent = condition;
      document.getElementById("weatherIcon").src = iconUrl;
      document.getElementById("weatherIcon").alt = condition;

      resultDiv.classList.remove("hidden");
    })
    .catch(error => {
      alert("Error fetching weather: " + error.message);
      resultDiv.classList.add("hidden");
    });
}
