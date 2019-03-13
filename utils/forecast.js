const request   = require('request'),
      forecast  = (lat, long, callback) => {
        const uri     = `https://api.darksky.net/forecast/6289164fd9efb239314ee4e534a487f3/${lat},${long}`,
              options = {
                uri,
                json  : true,
                qs    : {
                  units: 'si',
                  lang: 'es'
                }
              };

        request(options, (error, response, {error:errorTxt, daily, currently}) => {
          if (error) {
            callback('Error: ' + error);
          } else if (errorTxt) {
            callback('Error: ' + errorTxt);
          } else {
            callback(undefined, daily.data[0].summary + ' It is currently ' + currently.temperature + ' degrees out. There is ' + currently.precipProbability + '% chance of rain.');
          }
        })
      };

module.exports = forecast;