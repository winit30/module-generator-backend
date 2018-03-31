const Router = require('express').Router();
const {Event} = require('./../models/event');
const _ = require('lodash');
const {authenticate} = require('./../middleware/authenticate');

//Signup request
Router.post('/create', (req, res)=>{

	var body = req.body;

	var event = new Event(body);

	event.save().then(()=>{
		return event.generateAuthToken();
	}).then((token)=>{
		res.header('x-auth', token).send(event);
	}).catch((e)=>{
		res.send(e);
	})
});

//Get user request
Router.get('/event', authenticate , (req, res) => {
	res.send(req.event)
});

//Login request
Router.post('/login', (req, res) => {

	var body = _.pick(req.body, ['email', 'password']);

	Event.findByCredentials(body.email, body.password).then((event) => {
		return event.generateAuthToken().then((token)=>{
			res.header('x-auth', token).send(event);
		});
	}).catch((e) => {
		res.status(400).send(e);
	});
});

//logout request
Router.delete('/logout', authenticate, (req, res)=>{
	req.event.removeToken(req.token).then(()=>{
		res.status(200).send();
	}, ()=> {
		res.status(400).send();
	})
});

module.exports = Router;