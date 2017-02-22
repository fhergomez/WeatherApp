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
  var data;

  // will check if input is numeric
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function renderData (data, celsius) {
    var currentLocation = data.city.name;
    var currentWeather = data.list[0].weather[0].description;
    var currentTemp = displayTemp(data.list[0].main.temp, celsius);
    var highTemp = data.list[0].main.temp_max;
    var minTemp = data.list[0].main.temp_min;
    var icon = data.list[0].weather[0].icon;

    var imgIcon = 'http://openweathermap.org/img/w/' + icon + '.png'


    $('#currentLocation').html(currentLocation);
    $('#imgIcon').html('<img src=' + imgIcon + ' width="100" height="100"> ')
    $('#currentTemp').html(currentTemp + '&deg;');
  }

  function displayTemp(fTemp, cTemp) {
    if (cTemp) {
      return Math.round((fTemp - 32) * (5/9)) + " C";
    } else {
      return Math.round(fTemp) + " F"
    }
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
        var state = data.region
        console.log(state);
        // $('.form-control').val(q).change();
        url = "http://api.openweathermap.org/data/2.5/forecast?q=" + q + '&units=' + units + '&appid=' + apiKey;
        getCurrentWeather();
    });
  }

  function getCurrentWeather() {
    $.getJSON(
      url,
      function (apidata) {
        data = apidata;
        console.log('got data: ', data);
        renderData(data, celsius);

        $('.convertButton').on('click', function (){
          celsius = !celsius;
          renderData(data, celsius);
        })
    });
  };

});