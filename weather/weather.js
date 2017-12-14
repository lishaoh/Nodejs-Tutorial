//  bd24b48f09651451b6de3f8c53396351

const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/bd24b48f09651451b6de3f8c53396351/${lat},${lng}`,
    json: true
  }, (error, res, body) => {
    if (error) {
      callback('Unable to connect to Forecast.io server.');
    } else if (res.statusCode === 400) {
      callback('Unable to fetch weather');
    } else if (res.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      })
    }
  });
}

module.exports.getWeather = getWeather;
