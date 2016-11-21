var express = require('express');

// Get the router
var router = express.Router();

var Pet = require('../models/pet');
var User = require('../models/user');


// GET all pets (using a GET at http://localhost:8080/pet/pets)
router.route('/pets').get(function(request, response) {
    Pet.find(function(err, pets) {
        if(err) {
            response.send(err);
        }

        response.json(pets);
    });
});

// Create a pet (using POST at http://localhost:8080/pet/create)
router.route('/create').post(function(request, response) {
    var pet = new Pet();

    // Set text and user values from the request
    pet.petName = request.body.petName;
    pet.dob = request.body.dob;
    pet.type = request.body.type;

    // Save pet and check for errors
    pet.save(function(err) {
        if(err) {
            response.send(err);
        }
        response.json({message: 'Pet created successfully!'});
    });

    User.findByIdAndUpdate(
      request.body.user_id,
      { $push: {"pets": pet._id } },
      {safe: true, upsert: true},
        function(err, model) {
          console.log(err);
        }
    );
    console.log("Pet ID: " + pet._id);
});

module.exports = router;
