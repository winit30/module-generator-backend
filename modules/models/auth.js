const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var AuthSchema = new mongoose.Schema({
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
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
} , {usePushEach: true});

AuthSchema.methods.toJSON = function() {
	var auth = this;
	var authObject = auth.toObject();
	return _.pick(authObject, ['name', 'email']);
};

AuthSchema.methods.generateAuthToken = function() {
  var auth = this;
  var access = 'auth';

  var token = jwt.sign({_id:auth._id.toHexString(), access}, 'abc123').toString();
  auth.tokens.push({access, token});

  return auth.save().then(()=>{
    return token;
  });
};

AuthSchema.statics.findByToken = function(token) {
	var Auth = this;
	var decoded;

	try {
		decoded = jwt.verify(token, 'abc123');
	} catch(e) {
		return Promise.reject();
	}

	return Auth.findOne({
		'_id': decoded._id,
		'tokens.token':token,
		'tokens.access':'auth'
	})
};

AuthSchema.statics.findByCredentials = function(email, password) {
  var Auth = this;

  return Auth.findOne({email}).then((auth) => {
    if(!auth){
      return Promise.reject();
    } else {
      return new Promise((resolve, reject)=>{
        bcrypt.compare(password, auth.password, (err, res) => {
          if(res){
            resolve(auth);
          } else {
            reject();
          }
        });
      });
    }
  });
};

AuthSchema.methods.removeToken = function(token) {
	var auth = this;

	return auth.update({
		$pull: {
			tokens: {token}
		}
	});
}

AuthSchema.pre('save', function(next){
  var auth = this;
  if (auth.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(auth.password, salt, (err, hash)=>{
        auth.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var Auth = mongoose.model('Auth', AuthSchema);

module.exports = {Auth};