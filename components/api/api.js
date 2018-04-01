const {generateSchema} = require('./../apiFunctions/schema');
const {toJson} = require('./../apiFunctions/toJson');
const {findByUserId} = require('./../apiFunctions/findByUserId');
const {findAndUpdate} = require('./../apiFunctions/findAndUpdate');
const {findAndDelete} = require('./../apiFunctions/findAndDelete');
const {modules} = require('./modules');

var api = (schemaName, schema, schemaType) => {

  var renderModules = '';
	for(key in modules) {
		let module = `const ${key} = ${modules[key]};\n`;
		renderModules += module;
	}

return `${renderModules}
${generateSchema(schemaName, schema, schemaType)}

${toJson(schemaName)}

${findByUserId(schemaName)}

${findAndUpdate(schemaName)}

${findAndDelete(schemaName)}

var ${schemaName} = mongoose.model('${schemaName}', ${schemaName}Schema);

module.exports = {${schemaName}};`;
};

module.exports = {api};
