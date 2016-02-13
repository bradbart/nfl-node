var xml2js = require('xml2js'); 
var Q = require('q'); 
xml2js.parseString = Q.nbind(xml2js.parseString, xml2js); 

module.exports = {
	mapGameData: mapGameData
}; 

function mapGameData(data) {
    return xml2js.parseString(data[0].body).then(transformResult);       
}

function transformResult(data) {
    var results = data.ss.gms[0].g.map(projectToGame); 
    results.forEach(function(item) {
        var update; 
        item.updateText = ""; 
        if(data.ss.bps) {
             update = data.ss.bps[0].b.filter(function(update) {
                return update.$.eid === item.id; 
            })[0]; 
            item.updateText = update && update.$.x || ""; 
        } else if(data.ss.igh) {
            update = item.updateText = data.ss.igh[0].h.filter(function(update) {
                return update.eid === item.id; 
            })[0];
            item.updateText = update && update.$.x || "";             
        }
    }); 
    return results; 
}

function projectToGame(data) {
    data = data.$ || data; 
    var result = {
        id: data.eid, 
        gameDay: data.d, 
        gameTime: data.t, 
        status: {
            quarter: data.q, 
            timeRemaining: data.k,
            possession: data.p 
        },
        homeTeam: {
            id: data.h, 
            name: data.hnn,
            score: data.hs || 0
        }, 
        visitorTeam: {
            id: data.v, 
            name: data.vnn,
            score: data.vs || 0
        } 
    }; 
    result.status.text = getGameStatusText(result); 
    
    return result; 
}

function getGameStatusText(game) {
    switch(game.status.quarter) {
        case 'P': 
            return game.gameDay + ' @ ' + game.gameTime; 
        case 'H': 
            return 'Halftime'; 
        case 'F': 
            return 'Final'; 
        default: 
            return 'Q' + game.status.quarter + ' ' + game.status.timeRemaining + ' - ' + game.status.possession; 
    }
}

