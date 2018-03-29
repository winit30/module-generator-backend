var api = (schemaName, schema) => {
return `const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

var ${schemaName}Schema = new mongoose.Schema(${schema} , {usePushEach: true});

${schemaName}Schema.statics.findEventsByUserId = function(userID) {
  var ${schemaName} = this;
  return ${schemaName}.find({userID})
}

var ${schemaName} = mongoose.model('${schemaName}', ${schemaName}Schema);

module.exports = {${schemaName}};`;
};

module.exports = {api};
