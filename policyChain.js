
var mongoose = require('mongoose');

var blockSchema = new mongoose.Schema({
    perviousHash: String,
    data:String,
    hash:String,
    timestamp:String,
});

module.exports = mongoose.model('block',blockSchema);
