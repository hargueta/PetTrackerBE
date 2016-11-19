var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var taskControllers = require('./controllers/task_controller');

var urlString = process.env.PROD_MONGODB ||
                "localhost/pettracker";

mongoose.connect(urlString, function(err, response) {
    if(err) {
        console.log('ERROR: failed to connect to ' + urlString + ': ' + err);
    } else {
        console.log('SUCCESS: connected to: ' + urlString);
    }
});

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set port
var port = process.env.PORT || 8080;

app.use('/', function(request, response) {
    response.json({message: 'Hello, World!'});
});

app.use('/task', taskControllers);

app.listen(port);

console.log('Listening on port ' + port);
