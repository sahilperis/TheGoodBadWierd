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

//gets out count of users who answered ans1
var q = 'ans1'; //the column where we want the answer from
var qAns = '"a"'; //the answer we want
var count = '';
//This query counts the number of tuples where answer is equal to 'a'
//connection.query("insert into user_answers (user_name, student, ans1, ans2, ans3, ans4) value('Tanya Gupta', true, 'b', 'b','c','d');");
//connection.query("insert into user_answers (user_name, student, ans1, ans2, ans3, ans4) value('The Rock', true, 'a', 'b','c','d');");    

connection.query('SELECT count(*) AS count FROM user_answers WHERE '+q+'='+qAns+';', function(err, rows, fields){
  if(err) throw err;
  console.log('Number of people who answered '+qAns);
  count = rows[0].count;
  console.log(rows[0].count);
});

//SOCKET.IO
var io  = require('socket.io').listen(server);
io.set('log level', 1);

io.sockets.on('connection', function (socket) {
  console.log("Connected on server");
 	
 	//queried from database 
 	var ServiceStatistics = {
		Answer1: count,
		Answer2: 69
	};
  
  socket.emit('data', ServiceStatistics);
  
});