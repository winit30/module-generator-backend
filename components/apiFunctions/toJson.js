var toJson = (schemaName) => {

return `${schemaName}Schema.methods.toJSON = function() {
	var ${schemaName.toLowerCase()} = this;
	var ${schemaName.toLowerCase()}Object = ${schemaName.toLowerCase()}.toObject();

	return _.omit(${schemaName.toLowerCase()}Object, ['password', 'token']);
};`;

}

module.exports = {toJson};
