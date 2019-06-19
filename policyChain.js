
var mongoose = require('mongoose');

var policySchema = new mongoose.Schema({
    perviousHash: String,
    deligator:String,
    deligatee:String,
    policy:String,
    hash:String,
    timestamp:String,
    validDate:String
});

module.exports = mongoose.model('policy',policySchema);