var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

function createApp(db, env) {

  var routes = require('./routes/routers')(db);
  var api = require('./routes/api')(db);
  var app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.set('env', env);
  
  // uncomment after placing your favicon in /public
  app.use(favicon(path.join(__dirname, 'static/images/icon', 'info_icon.png')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'static')));


  app.use(session({
    secret: 'haha',
    key: 'session',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 5 * 24 * 60 * 60 * 1000},
    store: new mongoStore({
      db: 'session',
      host: 'localhost',
      port: process.env.MONGOPORT || '27017',
      url: `mongodb://localhost:${process.env.MONGOPORT || '27017'}/signin`
    })
  }));

  app.use('/', routes);
  app.use('/api', api);


  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  if (app.get('env') === 'production') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('404', {
        url: req.originalUrl,
        host: req.headers.host
      });
    });
  }
  // production error handler
  // no stacktraces leaked to user

  return app;
}

module.exports = createApp;
