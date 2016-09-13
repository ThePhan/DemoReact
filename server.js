
var express       = require('express');
var app           = express();
var config        = require('./isomorphic/server/config');
var Router        = express.Router();
var routes        = require('./isomorphic/server/router');
var port          = process.env.PORT || 3030;
var compression   = require('compression');
var path          = require('path')
// configure
  app             = config(app);
  routes.initialize(app, Router);

  app.use(compression());

  // serve our static stuff like index.css
  app.use(express.static(path.join(__dirname)));

  // send all requests to index.html so browserHistory works
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  })

  app.listen(port);
  console.log('Server is running at ' + port);
