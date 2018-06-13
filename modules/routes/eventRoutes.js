const Router = require('express').Router();
const {Event} = require('./../models/event');
const _ = require('lodash');
const {authenticate} = require('./../middleware/authenticate');

Router.post('/create', authenticate, (req, res) => {
	var body = req.body;
			body.userID = req.user._id;
	var event = new Event(body);
	event.save().then((event)=>{
		 res.send(event);
	}).catch((e)=>{
		res.send(e);
	});
});

//Get events request
Router.get('/events', authenticate, (req, res) => {
	Event.findEventsByUserId(req.user._id).then((events) => {
		res.send(events);
	})
});

//api update by id request
Router.put('/updateEvent/:_id', authenticate, (req, res) => {
	Event.updateEvent(req.params._id, req.user._id, req.body).then((event)=>{
		res.send(event);
	}).catch((err) => {
		res.send(err);
	});
});



//api delete by id request
Router.delete('/delete/:_id', authenticate, (req, res) => {
	Event.findAndDelete(req.params._id, req.user._id).then((result)=>{
		res.send(result);
	}).catch((err) => {
		console.log(err);
		res.send(err);
	});
});

module.exports = Router;