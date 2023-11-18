var APIkey = "2e17c151d7db1d257660c3301bec1b41";
var sumbit = $(".search-button");
var inputLocation = $("#search-input");
var history = $("#history");
var today = $("#today");
var forecast = $("#forecast");

// Save search results to local storage
function searchSave(location) {}

// Render results on page
function renderResults(results) {
  console.log(results);
  var icon = results.list[0].weather[0].icon;
  var iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
  var date = dayjs(results.list[0].dt_txt).format("dddd, D MMMM");
  var temp = results.list[0].main.temp;
  var wind = results.list[0].wind.speed;
  var humidity = results.list[0].main.humidity;
  
  var weatherIcon = $("<img>").attr("src", iconURL);
  var forecastDate = $("<div>").text(date);
  var forecastTemp = $("<div>").text(temp + "℃");
  var forecastWind = $("<div>").text("Wind Speed: " + wind + "kmph");
  var forecastHumidity = $("<div>").text("Humidity: " + humidity + "%");
  forecast.append(weatherIcon, forecastDate, forecastTemp, forecastWind, forecastHumidity);

}

// Create event handler for location submission
sumbit.on("click", function (event) {
  event.preventDefault();
  var location = inputLocation.val().trim();
  // Save to local storage
  // Fetch request for data
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    location +
    "&cnt=1&units=metric&appid=" +
    APIkey;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Render results to page
      renderResults(data);
    });

  // Render search history
});

// Take user input into query URL
// Make get request
// Parse results
