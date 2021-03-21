var moment = require('moment');


exports.otpLessThanTenMinute = (otptime) => {
    return moment(otptime).isBefore(moment().subtract(10, 'minute'));
}

