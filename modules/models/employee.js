const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

var EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3
  },
  phone: {
    type: String,
    trim: true,
    required: true,
    minlength: 10
  },
  department: {
    type: String,
    trim: true,
    required: true,
    minlength: 5
  },
  userID: {
    type: String,
    trim: true,
    required: true,
    minlength: 5
  }
} , {usePushEach: true});

EmployeeSchema.methods.toJSON = function() {
	var employee = this;
	var employeeObject = employee.toObject();
	return _.pick(employeeObject, ['name', 'email']);
};

//Find by userID
EmployeeSchema.statics.findEmployeesByUserId = function(userID) {
  var Employee = this;
  return Employee.find({userID})
}

//Find by id and update
EmployeeSchema.statics.findAndUpdate = function(id, body) {
  var Employee = this;
  return Employee.findByIdAndUpdate(id, {$set:body}, {new: true});
}

// Find by id and delete
EmployeeSchema.statics.findAndDelete = function(_id) {
  var Employee = this;
  return Employee.remove({_id});
}

var Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = {Employee};