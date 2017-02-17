$(document).ready(function () {
  console.log("I'm here");

  var searchText = $('#city');
  var weatherDisplay = $('#weatherResults');
  var apiKey = '77ffd60dd230258b705c8d658f5e0e70'
  var url = "http://api.openweathermap.org/data/2.5/weather";

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  $('#search').on('click', function(e) {
    e.preventDefault();
    console.log('form submitted');
    weatherDisplay.html('loading......');

    console.log(searchText);
    // if (isNumeric(data.q)) {
    //   url = "http://api.openweathermap.org/data/2.5/weather" + data.zip;
    // }

  });

  var getCurrentWeather = function () {
    $.getJSON(
      url,
      function (data) {
        console.log(data);
    });
  }
});