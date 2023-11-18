var APIkey = "";
var sumbit = $(".search-button");
var inputLocation = $("#search-input");

// Save search results to local storage
function searchSave(location) {

}

// Render results on page
function renderResults(location) {
    console.log(location)
}

// Create event handler for location submission
sumbit.on("click", function(event) {
    event.preventDefault();
    var location = inputLocation.val().trim();
    // Save to local storage
    // Fetch request for data
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&cnt=5&units=metric&appid=" + APIkey;
    fetch(queryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        })

    // Render results to page
    renderResults(location);

    // Render search history
    
})

// Take user input into query URL
// Make get request
// Parse results
