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

module.exports = Router;