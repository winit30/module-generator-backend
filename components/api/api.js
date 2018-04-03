const {generateSchema} = require('./../apiFunctions/schema');
const {toJson} = require('./../apiFunctions/toJson');
const {findByUserId} = require('./../apiFunctions/findByUserId');
const {findAndDelete} = require('./../apiFunctions/findAndDelete');
const {apiUpdateFunctions} = require('./../apiFunctions/apiUpdateFunctions');
const {modules} = require('./modules');

var api = (apiSchema) => {

  const schemaName = apiSchema.schemaName,
			  schema = JSON.stringify(apiSchema.schema, null, 2),
				schemaType = apiSchema.schemaType,
        returnValue = apiSchema.returnValue,
        functions = apiSchema.functions;

  var renderModules = '';

	for(key in modules) {
		let module = `const ${key} = ${modules[key]};\n`;
		renderModules += module;
	}

return `${renderModules}
${generateSchema(schemaName, schema, schemaType)}

${toJson(schemaName, returnValue)}

${findByUserId(schemaName)}

${apiUpdateFunctions(schemaName, functions)}

${findAndDelete(schemaName)}

var ${schemaName} = mongoose.model('${schemaName}', ${schemaName}Schema);

module.exports = {${schemaName}};`;
};

module.exports = {api};
