var findByToken = (schemaName) => {

return `${schemaName}Schema.statics.findByToken = function(token) {
	var ${schemaName} = this;
	var decoded;

	try {
		decoded = jwt.verify(token, 'abc123');
	} catch(e) {
		return Promise.reject();
	}

	return ${schemaName}.findOne({
		'_id': decoded._id,
		'tokens.token':token,
		'tokens.access':'auth'
	})
};`;

}

module.exports = {findByToken}
