const _ = require('lodash');

const apiUpdateFunctions = (schemaName, functions) => {

  var updateFunctions = '';

  functions.forEach((func) => {
    if(func.type === "update"){
      func.categories.forEach((category) => {
        if(category.access === "private") {

updateFunctions += `//Find by id and update (${category.access})
${schemaName}Schema.statics.update${_.capitalize(category.update)} = function(${category.param}, userID, body) {
  const ${schemaName} = this;
  return ${schemaName}.update({${category.param}, userID}, {$set:body}, {new: true});
}\n\n`;

        } else {
          
updateFunctions += `//Find by id and update (${category.access})
${schemaName}Schema.statics.update${_.capitalize(category.update)} = function(${category.param}, body) {
  const ${schemaName} = this;
  return ${schemaName}.update({${category.param}}, {$set:body}, {new: true});
}\n\n`;

        }
      });
    }

  });

  return updateFunctions;

}

module.exports = {apiUpdateFunctions};
