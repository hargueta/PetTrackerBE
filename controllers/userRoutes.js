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
router.route('/register').post(function(request, response) {
    var user = new User();

    // Set text and user values from the request
    user.email = request.body.email;
    user.username = request.body.username;
    user.password = request.body.password;

    function checkValidUsernameAndPassword(sendResult) {
        User.find({ $or: [ { email: user.email }, { username: user.username } ] }, function(err, retUser) {
            var emailValid = true;
            var usernameValid = true;

            if(err) {
                response.send(err);
            }

            if(retUser.length == 0) {
                emailValid = true;
                usernameValid = true;
            } else {
                for(var i = 0; i < retUser.length; i++) {
                    if(retUser[i].username == user.username) {
                        usernameValid = false;
                    }

                    if(retUser[i].email == user.email) {
                        emailValid = false;
                    }
                }
            }

            sendResult(emailValid, usernameValid);
        });
    }

    checkValidUsernameAndPassword(function(validEmail, validUsername) {
        if(validEmail && validUsername) {
            // Save user and check for errors
            user.save(function(err) {
                console.log('User was saved.');

                if(err) {
                    response.send(err);
                }

                response.json({email: validEmail.toString(), username: validUsername.toString(), userId: user._id});
            });
        } else {
            console.log('User was not saved.');
            response.json({email: validEmail.toString(), username: validUsername.toString()});
        }
    });
});

// Check if a user entered valid login credentials (using POST at http://localhost:8080/user/login)
router.route('/login').post(function(request, response) {
    var uname = request.body.username;
    var pass = request.body.password;

    User.find({username: uname, password: pass}, function(err, user) {
        console.log(err);
        if(err) {
            response.send(err);
        }

        console.log(user.length);

        if(user.length == 0) {
            response.json({result: "false"});
        } else {
            response.json({result: "true", user_id: user._id, username: uname});
        }

    });
});

module.exports = router;
