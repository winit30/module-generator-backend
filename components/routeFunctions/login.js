var login = (schemaName) => {

return `//Login request
Router.post('/login', (req, res) => {

	var body = _.pick(req.body, ['email', 'password']);

	${schemaName}.findByCredentials(body.email, body.password).then((${schemaName.toLowerCase()}) => {
		return ${schemaName.toLowerCase()}.generateAuthToken().then((token)=>{
			res.header('x-auth', token).send(${schemaName.toLowerCase()});
		});
	}).catch((e) => {
		res.status(400).send(e);
	});
});`;

}

module.exports = {login};
