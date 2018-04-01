var findByUserId = (schemaName) => {

return `//Find by userID
${schemaName}Schema.statics.find${schemaName}sByUserId = function(userID) {
  var ${schemaName} = this;
  return ${schemaName}.find({userID})
}`;

}

module.exports = {findByUserId};
