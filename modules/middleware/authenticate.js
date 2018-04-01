const {Auth} = require('./../models/auth');

var authenticate = (req, res, next) => {
	var token = req.header('x-auth');

	Auth.findByToken(token).then((auth)=>{
		if(!auth){
			return Promise.reject();
		} else {
			req.user = auth;
			req.token = token;
			next();
		}
	}).catch((e)=>{
		res.status(401).send();
	})
}

module.exports = {authenticate};
