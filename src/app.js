const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Defining the configurations for express
const pathForIndex = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Rendering a static express page
app.use(express.static(pathForIndex));

//set up view elements and values
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index.hbs", {
    title: "Weather App",
    name: "Karthick T R",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About the creator",
    name: "Karthick T R",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    description:
      "This app helps you in finding out the weather condition for any location in the world. You can find out the temperature, wind speed, humidity and the overall description of the weather for the day",
    name: "Karthick T R",
  });
});

app.get("/weather", (req, res) => {
  if (req.query.address) {
    geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
      if (error) {
        res.send({
          error,
        });
      } else {
        forecast(latitude, longitude, (error, data) => {
          if (error) {
            res.send("There is an error");
          } else {
            res.send(data);
          }
        });
      }
    });
  } else {
    res.send({
      error: "Please enter the location value",
    });
  }
});

app.use("/help/*", (req, res) => {
  res.render("404", {
    title: "404 error!!!",
    error_message: "Help articles not found!",
    name: "Karthick T R",
  });
});

app.use("*", (req, res) => {
  res.render("404", {
    title: "404 error!!!",
    error_message: "Page not found",
    name: "Karthick T R",
  });
});

app.listen(3000, () => {
  console.log("This app is running in port 3000");
});
