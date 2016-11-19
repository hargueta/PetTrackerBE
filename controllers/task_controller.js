var express = require('express');
var taskRouter = express.Router();

var Task = require('../models/task');

taskRouter.use(function(request, response, next) {
    console.log('Reached task endpoint.');
    next();
});

taskRouter.route('/get_all')
    .get(function(request, response) {
        Task.find(function(err, tasks) {
            if(err) {
                response.send(err);
            }

            response.json(tasks);
        });
    });

taskRouter.route('/create')
    .post(function(request, response) {
        var task = new Task();

        task.petName = request.body.petName;
        task.description = request.body.description;

        task.save(function(err) {
            if(err) {
                response.send(err);
            }

            response.json({message: 'Task was created successfully!'});
        });
    });

module.exports = taskRouter;