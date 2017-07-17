var App = require('./src/Route').app;
var File = require('./src/File').File;
var querystring = require('querystring');
var url = require('url');
var indexHandler = require('./handlers/indexHandler').indexHandler;
var signInHandler = require('./handlers/signInHandler').signInHandler;
var validateHandler = require('./handlers/validateHandler').validateHandler;

var app = new App({
  static: 'static'
});

app.register('/', indexHandler, 'GET');
app.register('/index.html', indexHandler, 'GET');
app.register('/signin', signInHandler, 'POST');
app.register('/api/validate', validateHandler, 'POST');
app.run();
