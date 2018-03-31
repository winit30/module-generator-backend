const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

var EventSchema = new mongoose.Schema({
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
  date: {
    type: String,
    trim: true,
    required: true,
    minlength: 10
  }
} , {usePushEach: true});

EventSchema.methods.toJSON = function() {
	var event = this;
	var eventObject = event.toObject();
	return _.pick(eventObject, ['name', 'email']);
};

EventSchema.statics.findEventByUserId = function(userID) {
  var Event = this;
  return Event.find({userID})
}

var Event = mongoose.model('Event', EventSchema);

module.exports = {Event};