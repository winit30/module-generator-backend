var deleteTemplate = (schemaName) => {

return `//api delete by id request
Router.delete('/delete/:_id', authenticate, (req, res) => {
	${schemaName}.findAndDelete(req.params._id).then((result)=>{
		res.send(result);
	}).catch((err) => {
		console.log(err);
		res.send(err);
	});
});`;

}

module.exports = {deleteTemplate};
