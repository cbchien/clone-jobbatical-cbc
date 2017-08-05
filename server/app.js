// define db connection and port
var db = process.env.MONGODB_URI;
var port = process.env.PORT || 8888;


// load npm
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var dotenv = require('dotenv');
var app = express();

// Required application specific custom router module
var api = require('./src/routes/api');
var index = require('./src/routes/index');

// load in environment variables
dotenv.config({ verbose: true});

// Mongoose connection with mongodb
mongoose.Promise = global.Promise;
mongoose.Promise = require('bluebird');
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/clone')
mongoose.connect('mongodb://localhost/clone')
    .then(() => { // if database connected
      console.log('Successfully opend a connection to ' + process.env.MONGODB_URI);
    })
    .catch(err => { // if error connecting to db
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

// Use middlewares to set view engine and post json data to the server
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
	//express app use defined routers
app.use('/api', api);
// app.use('/', function(err, req, res) {
//   if (err) {
//     console.log('There is an error');
//     }
// })
	//the following should connect and allow use of the files in folder
app.use(express.static('./public'));	
app.get("*", function(req, res){
	res.sendFile(__dirname + '/src/public/index.html');
})

// Start the server
app.listen(port, function(){
  console.log('Server is running on Port: ', port);
});