// Dependencies
require('./dbconfig');
var express = require('express');
// var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// // MongoDB
// mongoose.connect('mongodb://localhost/hacknewsDB',{useNewUrlParser:true});

// Express
var app = express();
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = 3000;

app.get('/', function(req, res) {
	res.send('We are at server side.');
});

// Routes
app.use('/api', require('./routes/api'));

app.listen(port);
console.log('Listening on port ', port);