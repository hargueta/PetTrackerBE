var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var urlString = process.env.MONGOLAB_URI ||
                process.env.MONGOHQ_URL ||
                "localhost/pettracker";

mongoose.connect(urlString);

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set port
var port = process.env.PORT || 8080;

app.use('/', function(request, response) {
    response.json({message: 'Hello, World!'});
})

app.listen(port);

console.log('Listening on port ' + port);
