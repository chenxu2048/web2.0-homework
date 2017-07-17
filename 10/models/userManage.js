const _ = require('lodash');

class UserManage {
  constructor(db) {
    this.col = db.collection('user');
    return this;
  }

  checkRepeat(user) {
    return this.col.findOne({
      $or: _.map(_.omit(user, 'password'), (value, key) => ({[key]: value}))
    }).then(obj => {
      if (obj) throw 'repeat';
    });
  }

  checkExist(username) {
    return this.col.findOne({username}).then(obj => {
      if (!obj) throw 'not found';
    });
  }


  deleteUser(user) {
    return this.col.findAndRemove({
      username: use.username,
      password: user.password
    }).then(ret => {
      if (ret.value) return "success";
      else throw "failed";
    });
  }

  saveUser(user) {
    return this.col.insert(user);
  }

  loginTest(username, password) {
   return this.col.findOne({
      username,
      password
    }).then(obj => {
      if (!obj) throw "incorrect password";
      return obj;
    });
  }

  queryUser(username) {
    return this.col.findOne({username}).then(user => {
      if (user) return user;
      throw 'not found';
    });
  }

}


let instance = null;

module.exports = function(db) {
  if (instance === null) instance = new UserManage(db);
  return instance;
}
