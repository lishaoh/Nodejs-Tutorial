const request = require('request');

var geocodeAddress = (address, callback) => {
  const encodeAddress = encodeURIComponent(address);

  console.log(encodeAddress);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
    json: true
  }, (error, res, body) => {
    if (error) {
      callback('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longtitude: body.results[0].geometry.location.lng
      })
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
