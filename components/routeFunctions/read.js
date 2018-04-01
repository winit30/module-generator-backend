var read = (schemaName, schemaType) => {

if (schemaType === 'register') {

return `//Get user request
Router.get('/${schemaName.toLowerCase()}', authenticate , (req, res) => {
	res.send(req.user);
});`;

} else {

return `//Get ${schemaName.toLowerCase()}s request
Router.get('/${schemaName.toLowerCase()}s', authenticate, (req, res) => {
	${schemaName}.find${schemaName}sByUserId(req.user._id).then((${schemaName.toLowerCase()}s) => {
		res.send(${schemaName.toLowerCase()}s);
	})
});`;

}

}

module.exports = {read};
