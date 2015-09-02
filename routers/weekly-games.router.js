var express = require('express'); 
var nflData = require('../nfl-data'); 

module.exports = express.Router()
	.get('/:year/:type/:week', function(request, response) {
		var result = nflData.getWeeklyGames(request.params.year, request.params.type, request.params.week); 
		response.send(result); 
	})
	.get('/:year/:type/:week/:team', function(request, response) {
		var result = nflData.getWeeklyGame(request.params.year, request.params.type, request.params.week, request.params.team.toUpperCase()); 
		response.send(result); 
	}); 
	