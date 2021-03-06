var toJson = (schemaName, returnValue) => {

var pick = `${returnValue}`;

return `${schemaName}Schema.methods.toJSON = function() {
	var ${schemaName.toLowerCase()} = this;
	var ${schemaName.toLowerCase()}Object = ${schemaName.toLowerCase()}.toObject();
	return _.pick(${schemaName.toLowerCase()}Object, ${pick});
};`;

}

module.exports = {toJson};
