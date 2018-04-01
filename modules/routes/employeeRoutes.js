const Router = require('express').Router();
const {Employee} = require('./../models/employee');
const _ = require('lodash');
const {authenticate} = require('./../middleware/authenticate');

Router.post('/create', authenticate, (req, res) => {
	var body = req.body;
			body.userID = req.user._id;
	var employee = new Employee(body);
	employee.save().then((employee)=>{
		 res.send(employee);
	}).catch((e)=>{
		res.send(e);
	});
});

//Get employees request
Router.get('/employees', authenticate, (req, res) => {
	Employee.findEmployeesByUserId(req.user._id).then((employees) => {
		res.send(employees);
	})
});

//api update by id request
Router.put('/update/:_id', authenticate, (req, res) => {
	Employee.findAndUpdate(req.params._id, req.body).then((employee)=>{
		res.send(employee);
	}).catch((err) => {
		res.send(err);
	});
});

//api delete by id request
Router.delete('/delete/:_id', authenticate, (req, res) => {
	Employee.findAndDelete(req.params._id).then((result)=>{
		res.send(result);
	}).catch((err) => {
		console.log(err);
		res.send(err);
	});
});

module.exports = Router;