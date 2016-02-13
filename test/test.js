var assert = require('assert');
var fetcher = require('../nfl-data/game-week-fetcher.js'); 

describe('NFL Data - Game Week Fetcher', function() {
    it('should return the year 2015', function () {
        var result = fetcher.fetchGameWeek(0);
        assert.equal(result.year, 2015); 
    });
});