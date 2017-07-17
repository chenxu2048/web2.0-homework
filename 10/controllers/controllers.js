module.exports = function(db) {

  const infoController = require('./information.controller')(db);
  const registerController = require('./register.controller');
  const loginController = require('./login.controller');
  return {
    infoController,
    registerController,
    loginController
  };
};