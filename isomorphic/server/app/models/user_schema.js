var mongoose = require('mongoose');
var connectmongo = require('../../connect_mongo');
var Schema = mongoose.Schema;

mongoose = connectmongo.initialize(mongoose);

var User = new Schema({
	"_id": String,
	"firstName": String,
	"lastName": String,
	"photo": String,
	"friends":[]
});
module.exports = mongoose.model('User', User);
