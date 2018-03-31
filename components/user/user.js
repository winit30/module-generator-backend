const {modules} = require('./modules');
const {generateSchema} = require('./schema');
const {toJson} = require('./../apiFunctions/toJson');
const {generateAuthToken} = require('./../apiFunctions/generateAuthToken');
const {findByToken} = require('./../apiFunctions/findByToken');
const {findByCredentials} = require('./../apiFunctions/findByCredentials');
const {removeToken} = require('./../apiFunctions/removeToken');
const {preEvent} = require('./../apiFunctions/preEvent');

const user = (schemaName, schema) => {

	var renderModules = '';
	for(key in modules) {
		let module = `const ${key} = ${modules[key]};\n`;
		renderModules += module;
	}

	const renderSchema = generateSchema(schemaName, schema);

return `${renderModules}
${renderSchema}

${toJson(schemaName)}

${generateAuthToken(schemaName)}

${findByToken(schemaName)}

${findByCredentials(schemaName)}

${removeToken(schemaName)}

${preEvent(schemaName)}

var ${schemaName} = mongoose.model('${schemaName}', ${schemaName}Schema);

module.exports = {${schemaName}};`;

}

module.exports = {user};
