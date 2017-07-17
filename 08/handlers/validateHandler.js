var utility = require('../models/utility');
var queryUser = require('../models/user').queryUser;


var validateMap = {
  'username': utility.usernameValidate,
  'id': utility.idValidate,
  'phone': utility.phoneValidate,
  'email': utility.emailValidate
};

function validateHandler(req, res) {
  var query = "";
  req.on('data', chunk => query += chunk);
  req.on('end', () => {
    query = utility.getQuery(query);
    for (let key in query) {
      if (validateMap[key]) {
        res.write(JSON.stringify(validateMap[key](query[key])));
        break;
      }
    }
    res.end();
    this.log(req, res);
  });
}

exports.validateHandler = validateHandler;