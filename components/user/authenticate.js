var authenticate = (schemaName) => {
return `const {${schemaName}} = require('./../models/${schemaName.toLowerCase()}');

var authenticate = (req, res, next) => {
	var token = req.header('x-auth');

	${schemaName}.findByToken(token).then((${schemaName.toLowerCase()})=>{
		if(!${schemaName.toLowerCase()}){
			return Promise.reject();
		} else {
			req.user = ${schemaName.toLowerCase()};
			req.token = token;
			next();
		}
	}).catch((e)=>{
		res.status(401).send();
	})
}

module.exports = {authenticate};
`
};

module.exports = {authenticate};
