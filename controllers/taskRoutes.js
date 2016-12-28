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
    task.taskTitle = request.body.taskTitle;
    task.description = request.body.description;
    task.isComplete = false;
    task.reminderTime = request.body.reminderTime;
    task.petId = request.body.pet_id;

    // Save task and check for errors
    task.save(function(err) {
        if(err) {
            response.send(err);
        }

        response.json({message: 'Task created successfully!'});
    });

    // Pet.findByIdAndUpdate(
    //   request.body.pet_id,
    //   { $push: {"tasks": task._id } },
    //   {safe: true, upsert: true},
    //     function(err, model) {
    //       console.log(err);
    //     }
    // );

    console.log("Task ID: " + task._id);
});

router.route('/getTasksForPet').post(function(request, response) {
    Task.find({petId: request.body.pet_id}, function(err, tasks) {
        if(err) {
            response.send(err);
        }

        response.json(tasks);
    });
});

// GET task with id (using a GET at http://localhost:8080/task/getTaskWithId/:task_id)
router.route('/getTaskById/:task_id').get(function(request, response) {
    Task.findById(request.params.task_id, function(err, task) {
        if(err) {
            response.send(err);
        }

        response.json(task);
    });
});

// Update task with id (using a PUT at http://localhost:8080/task/update/:task_id)
router.route('/update/:task_id').put(function(request, response) {
    Task.findById(request.params.task_id, function(err, task) {
        if (err) {
            response.send(err);
        }
        var newTaskTitle = request.body.taskTitle;
        var newDescription = request.body.description;
        var newIsComplete = request.body.isComplete;
        var newReminderTime = request.body.reminderTime;

        if(newTaskTitle) {
            task.taskTitle = newTaskTitle;
        }

        if(newDescription) {
            task.description = newDescription;
        }

        if(newIsComplete) {
            task.isComplete = newIsComplete;
        }

        if(newReminderTime) {
            task.reminderTime = newReminderTime;
        }

        task.save(function(err) {
            if (err) {
                response.send(err);
            }
            response.json({ message: 'Task successfully updated!' });
        });

    });
});

// Delete task with id (using a DELETE at http://localhost:8080/task/delete/:task_id)
router.route('/delete').delete(function(request, response) {
    Task.remove({
        _id: request.body.task_id
    }, function(err, task) {
        if (err)
            response.send(err);
        response.json({ message: 'Successfully deleted task!' });
    });
});

module.exports = router;
