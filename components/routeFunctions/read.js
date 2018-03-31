var read = (schemaName) => {

return `//Get user request
Router.get('/${schemaName.toLowerCase()}', authenticate , (req, res) => {
	res.send(req.${schemaName.toLowerCase()})
});`;

}

module.exports = {read};
