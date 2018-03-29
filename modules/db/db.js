var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/MyApp_DB', { useMongoClient: true });

module.exports = {mongoose};