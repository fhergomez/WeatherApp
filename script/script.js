$(document).ready(function () {
  // console.log("I'm here");
  getCurrentLocation();


  var searchText = $('#search-text');
  var q = searchText.val();
  var weatherDisplay = $('#weatherResults');
  var apiKey = '77ffd60dd230258b705c8d658f5e0e70'
  // var url = "http://api.openweathermap.org/data/2.5/forecast";
  var units = 'imperial';

  // will check if input is numeric
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }


  $('.form-control').on('focus', function () {
    $('.form-control').val('');
  });
  $('#search-form').on('submit', function(e) {
    e.preventDefault();
    console.log('form submitted');

    q = searchText.val();
    if (isNumeric(q)) {
      url = "http://api.openweathermap.org/data/2.5/forecast?zip=" + q + '&units=' + units + '&appid=' + apiKey;
    } else {
      url = "http://api.openweathermap.org/data/2.5/forecast?q=" + q + '&units=' + units + '&appid=' + apiKey;
    }
    console.log(url);
    getCurrentWeather();
  });


  function getCurrentLocation() {
    $.getJSON('http://ipinfo.io',
      function(data) {
        console.log('this is the data from current location: ', data)
        var q = data.city;
        var state = data.region.
        // console.log(q);
        // $('.form-control').val(q).change();
        url = "http://api.openweathermap.org/data/2.5/forecast?q=" + q + '&units=' + units + '&appid=' + apiKey;
        getCurrentWeather();
    });
  }

  function getCurrentWeather() {
    $.getJSON(
      url,
      function (data) {
        console.log('got data: ', data);

        var currentLocation = data.city.name;
        var currentWeather = data.list[0].weather[0].description;
        var currentTemp = data.list[0].main.temp;
        var highTemp = data.list[0].main.temp_max;
        var minTemp = data.list[0].main.temp_min;
        $('#currentLocation').html(currentLocation);
    });
  };

});