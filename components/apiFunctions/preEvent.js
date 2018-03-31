var preEvent = (schemaName) => {

return `${schemaName}Schema.pre('save', function(next){
  var ${schemaName.toLowerCase()} = this;
  if (${schemaName.toLowerCase()}.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(${schemaName.toLowerCase()}.password, salt, (err, hash)=>{
        ${schemaName.toLowerCase()}.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});`;

}

module.exports = {preEvent}
