var url = require('url');
var getQuery = require('../models/utility').getQuery;
var queryUser = require('../models/user').queryUser;

function indexHandler(req, res) {
  var signUrl = url.parse(req.url), query = getQuery(signUrl.query);
  if (query.username !== undefined) {
    var info = queryUser(query.username), data = info ? this.renderHtml('views/info.html', info) : this.renderHtml('views/index.html');
    this.sendFile(res, data, '.html', 200);
  } else {
    this.sendFile(res, this.renderHtml('views/index.html'), '.html', 200);
  }
}

exports.indexHandler = indexHandler;