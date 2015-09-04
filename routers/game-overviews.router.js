var express = require('express'); 
var nflData = require('../nfl-data');

module.exports = express.Router()
	.get('/live/:team?', liveHandler)
	.get('/upcoming/:offset/:team?', requestHandler)
	.get('/:year/:type/:week/:team?', requestHandler)
	
function requestHandler(request, response) {
	var filter = {}; 
	if(request.params.year) {
		filter.weekInfo = {
			year: request.params.year, 
			type: request.params.type, 
			week: request.params.week
		}; 
	}
	filter.offset = request.params.offset || null; 
	filter.team = request.params.team || null; 
	
	response.send(nflData.getGameOverviews(filter)); 
}

function liveHandler(request, response) {
	var filter = {}; 
	filter.team = request.params.team || null; 
	var result = nflData.getLiveScores(filter); 
	response.send(result); 
}