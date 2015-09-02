var xml2js = require('xml2js'); 
var Q = require('Q'); 
xml2js.parseString = Q.nbind(xml2js.parseString, xml2js); 

module.exports = {
	mapGameData: mapGameData
}; 

function mapGameData(data) {
    return xml2js.parseString(data[0].body).then(transformResult);       
}

function transformResult(data) {
    return data.ss.gms[0].g.map(projectToGame); 
}

function projectToGame(data) {
    data = data.$; 
    return {
        id: data.eid, 
        day: data.d, 
        time: data.t, 
        quarter: data.q, 
        homeTeam: {
            id: data.h, 
            name: data.hnn, 
            score: data.hs
        }, 
        visitorTeam: {
            id: data.v, 
            name: data.vnn, 
            score: data.vs
        }
    }; 
}