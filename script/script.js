$(document).ready(function () {
  console.log("I'm here!");

  $("#searchtext").keyup(function () {
      getAutoCompleteValues($("#searchtext").first().attr("value"));
  });


  function getAutoCompleteValues(val) {

    if (val.length < 3) return false;
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      jsonp: "callback",
      jsonpCallback: "callback",
      url: "http://api.openweathermap.org/data/2.5/forecast?q="+ val +",us&mode=json&units=metric&APPID=77ffd60dd230258b705c8d658f5e0e70",
      cache: false,
      success: function (data) {
        console.log(data);
        $("#results").html('');
        $.each(data, function (i, item) {
           $("#results").append(city.id);
        });
      }
    });
  };

  getAutoCompleteValues("Gustine");
});