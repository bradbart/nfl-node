var util = require('util'); 
var request = require('request');
var Q = require('q'); 
var gameDataMapper = require('./game-data-mapper'); 
var gameWeekFetcher = require('./game-week-fetcher'); 
request = Q.nbind(request, request); 

var WEEKLY_NFL_SCORE_URL = 'http://nfl.com/ajax/scorestrip?season=%d&seasonType=%s&week=%d'; 

module.exports = {
    getGameOverviews: getGameOverviews
}; 

function getGameOverviews(filter) {
    var info = {}; 
    if(filter.weekInfo) {
        info.year = filter.weekInfo.year,
        info.type = filter.weekInfo.type, 
        info.week = filter.weekInfo.week
    } else {
        info = gameWeekFetcher.fetchGameWeek(filter.offset || 0);  
    }
    
    var result = getWeeklyGames(info.year, info.type, info.week); 
    if(filter.team) {
        return result.then(function(data) {
            return filterGamesByTeam(data, filter.team);  
        }); 
    }
    
    return result; 
}

function getWeeklyGames(seasonYear, seasonType, weekNumber) {
    var url = util.format(WEEKLY_NFL_SCORE_URL, seasonYear, seasonType, weekNumber); 
    return request(url).then(gameDataMapper.mapGameData);  
}

function filterGamesByTeam(games, teamId) {
    var result = games.filter(function(game) {
        return game.homeTeam.id === teamId || game.visitorTeam.id === teamId; 
    }); 
    
    if(!result || !result.length) {
        return null; 
    }
    
    return result[0]; 
}



