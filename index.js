var express = require('express'); 
var nflData = require('./nfl-data');

var app = express(); 
app.use(Error404Handler); 
app.use(require('express-promise')()); 
app.use('/overviews', require('./routers/game-overviews.router')); 
app.use('/test', function(request, response){
    response.send('testing #3'); 
}); 
app.use(Error500Handler); 

function Error404Handler(_, response, next) {
	var send = response.send.bind(response); 
	response.send = function(body) {
		if(!body || body === "false") {
			response.status(404); 
			send('404 - Resource Not Found'); 
		} else {
			send(body); 		
		}
	}; 
	next(); 
}

function Error500Handler(error, request, response, next) {
	console.error(error, error.stack); 
	response.status(500).send('500 - An Error Occurred'); 
}

app.listen(3000); 
