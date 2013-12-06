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
var EventEmitter =  events.EventEmitter();

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

    //Sends Stats to the Client
    function send_stats(callback){
        var questions = ['ans1','ans2','ans3','ans4','ans5'];
        var answers = ['a','b','c','d'];
        var results = new Array();

        //Queries the database for all results
        for(var i = 0; i < questions.length; i++){
            for(var j = 0; j < answers.length; j++){
                //The callback function always executes last
                connection.query('SELECT count(*) AS count FROM user_answers WHERE '+questions[i]+'='+'"'+answers[j]+'";', function(err, rows){
                    if(err) throw err;
                    console.log('Number of people who answered '+ questions[i] + ' with ' + answers[j] + ': ' + rows[0].count);
                    results.push(rows[0].count);
                    console.log(results.join());

                    //In the case of the last callback, execute a new cascade of callbacks
                    if(results.length === (questions.length*answers.length)){
                        for(var k = 0; k < questions.length; k++){
                            console.log('hi');
                            var start_index = k*4;
                            callback(results, start_index, k+1);
                        }
                    }
                });
            }
        }
    }

    send_stats(function(results, start_index, question_number){
        //Sends results to the Client
        var statistics = {
            QuestionNumber: question_number,
            Answer1: results[start_index],
            Answer2: results[start_index + 1],
            Answer3: results[start_index + 2],
            Answer4: results[start_index + 3]
        };
        socket.emit('stats', statistics);
    });
});
//END SOCKET.IO

//MYSQL
var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';         // This is the name of an admin account on your MySQL server.
var MYSQL_PASS = '123re45p';     // This is the password of that account.
var DATABASE = 'surveyappdb';    // This is the name of the database

connection = mysql.createConnection({
    host: HOST,
    port: PORT,
    user: MYSQL_USER,
    password: MYSQL_PASS,
});

connection.connect();
connection.query('use ' + DATABASE);
//END MYSQL