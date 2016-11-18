var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set port
var port = process.env.PORT || 8080;

app.use('/', function(request, response) {
    response.json({message: 'Hello, World!'});
})

app.listen(port)

console.log('Port: ' + port);
