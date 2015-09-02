var util = require('util'); 
var request = require('request');
var Q = require('q'); 
var gameDataMapper = require('./game-data-mapper'); 
var gameWeekFetcher = require('./game-week-fetcher'); 
request = Q.nbind(request, request); 

var WEEKLY_NFL_SCORE_URL = 'http://nfl.com/ajax/scorestrip?season=%d&seasonType=%s&week=%d'; 

module.exports = {
    getWeeklyGames: getWeeklyGames, 
    getWeeklyGame: getWeeklyGame,
    getCurrentGames: getCurrentGames, 
    getCurrentGame: getCurrentGame, 
    getUpcomingGames: getUpcomingGames, 
    getUpcomingGame: getUpcomingGame
}; 

function getWeeklyGames(seasonYear, seasonType, weekNumber) {
    var url = util.format(WEEKLY_NFL_SCORE_URL, seasonYear, seasonType, weekNumber); 
    return request(url).then(gameDataMapper.mapGameData);  
}

function getWeeklyGame(seasonYear, seasonType, weekNumber, teamId) {
    return getWeeklyGames(seasonYear, seasonType, weekNumber).then(function(data) {
        return filterGamesByTeam(data, teamId); 
    }); 
}

function getCurrentGames() {
    var info = gameWeekFetcher.fetchGameWeek(); 
    return getWeeklyGames(info.year, info.type, info.week); 
}

function getCurrentGame(teamId) {
    return getCurrentGames().then(function(data) {
        return filterGamesByTeam(data, teamId); 
    }); 
}

function getUpcomingGames(offset) {
    var info = gameWeekFetcher.fetchGameWeek(offset); 
    return getWeeklyGames(info.year, info.type, info.week); 
}

function getUpcomingGame(offset, teamId) {
    return getUpcomingGames(offset).then(function(data) {
        return filterGamesByTeam(data, teamId); 
    }); 
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



