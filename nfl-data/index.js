var util = require('util'); 
var request = require('request');
var Q = require('q'); 
var gameDataMapper = require('./game-data-mapper'); 
var gameWeekFetcher = require('./game-week-fetcher'); 
request = Q.nbind(request, request); 

var NFL_SCORE_URL = 'http://nfl.com/ajax/scorestrip?season=%d&seasonType=%s&week=%d'; 
var NFL_LIVE_SCORE_URL = 'http://nfl.com/liveupdate/scorestrip/ss.xml'; 

module.exports = {
    getGameOverviews: getGameOverviews, 
    getLiveScores: getLiveScores
}; 

function getGameOverviews(filter) {
    var info = {}; 
    if(filter.weekInfo) {
        info.year = filter.weekInfo.year; 
        info.type = filter.weekInfo.type;
        info.week = filter.weekInfo.week; 
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

function getLiveScores(filter) {
    var result = request(NFL_LIVE_SCORE_URL).then(gameDataMapper.mapGameData); 
    if(filter.team) {
        return result.then(function(data) {
            return filterGamesByTeam(data, filter.team); 
        }); 
    }
    
    return result; 
}

function getWeeklyGames(seasonYear, seasonType, weekNumber) {
    var url = util.format(NFL_SCORE_URL, seasonYear, seasonType, weekNumber); 
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
