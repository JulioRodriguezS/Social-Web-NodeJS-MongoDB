const moment = require('moment')
const helpers = {}

helpers.timeAgo=(savedDate)=>{
    return moment(savedDate).startOf('minute').fromNow()
}

module.exports = helpers
