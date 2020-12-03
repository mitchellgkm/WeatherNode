const express = require("express");
const { get } = require("http");
const fetch = require("node-fetch");
const path = require("path");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.set("view engine", "pug");
app.set("views", path.join(__dirname));

const address = 3002;

app.listen(address, () => console.log(`Server running on address ${address}`));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/weather", function (req, res) {
  const endpoint = "https://api.openweathermap.org/data/2.5/weather";
  const city = req.body.city;
  const unitInput = req.body.select;
  var units = "";
  if (unitInput == "celsius") {
    units = "metric";
  } else if (unitInput == "fahrenheit") {
    units = "imperial";
  }
  const key = "972f20535865310db4738128b621c170";
  const url = endpoint + "?q=" + city + "&units=" + units + "&appid=" + key;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      var weather = data.weather[0]["main"];
      var temp = data.main["temp"];
      res.render("weather", {
        main: weather,
        city: city,
        temp: temp,
        units: unitInput,
      });
      //   res.write(`<h1>${weather}</h1>`);
      //   res.send();
    })
    .catch((err) => {
      console.log(err);
    });
});

//   res.send(data.weather[0]["main"]);
//   res.send(data.main["temp"])
//   console.log(data.main["temp"]);
