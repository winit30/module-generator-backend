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
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 6,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  }
} , {usePushEach: true});

EventSchema.statics.findEventsByUserId = function(userID) {
  var Event = this;
  return Event.find({userID})
}

var Event = mongoose.model('Event', EventSchema);

module.exports = {Event};