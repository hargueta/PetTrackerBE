var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    taskTitle: String,
    description: String,
    isComplete: Boolean,
    reminderTime: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Task', taskSchema);
