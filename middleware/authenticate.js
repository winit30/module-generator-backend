const {User} = require('./../model/user');

var authenticate = (req, res, next) => {
	  console.log("here");
	var token = req.header('x-auth');

	User.findByToken(token).then((user)=>{
		if(!user){
			return Promise.reject();
		} else {
			req.user = user;
			req.token = token;
			next();
		}
	}).catch((e)=>{
		res.status(401).send();
	})
}

module.exports = {authenticate};
