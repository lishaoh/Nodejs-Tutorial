const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    const encodeAddress = encodeURIComponent(address);

    console.log(encodeAddress);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
      json: true
    }, (error, res, body) => {
      if (error) {
        reject('Unable to connect to Google servers.');
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find that address');
      } else if (body.status === 'OK') {
        resolve(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longtitude: body.results[0].geometry.location.lng
        })
      }
    });
  })
}

geocodeAddress('0000').then(location => {
  console.log(JSON.stringify(location, undefined, 2));
}, errorMsg => console.log(errorMsg))
