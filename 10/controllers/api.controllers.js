module.exports = function(db) {
  const {
    loginSubmitController,
    usernameValidateController
  } = require('./api.login.controller')(db);

  const {
    registerSubmitController,
    validatorController
  } = require('./api.register.controller')(db);

  const logoutController = require('./api.logout.controller');

  return {
    loginSubmitController,
    usernameValidateController,
    logoutController,
    registerSubmitController,
    validatorController
  }
}