var express = require('express'); 
var nflData = require('../nfl-data');

module.exports = express.Router()
	.get('/', function(request, response) {
		var result = nflData.getUpcomingGames(); 
		response.send(result); 
	})
	.get('/:team', function(request, response) {
		var result = nflData.getUpcomingGames(request.params.team.toUpperCase()); 
		response.send(result); 
	}); 