var File = require('../src/File').File;
var userMessage = JSON.parse(File.readFileSync('data/user.json')['data'].toString() || "{}");
function syncMessage() {
  File.writeFile('data/user.json', JSON.stringify(userMessage));
}
function queryUser(username) {
  if (userMessage === undefined) loadMessage();
  return userMessage[username];
}
function addUser(user) {
  userMessage[user.username] = user;
  syncMessage();
}
function checkRepeat(param, data) {
  for (let key in userMessage) {
    if (userMessage[key][param] == data) return true;
  }
  return false;
}

exports.checkRepeat = checkRepeat;
exports.addUser = addUser;
exports.queryUser = queryUser;