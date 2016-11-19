var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    petName: String,
    description: String
});

module.exports = mongoose.model('Task', taskSchema);