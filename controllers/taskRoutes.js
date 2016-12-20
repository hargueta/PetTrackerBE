var express = require('express');

// Get the router
var router = express.Router();

var Task = require('../models/task');
var Pet = require('../models/pet');

// Middleware for all this routers requests
router.use(function timelog(request, response, next) {
    next();
});

// Welcome message for a GET at http://localhost:8080/restapi
router.get('/api', function(req, res) {
    res.json({message: 'Welcome to the REST API'});
});

// GET all tasks (using a GET at http://localhost:8080/task/tasks)
router.route('/tasks').get(function(request, response) {
    Task.find(function(err, tasks) {
        if(err) {
            response.send(err);
        }

        response.json(tasks);
    });
});

// Create a task (using POST at http://localhost:8080/task/create)
router.route('/create').post(function(request, response) {
    var task = new Task();

    // Set text and user values from the request
    task.title = request.body.title;
    task.description = request.body.description;
    task.isComplete = false;
    task.reminderTime = request.body.reminderTime;

    // Save task and check for errors
    task.save(function(err) {
        if(err) {
            response.send(err);
        }

        response.json({message: 'Task created successfully!'});
    });

    Pet.findByIdAndUpdate(
      request.body.pet_id,
      { $push: {"tasks": task._id } },
      {safe: true, upsert: true},
        function(err, model) {
          console.log(err);
        }
    );

    console.log("Task ID: " + task._id);
});

// GET task with id (using a GET at http://localhost:8080/task/tasks/:task_id)
router.route('/tasks/:task_id').get(function(request, response) {
    Task.findById(request.params.task_id, function(err, task) {
        if(err) {
            response.send(err);
        }

        response.json(task);
    });
});

// Update task with id (using a PUT at http://localhost:8080/task/tasks/:task_id)
router.route('/tasks/:task_id').put(function(request, response) {
    Task.findById(request.params.task_id, function(err, task) {
        if (err) {
            response.send(err);
        }
        // Update the task text
        task.description = request.body.description;
        task.save(function(err) {
            if (err) {
                response.send(err);
            }
            response.json({ message: 'Task successfully updated!' });
        });

    });
});

// Delete task with id (using a DELETE at http://localhost:8080/task/tasks/:task_id)
router.route('/tasks/:task_id').delete(function(request, response) {
    Task.remove({
        _id: request.params.task_id
    }, function(err, task) {
        if (err)
            response.send(err);
        response.json({ message: 'Successfully deleted task!' });
    });
});

module.exports = router;
