var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("more", { mapKey: process.env.MAP_API } );
});

router.get("/weather", async (req, res) => {
  const { lat, lon } = req.query;
  const weatherKey = process.env.WEATHER_API;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Location details are required" });
  }

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=metric`;

  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();

    if (response.ok) {
      res.json(data);
    } else {
      res.status(response.status).json({ error: data.message });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

module.exports = router;
