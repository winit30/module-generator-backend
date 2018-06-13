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
  userID: {
    type: String,
    trim: true,
    required: true,
    minlength: 5
  }
} , {usePushEach: true});

EventSchema.methods.toJSON = function() {
	var event = this;
	var eventObject = event.toObject();
	return _.pick(eventObject, ['_id' ,'name', 'phone']);
};

//Find by userID
EventSchema.statics.findEventsByUserId = function(userID) {
  var Event = this;
  return Event.find({userID})
}

//Find by id and update (private)
EventSchema.statics.updateEvent = function(_id, userID, body) {
  const Event = this;
  return Event.update({_id, userID}, {$set:body}, {new: true});
}



// Find by id and delete
EventSchema.statics.findAndDelete = function(_id, userID) {
  var Event = this;
  return Event.remove({_id, userID});
}

var Event = mongoose.model('Event', EventSchema);

module.exports = {Event};