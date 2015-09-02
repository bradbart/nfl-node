
var express = require('express'); 
var nflData = require('../nfl-data');

var liveDataRouter = express.Router(); 

liveDataRouter.get('/', function(request, response) {
	var result = nflData.getCurrentGames(); 
	response.send(result); 
}); 

liveDataRouter.get('/:team', function(request, response) {
	var result = nflData.getCurrentGame(request.params.team.toUpperCase()); 
	response.send(result); 
}); 

module.exports = liveDataRouter; 