const express = require('express');
const path = require('path');
let router = express.Router();

module.exports = function(db) {

  const {
    infoController,
    registerController,
    loginController
  } = require(path.join(__dirname, '../controllers/controllers'))(db);



  router.get('/ping', (req, res, next) => {
    res.write('pong');
    res.end();
  });

  router.get('*', (req, res, next) => {
    if (req.query.username && req.session.user != req.query.username) {
      req.session.cheat = true;
    } else if (req.session.user && req.originalUrl != '/information') {
      res.redirect('/information');
    }
    next();
  });

  router.get('/', loginController);
  router.get('/login', loginController);
  router.get('/information', infoController);
  router.get('/regist', registerController);

  return router;
}