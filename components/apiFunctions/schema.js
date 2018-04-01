var generateSchema = (schemaName, schema, schemaType) => {
  if (schemaType === 'register') {
    schema = schema.replace(/\"/g, "");
    return `var ${schemaName}Schema = new mongoose.Schema(${schema} , {usePushEach: true});`;
  } else {
    schema = JSON.parse(schema);
    schema.userID = {
      "type": "String",
  		"trim":"true",
  		"required": "true",
      "minlength":"5"
    }
    schema = JSON.stringify(schema, null, 2);
    schema = schema.replace(/\"/g, "");
    return `var ${schemaName}Schema = new mongoose.Schema(${schema} , {usePushEach: true});`;
  }

}

module.exports = {generateSchema};
