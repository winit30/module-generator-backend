var mongoose = require('mongoose');

mongodb_url = "mongodb://vineet30:Buntymis30!@ds141889.mlab.com:41889/modulegenerator";

mongoose.Promise = global.Promise;
mongoose.connect(mongodb_url);

module.exports = {mongoose};
