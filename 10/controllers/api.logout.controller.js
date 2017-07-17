function logoutController(req, res, next) {
  delete req.session.user;
  res.write(JSON.stringify({status: 1}));
  res.end();  
}

module.exports = logoutController;