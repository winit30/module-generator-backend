var dbs = (schemaName) => {
  return `var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/${schemaName}_DB', { useMongoClient: true });

module.exports = {mongoose};`;
};

module.exports = {dbs};
