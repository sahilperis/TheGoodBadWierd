/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/TourSurveyForm', routes.tourSurveyForm);
app.get('/TourSurveyResults', routes.tourSurveyResults);
app.get('/Contact', routes.contact);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//SOCKET.IO
io = require('socket.io').listen(server);
io.set('log level', 1);

count = [0,0,0,0];  //used in route TourSurveyResults

io.sockets.on('connection', function (socket) {
    console.log("Connected on server");

    //queried from database
    var statistics = {
        Answer1: count[0],
        Answer2: count[1],
        Answer3: count[2],
        Answer4: count[3]
    };
    socket.emit('data', statistics);
});
//END SOCKET.IO

//MYSQL
var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';           // This is the name of an admin account on your MySQL server.*
var MYSQL_PASS = '123re45p';     // This is the password of that account.*
var DATABASE = 'surveyappdb';      // This is the name of the database*

connection = mysql.createConnection({
    host: HOST,
    port: PORT,
    user: MYSQL_USER,
    password: MYSQL_PASS,
});

connection.connect();
connection.query('use ' + DATABASE);
//END MYSQL