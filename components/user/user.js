const {modules} = require('./modules');
const {generateSchema} = require('./../apiFunctions/schema');
const {toJson} = require('./../apiFunctions/toJson');
const {generateAuthToken} = require('./../apiFunctions/generateAuthToken');
const {findByToken} = require('./../apiFunctions/findByToken');
const {findByCredentials} = require('./../apiFunctions/findByCredentials');
const {removeToken} = require('./../apiFunctions/removeToken');
const {preEvent} = require('./../apiFunctions/preEvent');

const user = (apiSchema) => {

	const schemaName = apiSchema.schemaName,
			  schema = JSON.stringify(apiSchema.schema, null, 2),
				schemaType = apiSchema.schemaType,
				returnValue = apiSchema.returnValue;

	var renderModules = '';
	for(key in modules) {
		let module = `const ${key} = ${modules[key]};\n`;
		renderModules += module;
	}

return `${renderModules}
${generateSchema(schemaName, schema, schemaType)}

${toJson(schemaName, returnValue)}

${generateAuthToken(schemaName)}

${findByToken(schemaName)}

${findByCredentials(schemaName)}

${removeToken(schemaName)}

${preEvent(schemaName)}

var ${schemaName} = mongoose.model('${schemaName}', ${schemaName}Schema);

module.exports = {${schemaName}};`;

}

module.exports = {user};
