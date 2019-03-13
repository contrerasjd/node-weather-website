const request = require('request'),
      geocode = (address, callback) => {
        const urlAddress    = encodeURIComponent(address),
              uri           = `https://api.mapbox.com/geocoding/v5/mapbox.places/${urlAddress}.json`,
              access_token  = 'pk.eyJ1IjoiamNvbnRyZXJhczI4IiwiYSI6ImNqc3c5cTdhZzBmamgzem4yZGxjcWJmbjkifQ.fXh2lxegKBx1V3whD4Xvug',
              options = {
                uri,
                json  : true,
                qs    : {
                  access_token,
                  limit       : 1
                }
              };

        request(options, (error, response, {error:errorTxt, features}) => {
          if (error) {
            callback('Error: ' + error);
          } else if (errorTxt) {
            callback('Error: ' + errorTxt);
          } else if (features.length === 0) {
            callback('Error: No locations found');
          } else {
            callback(undefined, {lat: features[0].center[1], long: features[0].center[0], location: features[0].place_name});
          };
        });
      };

module.exports = geocode;