const request       = require('request'),
      timeFormater  = (tstamp) => {
        let date    = new Date(tstamp*1000),
            hours   = date.getHours(),
            minutes = '0' + date.getMinutes(),
            ampm    = 'am';

        if (hours > 12) {
          hours %= 12;
          ampm  = 'pm';
        }

        return hours + ':' + minutes.substr(-2) + ampm;
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
            const {summary, temperatureMin, temperatureMinTime, temperatureMax, temperatureMaxTime} = daily.data[0];

            callback(undefined, summary + ' It is currently ' + currently.temperature + ' degrees out. There is ' + currently.precipProbability + '% chance of rain. Today\'s temperatures will range from ' + temperatureMin + '&deg;F @ ' + timeFormater(temperatureMinTime) + ' to ' + temperatureMax + '&deg;F @ ' + timeFormater(temperatureMaxTime));
          }
        })
      };

module.exports = forecast;