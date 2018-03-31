var generateAuthToken = (schemaName) => {

return `${schemaName}Schema.methods.generateAuthToken = function() {
  var ${schemaName.toLowerCase()} = this;
  var access = 'auth';

  var token = jwt.sign({_id:${schemaName.toLowerCase()}._id.toHexString(), access}, 'abc123').toString();
  ${schemaName.toLowerCase()}.tokens.push({access, token});

  return ${schemaName.toLowerCase()}.save().then(()=>{
    return token;
  });
};`;

}

module.exports = {generateAuthToken};
