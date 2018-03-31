const Router = require('express').Router();
const {Event} = require('./../models/event');
const _ = require('lodash');
const {authenticate} = require('./../middleware/authenticate');

Router.post('/create', authenticate, (req, res) => {
	var body = req.body;
	var event = new Event(body);
	event.save().then((event)=>{
		 res.send(event);
	}).catch((e)=>{
		res.send(e);
	});
});

module.exports = Router;