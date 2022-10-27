const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extend: true
}))


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "d7452eeea289afdb66f29f6221470b4f";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units ;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      console.log(temp);
      const description = weatherData.weather[0].description;
      console.log(description);
      const name = weatherData.name;
      console.log(name);

      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The weather is currently: " + description + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src =" + imageUrl + ">");
      res.send();
    });
  });
})

app.listen(3000, function() {
  console.log("Server is running on port: 3000");
})
