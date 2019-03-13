const path        = require('path'),
      express     = require('express'),
      hbs         = require('hbs'),

      geocode     = require('../utils/geocode'),
      forecast    = require('../utils/forecast'),

      app         = express(),
      port        = process.env.PORT || 3000,

      // Define paths for express config.
      pathPubDir  = path.join(__dirname, '../public'),
      pathViews   = path.join(__dirname, '../templates/views'),
      pathParts   = path.join(__dirname, '../templates/partials');


// Setup handlebars and 'views' location
// https://www.npmjs.com/package/hbs
app.set('view engine', 'hbs');
app.set('views', pathViews);
hbs.registerPartials(pathParts);

// Setup static directory to serve
app.use(express.static(pathPubDir));

app.get('/', (req, res) => {
  res.render('index', {
    title   : 'Weather',
    name    : 'JoJo',
    location: 'Phoenix, AZ',
    weather : 'Scattered clouds'
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title   : 'About',
    name    : 'JoJo',
    location: 'Phoenix, AZ',
    weather : 'Scattered clouds'
  });
})

app.get('/help', (req, res) => {
  res.render('help', {
    title   : 'Help',
    name    : 'JoJo',
    message : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed eros lacinia nisl facilisis lobortis et nec massa. Aenean feugiat tortor risus, posuere tincidunt diam commodo at. Nam fermentum id eros vitae efficitur. Aliquam finibus elit ac congue interdum. Ut at tristique elit. Sed ac quam luctus nunc aliquam feugiat ac eget arcu. Aenean commodo ultricies ex non laoreet. Aenean consequat ante sit amet varius condimentum. In luctus dolor dolor, eget malesuada lacus interdum id. Aliquam non sapien nunc. Morbi ullamcorper viverra nibh id egestas. Donec mauris tellus, posuere nec turpis vel, sodales sodales lacus. Phasellus consequat nibh id tortor hendrerit dignissim. Integer tincidunt posuere massa, ut posuere massa dignissim eget. Nam mauris tortor, molestie eget volutpat a, ullamcorper vel eros.'
  });
})

app.get('/weather', (req, res) => {
  if (!req.query.address)
    return res.send({ error: 'You must provide an address.' });

  const {address} = req.query;

  geocode(address, (error, {lat, long, location} = {}) => {
    if (error) return res.send({ error });
  
    forecast(lat, long, (error, forecast) => {
      if (error) return res.send({ error });

      res.send({
        address,
        location,
        forecast
      });
    });
  });
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title   : 404,
    name    : 'JoJo',
    message : 'Help article not found'
  });
})

app.get('*', (req, res) => {
  res.render('404', {
    title   : 404,
    name    : 'JoJo',
    message : 'Page not found'
  });
})

app.listen(port, () => console.log('Server is up on port: ' + port));