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
    if (isNumeric(searchText.q)) {
      var data = {
        zip: searchText.val() + ',us',
        units: 'imperial',
        APPID: '77ffd60dd230258b705c8d658f5e0e70'
      };
    } else {
      var data = {
        q: searchText.val(),
        units: 'imperial',
        APPID: '77ffd60dd230258b705c8d658f5e0e70'
      };
    }

    console.log(searchText);
    // if (isNumeric(data.q)) {
    //   url = "http://api.openweathermap.org/data/2.5/weather" + data.zip;
    // }
    $.getJSON(url, data, function(weatherData) {
      console.log(url, data, weatherData);
      if (weatherData.list) {
        weatherDisplay.html("");
      }
    })
  })
});