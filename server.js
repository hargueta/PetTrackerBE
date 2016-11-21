var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var taskRoutes = require('./controllers/taskRoutes');
var petRoutes = require('./controllers/petRoutes');
var userRoutes = require('./controllers/userRoutes');

var mongoose = require('mongoose');

var urlString = process.env.PROD_MONGODB ||
    "mongodb://localhost/pettracker";

mongoose.connect(urlString, function(err, response) {
    if(err) {
        console.log('ERROR: failed to connect to ' + urlString + ': ' + err);
    } else {
        console.log('SUCCESS: connected to: ' + urlString);
    }
});

// express app will use body-parser to get data from POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set port
var port = process.env.PORT || 8080;

// Define a prefix for all routes
// Can define something unique like MyRestAPI
app.use('/task', taskRoutes);
app.use('/pet', petRoutes);
app.use('/user', userRoutes);

app.listen(port);
console.log('RESTAPI listening on port: ' + port);
