const {generateSchema} = require('./../apiFunctions/schema');
const {toJson} = require('./../apiFunctions/toJson');
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

${schemaName}Schema.statics.find${schemaName}sByUserId = function(userID) {
  var ${schemaName} = this;
  return ${schemaName}.find({userID})
}

var ${schemaName} = mongoose.model('${schemaName}', ${schemaName}Schema);

module.exports = {${schemaName}};`;
};

module.exports = {api};
