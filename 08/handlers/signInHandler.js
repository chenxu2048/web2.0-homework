var validate = require('../models/utility').validate;
var addUser = require('../models/user').addUser;
var getQuery = require('../models/utility').getQuery;

function signInHandler(req, res) {
  var userData = "";
  req.on('data', chunk => {
    userData += chunk;
  });
  req.on('end', () => {
    var query = getQuery(userData), newUrl;
    if (validate(query)) {
      addUser(query);
      newUrl = `/index.html?username=${query.username}`
    } else {
      newUrl = 'index.html';
    }
    res.writeHead(303, {
      Location: newUrl
    });
    this.log(req, res);
    res.end();
  });
}

exports.signInHandler = signInHandler;