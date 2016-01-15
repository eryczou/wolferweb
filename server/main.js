import config from '../config'
import webpack from 'webpack'
import webpackConfig from '../build/webpack.config'
import _debug from 'debug'

const debug = _debug('app:server')
const paths = config.utils_paths

// common util
var request = require('request');
var xml2js = require('xml2js');
// express
var express = require('express');
var bodyParser = require('body-parser'); // parse request from XHR (express4)
var logger = require('morgan'); // log requests to the console (express4)
// mongoose
var mongoose = require('mongoose');
// react
var swig  = require('swig');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Router = require('react-router');
var routes = require(paths.client('routes'));

// ------------------------------------
// Mongodb
// ------------------------------------
mongoose.connect(config.mongo_uri);
var mongodb = mongoose.connection;
mongodb.on('error', function() {
  debug('Could not connect to MongoDB. Did you forget to run `mongod`?');
});
mongodb.once('open', function callback() { console.log('Database connected');});
mongodb.on('disconnected', function () {
  mongoose.connect(config.mongo_uri);
});

// ------------------------------------
// Express
// ------------------------------------
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig);

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output;

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: config.compiler_quiet,
    publicPath,
    contentBase: paths.base(config.dir_client),
    hot: true,
    quiet: config.compiler_quiet,
    lazy: false,
    stats: config.compiler_stats
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log
  }));

  // Serve static assets from ~/src/static since Webpack is unaware of these files.
  app.use(express.static((paths.client('static'))));
} else {
  debug(
    'Server is being run outside of live development mode. This starter kit ' +
    'does not provide any production-ready server functionality. To learn ' +
    'more about deployment strategies, check out the "deployment" section ' +
    'in the README.'
  );

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(paths.base(config.dir_dist)));
}

// ------------------------------------
// React Router
// ------------------------------------
require('./routes')(app);

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      //var html = ReactDOMServer.renderToString(React.createElement(Router.RoutingContext, renderProps));
      //var page = swig.renderFile('index.html', { reactServerRenderHtml: html });
      var page = swig.renderFile('./public/index.html');
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

// ------------------------------------
// Socket.io
// ------------------------------------
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

export default server;
