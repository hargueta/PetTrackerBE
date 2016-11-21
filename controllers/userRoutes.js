var express = require('express');

// Get the router
var router = express.Router();

var User = require('../models/user');

// GET all users (using a GET at http://localhost:8080/user/users)
router.route('/users').get(function(request, response) {
    User.find(function(err, users) {
        if(err) {
            response.send(err);
        }
        response.json(users);
    });
});

// Create a user (using POST at http://localhost:8080/user/create)
router.route('/create').post(function(request, response) {
    var user = new User();

    // Set text and user values from the request
    user.username = request.body.username;
    user.password = request.body.password;

    // Save user and check for errors
    user.save(function(err) {
        if(err) {
            response.send(err);
        }
        response.json({message: 'User created successfully!'});
    });
    console.log("User ID: " + user._id);
});

module.exports = router;
