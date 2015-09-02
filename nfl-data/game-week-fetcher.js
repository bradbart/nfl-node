var moment = require('moment'); 

module.exports = {
	fetchGameWeek: fetchGameWeek
}; 

function fetchGameWeek(offset) {
    var weekType = 'REG'; 
    var targetDate = moment().add(offset, 'weeks'); 
    var seasonStartDay = moment("2015-09-10", "YYYY-MM-DD").dayOfYear();
    var currentWeek = Math.floor((targetDate.dayOfYear() - seasonStartDay)/7) + 1; 
    
    if(currentWeek < 1) {
       weekType = 'PRE'; 
       currentWeek += 4; 
    }
    
    return {
        year: 2015, 
        type: weekType, 
        week: currentWeek
    }; 
}

