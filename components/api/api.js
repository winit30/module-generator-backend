const {generateSchema} = require('./../apiFunctions/schema');
const {toJson} = require('./../apiFunctions/toJson');
const {modules} = require('./modules');

var api = (schemaName, schema) => {

  var renderModules = '';
	for(key in modules) {
		let module = `const ${key} = ${modules[key]};\n`;
		renderModules += module;
	}

return `${renderModules}
${generateSchema(schemaName, schema)}

${toJson(schemaName)}

${schemaName}Schema.statics.find${schemaName}ByUserId = function(userID) {
  var ${schemaName} = this;
  return ${schemaName}.find({userID})
}

var ${schemaName} = mongoose.model('${schemaName}', ${schemaName}Schema);

module.exports = {${schemaName}};`;
};

module.exports = {api};
