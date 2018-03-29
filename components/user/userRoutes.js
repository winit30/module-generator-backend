var userRoutes = (schemaName) => {

return `const Router = require('express').Router();
const {${schemaName}} = require('./../models/${schemaName.toLowerCase()}');
const _ = require('lodash');
const {authenticate} = require('./../middleware/authenticate');

Router.get('/', (req, res)=>{
	res.send('I am the main page');
});

//Signup request
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
});

//Get user request
Router.get('/${schemaName.toLowerCase()}', authenticate , (req, res) => {
	res.send(req.${schemaName.toLowerCase()})
});

//Login request
Router.post('/login', (req, res) => {

	var body = _.pick(req.body, ['email', 'password']);

	${schemaName}.findByCredentials(body.email, body.password).then((${schemaName.toLowerCase()}) => {
		return ${schemaName.toLowerCase()}.generateAuthToken().then((token)=>{
			res.header('x-auth', token).send(${schemaName.toLowerCase()});
		});
	}).catch((e) => {
		res.status(400).send(e);
	});
});

//logout request
Router.delete('/logout', authenticate, (req, res)=>{
	req.${schemaName.toLowerCase()}.removeToken(req.token).then(()=>{
		res.status(200).send();
	}, ()=> {
		res.status(400).send();
	})
});

module.exports = Router;`;

}

module.exports = {userRoutes}
