function loginController(req, res, next) {
  if (req.session.user) res.redirect('/information');
  else res.render('signin');
}

module.exports = loginController;