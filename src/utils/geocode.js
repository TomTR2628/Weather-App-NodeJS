const request = require("request");
const geocode = (location, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(location) +
    ".json?access_token=pk.eyJ1Ijoia2FydGhpY2t0ciIsImEiOiJjazhzZ3Zob20wN3U4M2RsbTl0bnphbG1kIn0.l3gH4u1VJYQDUNCf0UZHHw&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        { error: "Unable to connect to geolocation servies!!!" },
        undefined
      );
    } else if (body.features.length === 0) {
      callback(
        {
          error:
            "Unable to find the given location, Please try with another location value",
        },
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        place: body.features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
