$(document).ready(function () {
  console.log("I'm here");

  var searchText = $('#search-text');
  var q = searchText.val();
  var weatherDisplay = $('#weatherResults');
  var apiKey = '77ffd60dd230258b705c8d658f5e0e70'
  var url = "http://api.openweathermap.org/data/2.5/forecast";
  var units = 'imperial';

  // will check if input is numeric
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  if (isNumeric(q)) {
    url + '?zip=' + q + '&units=' + units + '&appid=' + apiKey
  }

  $('.form-control').on('focus', function () {
    $('.form-control').val('');
  });
  $('#search-form').on('submit', function(e) {
    e.preventDefault();
    console.log('form submitted');

    q = searchText.val();
    console.log(q);
    getCurrentWeather();
    // if (isNumeric(data.q)) {
    //   url = "http://api.openweathermap.org/data/2.5/weather" + data.zip;
    // }

  });

  function getCurrentWeather() {
    $.getJSON(
      url,
      function (data) {
        console.log(data);
        weatherDisplay.html(data.city.name);
    });
  }
});