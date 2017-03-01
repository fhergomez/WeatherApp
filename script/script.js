$(document).ready(function () {
  // console.log("I'm here");
  getCurrentLocation();


  var searchText = $('#search-text');
  var q = searchText.val();
  var weatherDisplay = $('#weatherResults');
  var apiKey = '77ffd60dd230258b705c8d658f5e0e70'
  // var url = "http://api.openweathermap.org/data/2.5/forecast";
  var units = 'imperial';
  var celsius = false;
  var weatherData;

  // will check if input is numeric
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function renderData (weatherData, celsius) {
    console.log(weatherData);
    var currentLocation = weatherData.city.name;
    var currentWeather = weatherData.list[0].weather[0].description;
    var currentTemp = displayTemp(weatherData.list[0].temp.day, celsius);
    var highTemp = weatherData.list[0].temp.max;
    var minTemp = weatherData.list[0].temp.min;
    var icon = weatherData.list[0].weather[0].icon;

    var imgIcon = 'http://openweathermap.org/img/w/' + icon + '.png';


    $('#currentLocation').html(currentLocation);
    $('#imgIcon').html('<img src=' + imgIcon + ' width="100" height="100"> ')
    $('#currentTemp').html(currentTemp + '&deg;');
    for (var i = 0;i < 7; i++) {
      var dailyTemp = displayTemp(weatherData.list[i].temp.day, celsius);
      var dailyIcon = weatherData.list[i].weather[0].icon;

      var dailyImgIcon = 'http://openweathermap.org/img/w/' + dailyIcon + '.png';

      console.log(weatherData);
      $('.dailyTemp' + i).html(dailyTemp + '&deg;');
      $('#dailyImgIcon' + i).html('<img src=' + dailyImgIcon + ' width="40" height="40"> ');
    }

  }

  function displayTemp(fTemp, cTemp) {
    if (cTemp) {
      return Math.round((fTemp - 32) * (5/9)) + " C";
    }
    return Math.round(fTemp) + " F";
  }


  $('.form-control').on('focus', function () {
    $('.form-control').val('');
  });
  $('#search-form').on('submit', function(e) {
    e.preventDefault();
    console.log('form submitted');
    q = searchText.val();
    if (isNumeric(q)) {
      url = "http://api.openweathermap.org/data/2.5/forecast/daily?zip=" + q + '&units=' + units + '&appid=' + apiKey;
    } else {
      url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + q + '&units=' + units + '&appid=' + apiKey;
    }
    getCurrentWeather();
  });


  function getCurrentLocation() {
    $.getJSON('http://ipinfo.io',
      function(data) {
        // console.log('this is the data from current location: ', data)
        var q = data.city;
        var state = data.region
        console.log(state);
        url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + q + '&units=' + units + '&appid=' + apiKey;
        getCurrentWeather();
    });
  }

  function getCurrentWeather() {
    $.getJSON(
      url,
      function (apiData) {
        weatherData = apiData;
        // console.log('got data: ', weatherData);
        renderData(apiData, celsius);

        $('.convertButton').unbind().click(function(e){
          e.preventDefault();
          celsius = !celsius;
          // console.log(celsius);
          renderData(weatherData, celsius);
        })
    });
  };

});