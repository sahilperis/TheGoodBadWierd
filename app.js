/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

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

app.get('/', routes.index);
app.get('/TourSurveyForm', routes.tourSurveyForm);
app.get('/TourSurveyResults', routes.tourSurveyResults);
app.get('/Contact', routes.contact);

var server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io  = require('socket.io').listen(server);
io.set('log level', 1);

io.sockets.on('connection', function (socket) {
  console.log("Connected on server");
 	
 	//queried from database 
 	var ServiceStatistics = {
		Answer1: 42,
		Answer2: 69
	};
  
  socket.emit('data', something);
  
});