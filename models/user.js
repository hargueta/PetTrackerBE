var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  pets: [String]
});

module.exports = mongoose.model('User', userSchema);
