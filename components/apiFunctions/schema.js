var generateSchema = (schemaName, schema) => {
  return `var ${schemaName}Schema = new mongoose.Schema(${schema} , {usePushEach: true});`;
}

module.exports = {generateSchema};
