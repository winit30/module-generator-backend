var create = (schemaName) => {

return `//Signup request
Router.post('/create', (req, res)=>{

	var body = req.body;

	var ${schemaName.toLowerCase()} = new ${schemaName}(body);

	${schemaName.toLowerCase()}.save().then(()=>{
		return ${schemaName.toLowerCase()}.generateAuthToken();
	}).then((token)=>{
		res.header('x-auth', token).send(${schemaName.toLowerCase()});
	}).catch((e)=>{
		res.send(e);
	})
});`;

}

module.exports = {create}
