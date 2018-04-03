const _ = require('lodash');

var update = (schemaName, functions) => {

	var updateFunctions = '';

	functions.forEach((func) => {
		if(func.type === "update"){
			func.categories.forEach((category) => {
				if (category.access === "private") {

updateFunctions +=  `//api update by id request
Router.put('/update${_.capitalize(category.update)}/:${category.param}', authenticate, (req, res) => {
	${schemaName}.update${_.capitalize(category.update)}(req.params.${category.param}, req.user._id, req.body).then((${schemaName.toLowerCase()})=>{
		res.send(${schemaName.toLowerCase()});
	}).catch((err) => {
		res.send(err);
	});
});\n\n`;

				} else if (category.access === "protected") {

updateFunctions += `//api update by id request
Router.put('/update${_.capitalize(category.update)}/:${category.param}', authenticate, (req, res) => {
	const body = ${JSON.stringify(category.requestBody).replace(/\"/g, "")};
	${schemaName}.update${_.capitalize(category.update)}(req.params.${category.param}, body).then((${schemaName.toLowerCase()})=>{
		res.send(${schemaName.toLowerCase()});
	}).catch((err) => {
		res.send(err);
	});
});\n\n`;

				}
			});
		}

	});

return updateFunctions;

}

module.exports = {update};
