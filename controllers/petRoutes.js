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
    pet.userId = request.body.user_id;

    // Save pet and check for errors
    pet.save(function(err) {
        if(err) {
            response.send(err);
        }
        response.json(pet);
    });

    // User.findByIdAndUpdate(
    //   request.body.user_id,
    //   { $push: {"pets": pet._id } },
    //   {safe: true, upsert: true},
    //     function(err, model) {
    //       console.log(err);
    //     }
    // );
    console.log("Pet ID: " + pet._id);
});

router.route('/getPetsForUser').post(function(request, response) {
    Pet.find({userId: request.body.user_id}, function(err, pets) {
        if(err) {
            response.send(err);
        }

        response.json(pets);
    });
});

// GET pet with id (using a GET at http://localhost:8080/pet/getPetWithId/:pet_id)
router.route('/getPetById/:pet_id').get(function(request, response) {
    Pet.findById(request.params.pet_id, function(err, pet) {
        if(err) {
            response.send(err);
        }

        response.json(pet);
    });
});

// Update pet with id (using a PUT at http://localhost:8080/pet/update/:pet_id)
router.route('/update/:pet_id').put(function(request, response) {
    Pet.findById(request.params.pet_id, function(err, pet) {
        if (err) {
            response.send(err);
        }

        var newPetName = request.body.petName;
        var newDOB = request.body.dob;
        var newType = request.body.type;

        if(newPetName) {
            pet.petName = newPetName;
        }

        if(newDOB) {
            pet.dob = newDOB;
        }

        if(newType) {
            pet.type = newType;
        }

        pet.save(function(err) {
            if (err) {
                response.send(err);
            }
            response.json({ message: 'Pet successfully updated!' });
        });

    });
});

// Delete pet with id (using a DELETE at http://localhost:8080/pet/delete/:pet_id)
router.route('/delete/:pet_id').delete(function(request, response) {
    Pet.remove({
        _id: request.params.pet_id
    }, function(err, pet) {
        if (err)
            response.send(err);
        response.json({ message: 'Successfully deleted pet!' });
    });
});

module.exports = router;
