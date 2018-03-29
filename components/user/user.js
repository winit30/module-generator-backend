const user = (schemaName, schema) => {

return `const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var ${schemaName}Schema = new mongoose.Schema(${schema} , {usePushEach: true});

${schemaName}Schema.methods.toJSON = function() {
	var ${schemaName.toLowerCase()} = this;
	var ${schemaName.toLowerCase()}Object = ${schemaName.toLowerCase()}.toObject();

	return _.pick(${schemaName.toLowerCase()}Object, ['_id', 'name', 'email']);
};

${schemaName}Schema.methods.generateAuthToken = function() {
	var ${schemaName.toLowerCase()} = this;
	var access = 'auth';

	var token = jwt.sign({_id:${schemaName.toLowerCase()}._id.toHexString(), access}, 'abc123').toString();
	${schemaName.toLowerCase()}.tokens.push({access, token});

	return ${schemaName.toLowerCase()}.save().then(()=>{
		return token;
	});
};

${schemaName}Schema.statics.findByToken = function(token) {
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
};

${schemaName}Schema.statics.findByCredentials = function(email, password) {
	var ${schemaName} = this;

	return ${schemaName}.findOne({email}).then((${schemaName.toLowerCase()}) => {
		if(!${schemaName.toLowerCase()}){
			return Promise.reject();
		} else {
			return new Promise((resolve, reject)=>{
				bcrypt.compare(password, ${schemaName.toLowerCase()}.password, (err, res) => {
					if(res){
						resolve(${schemaName.toLowerCase()});
					} else {
						reject();
					}
				});
			});
		}
	});
};

${schemaName}Schema.methods.removeToken = function(token) {
	var ${schemaName.toLowerCase()} = this;

	return ${schemaName.toLowerCase()}.update({
		$pull: {
			tokens: {token}
		}
	});
}

${schemaName}Schema.pre('save', function(next){
	var ${schemaName.toLowerCase()} = this;
	if (${schemaName.toLowerCase()}.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(${schemaName.toLowerCase()}.password, salt, (err, hash)=>{
				${schemaName.toLowerCase()}.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

var ${schemaName} = mongoose.model('${schemaName}', ${schemaName}Schema);

module.exports = {${schemaName}};`;

}

module.exports = {user};
