let   timeZone;
const request       = require('request'),
      geoTz         = require('geo-tz'),
      timeFormater  = (tstamp) => {
        return new Date(tstamp*1000).toLocaleString([], { timeZone, hour12: true, hour: '2-digit', minute:'2-digit'});
      },
      forecast      = (lat, long, callback) => {
        const uri     = `https://api.darksky.net/forecast/6289164fd9efb239314ee4e534a487f3/${lat},${long}`,
              options = {
                uri,
                json  : true,
                qs    : {
                  units: 'us',
                  lang: 'en'
                }
              };

        request(options, (error, response, {error:errorTxt, daily, currently}) => {
          if (error) {
            callback('Error: ' + error);
          } else if (errorTxt) {
            callback('Error: ' + errorTxt);
          } else {
            const {
              summary,
              temperatureLow,
              temperatureLowTime,
              temperatureHigh,
              temperatureHighTime
            } = daily.data[0];

            timeZone = geoTz(lat,long)[0];

            callback(undefined, summary + ' It is currently ' + currently.temperature + ' degrees out. There is ' + currently.precipProbability + '% chance of rain. Today\'s temperatures will range from ' + Math.round(temperatureLow) + '&deg;F @ ' + timeFormater(temperatureLowTime) + ' to ' + Math.round(temperatureHigh) + '&deg;F @ ' + timeFormater(temperatureHighTime));
          }
        })
      };

module.exports = forecast;