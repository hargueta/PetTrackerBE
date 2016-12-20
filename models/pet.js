var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var petSchema = new Schema({
  petName: String,
  dob: String,
  type: String,
  userId: String
});

module.exports = mongoose.model('Pet', petSchema);
