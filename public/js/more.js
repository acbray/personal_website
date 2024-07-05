$(document).ready(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        $.getJSON(`/more/weather?lat=${lat}&lon=${lon}`, function (data) {
          const weather = `
          <h2>Weather in ${data.name}</h2>
          <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
          <p><strong>Weather:</strong> ${data.weather[0].description}</p>
          <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
          $("#weather").html(weather);
        }).fail(function () {
          $("#weather").html("<p>Error fetching weather data.</p>");
        });

        //initialize this function here to pass coordinates
        initMap(lat, lon);
      },
      function (error) {
        $("#weather").html("<p>Unable to retrieve your location.</p>");
        $("#map").html("<p>Unable to retrieve your location for the map.</p>");
      }
    );
  } else {
    $("#weather").html("<p>Geolocation is not supported by this browser.</p>");
    $("#map").html("<p>Geolocation is not supported by this browser.</p>");
  }

  //Map JS API code
  let map;

  async function initMap(lat, lon) {
    const position = { lat: lat, lng: lon };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
      zoom: 12,
      center: position,
      mapId: "Your_Location",
    });

    const marker = new AdvancedMarkerElement({
      map: map,
      position: position,
      title: "Your location",
    });
  }
});
