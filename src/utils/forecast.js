const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=6ec47f07cc472e23677fbb1b32d9c624&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather stack api!!!", undefined);
    } else if (body.error) {
      callback(body.error.code + " : " + body.error.info, undefined);
    } else {
      callback(undefined, {
        place:
          body.location.name +
          " " +
          body.location.region +
          " " +
          body.location.country,
        forecast:
          "Weather description for the day: " +
          body.current.weather_descriptions +
          ". Actual temperature: " +
          body.current.temperature +
          " degree celcius. Feels like " +
          body.current.feelslike +
          " degree celcius. The wind will blow at a speed of " +
          body.current.wind_speed +
          "kms/hr from " +
          body.current.wind_dir +
          " and it will be " +
          body.current.wind_degree +
          " degree farenheit hotter. The humidity in the air will be " +
          body.current.humidity +
          ". There will be " +
          body.current.cloudcover +
          "% of the sky will be covered by clouds",
      });
    }
  });
};
module.exports = forecast;
