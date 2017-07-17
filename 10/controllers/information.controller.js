let UserManage;

function infoController(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    let cheat = req.session.cheat;
    delete req.session.cheat;
    UserManage.queryUser(req.session.user).then(user => {
      user.cheat = cheat;
      res.render('information', user);
      res.end();
    }).catch(err => {
      delete req.session.user;
      res.redirect('/login');
    });
  }
}

module.exports = function(db) {
  if (!UserManage) UserManage = require('../models/userManage')(db);
  return infoController;
}