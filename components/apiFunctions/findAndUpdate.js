var findAndUpdate = (schemaName) => {

return `//Find by id and update
${schemaName}Schema.statics.findAndUpdate = function(_id, userID, body) {
  var ${schemaName} = this;
  return ${schemaName}.update({_id, userID}, {$set:body}, {new: true});
}`;

}

module.exports = {findAndUpdate};
