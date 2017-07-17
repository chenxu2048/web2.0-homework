const express = require('express');
const router = express.Router();

module.exports = function(db) {
  const {
    loginSubmitController,
    usernameValidateController,
    registerSubmitController,
    validatorController,
    logoutController
  } = require('../controllers/api.controllers')(db);

  router.post('/logout', logoutController);
  router.post('/login', loginSubmitController);
  router.post('/username', usernameValidateController);
  router.post('/register', registerSubmitController);
  router.post('/validate', validatorController);

  return router;
}