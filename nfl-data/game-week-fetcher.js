var moment = require('moment'); 

module.exports = {
	fetchGameWeek: fetchGameWeek
}; 

function fetchGameWeek() {
    var weekType = 'REG'; 
    var currentDate = moment(); 
    var seasonStartWeek = moment(currentDate.year() + "-09-13", "YYYY-MM-DD").week();
    var currentWeek = currentDate.week() - seasonStartWeek + 1; 
    
    if(currentWeek < 1) {
       weekType = 'PRE'; 
       currentWeek += 4; 
    }
    
    return {
        year: currentDate.year(), 
        type: weekType, 
        week: currentWeek
    }; 
}

