var removeToken = (schemaName) => {

return `${schemaName}Schema.methods.removeToken = function(token) {
	var ${schemaName.toLowerCase()} = this;

	return ${schemaName.toLowerCase()}.update({
		$pull: {
			tokens: {token}
		}
	});
}`;

}

module.exports = {removeToken};
