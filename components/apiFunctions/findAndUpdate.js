var findAndUpdate = (schemaName) => {

return `//Find by id and update
${schemaName}Schema.statics.findAndUpdate = function(id, body) {
  var ${schemaName} = this;
  return ${schemaName}.findByIdAndUpdate(id, {$set:body}, {new: true});
}`;

}

module.exports = {findAndUpdate};
