var findAndDelete = (schemaName) => {

return `// Find by id and delete
${schemaName}Schema.statics.findAndDelete = function(_id, userID) {
  var ${schemaName} = this;
  return ${schemaName}.remove({_id, userID});
}`;

}

module.exports = {findAndDelete};
