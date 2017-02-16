$(document).ready(function () {
  console.log("I'm here");

  var searchText = $('#city');
  var weatherDisplay = $('#weatherResults');

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  $('#search').on('click', function(e) {
    e.preventDefault();
    console.log('form submitted');
    weatherDisplay.html('loading......');
    var url = "http://api.openweathermap.org/data/2.5/weather";


    console.log(searchText);
    // if (isNumeric(data.q)) {
    //   url = "http://api.openweathermap.org/data/2.5/weather" + data.zip;
    // }
    var getCurrentWeather = function () {
      $.getJSON(url, function (data) {
        console.log(data);
      });
    }
  })
});