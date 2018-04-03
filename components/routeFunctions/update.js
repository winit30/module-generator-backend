var update = (schemaName) => {

return `//api update by id request
Router.put('/update/:_id', authenticate, (req, res) => {
	${schemaName}.findAndUpdate(req.params._id, req.user._id ,req.body).then((${schemaName.toLowerCase()})=>{
		res.send(${schemaName.toLowerCase()});
	}).catch((err) => {
		res.send(err);
	});
});`;

}

module.exports = {update};
