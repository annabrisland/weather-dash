var APIkey = "2e17c151d7db1d257660c3301bec1b41";
var sumbit = $(".search-button");
var inputLocation = $("#search-input");
var locationHistory = $("#history");
var current = $("#today");
var forecast = $("#forecast");

var searchHistory = [];

// Save search results to local storage
function searchSave(location) {
  
  var previous = JSON.parse(localStorage.getItem("history"));

  if (previous) {
    searchHistory = previous
  }

  // Add current search to array
  var currentSearch = location;
  searchHistory.push(currentSearch);

  localStorage.setItem("history", JSON.stringify(searchHistory));

}

// Render search history
function renderHistory() {
  // Get form local storage
  var previousSearch = JSON.parse(localStorage.getItem("history"));
  
  // Loop through history array
    for (var i = 0; i < previousSearch.length; i++) {
      var historyBtn = $("<button>").text(previousSearch[i]).attr("location-name", previousSearch[i]);
      locationHistory.append(historyBtn);
    }

  
}

// Render results on page
function renderResults(today, results) {
     // Empty content sections
    current.empty();
    forecast.empty();

    // Render today's result
    if (today) {
        var icon = results.weather[0].icon;
        var iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        var temp = results.main.temp;
        var wind = results.wind.speed;
        var humidity = results.main.humidity;

        var weatherIcon = $("<img>").attr("src", iconURL);
        var todayTemp = $("<div>").text(temp + "℃");
        var todayWind = $("<div>").text("Wind Speed: " + wind + "kmph");
        var todayHumidity = $("<div>").text("Humidity: " + humidity + "%");
        current.text("Today");
        current.append(weatherIcon, todayTemp, todayWind, todayHumidity);

    } else {
        // Loop through results
        for (var i = 5; i < 40; i += 8) {
            var icon = results.list[i].weather[0].icon;
            var iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            var date = dayjs(results.list[i].dt_txt).format("dddd, D MMMM");
            var temp = results.list[i].main.temp;
            var wind = results.list[i].wind.speed;
            var humidity = results.list[i].main.humidity;
            
            var weatherIcon = $("<img>").attr("src", iconURL);
            var forecastDate = $("<div>").text(date);
            var forecastTemp = $("<div>").text(temp + "℃");
            var forecastWind = $("<div>").text("Wind Speed: " + wind + "kmph");
            var forecastHumidity = $("<div>").text("Humidity: " + humidity + "%");
            forecast.append(weatherIcon, forecastDate, forecastTemp, forecastWind, forecastHumidity);
    }
    }

}

// Return forecast
function forecastInfo(location) {
  // Fetch request for today forecast
  var queryURLToday =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&units=metric&appid=" +
    APIkey;
  fetch(queryURLToday)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Render results to page
      var today = true;
      renderResults(today, data);
    });
  
  // Fetch request for 5 day forecast data
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    location +
    "&cnt=40&units=metric&appid=" +
    APIkey;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Render results to page
      var today = false;
      renderResults(today, data);
    });
}

// Create event handler for location submission
sumbit.on("click", function (event) {
  event.preventDefault();
  var location = inputLocation.val().trim();
  // Render search history
  renderHistory();

  // Save to local storage
  searchSave(location);

  // Fetch and render
  forecastInfo(location);

});

// Event handler for history buttons
locationHistory.on("click", "button", function() {
  var pastLocation = $(this).attr("location-name")
  
  // Make new get requests
  forecastInfo(pastLocation);
})

// Render search history
renderHistory();
