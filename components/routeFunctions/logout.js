var logout = (schemaName) => {

return `//logout request
Router.delete('/logout', authenticate, (req, res)=>{
	req.user.removeToken(req.token).then(()=>{
		res.status(200).send();
	}, ()=> {
		res.status(400).send();
	})
});`;

}

module.exports = {logout};
