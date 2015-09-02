var express = require('express'); 
var nflData = require('../nfl-data');

module.exports = express.Router()
	.get('/', function(request, response) {
		var result = nflData.getCurrentGames(); 
		response.send(result); 
	})
	.get('/:team', function(request, response) {
		var result = nflData.getCurrentGame(request.params.team.toUpperCase()); 
		response.send(result); 
	}); 