const Router = require('express').Router();
const {Auth} = require('./../models/auth');
const _ = require('lodash');
const {authenticate} = require('./../middleware/authenticate');

//Signup request
Router.post('/create', (req, res) => {
	var body = req.body;
	var auth = new Auth(body);
	auth.save().then(()=>{
		return auth.generateAuthToken();
	}).then((token)=>{
		res.header('x-auth', token).send(auth);
	}).catch((e)=>{
		res.send(e);
	});
});

//Get user request
Router.get('/auth', authenticate , (req, res) => {
	res.send(req.user);
});

//Login request
Router.post('/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);
	Auth.findByCredentials(body.email, body.password).then((auth) => {
		return auth.generateAuthToken().then((token)=>{
			res.header('x-auth', token).send(auth);
		});
	}).catch((e) => {
		res.status(400).send(e);
	});
});

//logout request
Router.delete('/logout', authenticate, (req, res)=>{
	req.auth.removeToken(req.token).then(()=>{
		res.status(200).send();
	}, ()=> {
		res.status(400).send();
	})
});

module.exports = Router;