/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var events = require('events');
var mysql = require('mysql');

var app = express();

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

//all routes
app.get('/', routes.index);
app.get('/TourSurveyForm', routes.tourSurveyForm);
app.get('/TourSurveyResults', routes.tourSurveyResults);
app.get('/Contact', routes.contact);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//SOCKET.IO
var io = require('socket.io').listen(server);
io.set('log level', 1);

io.sockets.on('connection', function (socket) {
    console.log("Connected on server");

    //Control Flow
    var EventEmitter = events.EventEmitter;
    var flowController = new EventEmitter();
    flowController.on('start', function(){
        var questions = ['ans1','ans2','ans3','ans4','ans5'];
        var answers = ['a','b','c','d'];
        var count = [5,5,5,5];

        //Queries the database for all results
        for(var i = 0; i < questions.length; i++){
            for(var j = 0; j < answers.length; j++){
                connection.query('SELECT count(*) AS count FROM user_answers WHERE '+questions[i]+'='+'"'+answers[j]+'";', function(err, rows, fields){
                    if(err) throw err;
                    console.log('Number of people who answered '+ questions[i] + ' with ' + answers[j]);
                    count[j] = rows[0].count;
                    console.log(count[j]);
                });
            }
            flowController.emit('end', count, i);
        }
    });
    flowController.on('end', function(count, i){
        //Sends results to the Client
        var statistics = {
            QuestionNumber: i+1,
            Answer1: count[0],
            Answer2: count[1],
            Answer3: count[2],
            Answer4: count[3]
        };
        socket.emit('stats', statistics);
    });
    flowController.emit('start');
});
//END SOCKET.IO

//MYSQL
var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';         // This is the name of an admin account on your MySQL server.*
var MYSQL_PASS = '123re45p';     // This is the password of that account.*
var DATABASE = 'surveyappdb';    // This is the name of the database*

connection = mysql.createConnection({
    host: HOST,
    port: PORT,
    user: MYSQL_USER,
    password: MYSQL_PASS,
});

connection.connect();
connection.query('use ' + DATABASE);
//END MYSQL