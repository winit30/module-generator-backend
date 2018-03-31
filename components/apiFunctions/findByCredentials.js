var findByCredentials = (schemaName) => {

return `${schemaName}Schema.statics.findByCredentials = function(email, password) {
  var ${schemaName} = this;

  return ${schemaName}.findOne({email}).then((${schemaName.toLowerCase()}) => {
    if(!${schemaName.toLowerCase()}){
      return Promise.reject();
    } else {
      return new Promise((resolve, reject)=>{
        bcrypt.compare(password, ${schemaName.toLowerCase()}.password, (err, res) => {
          if(res){
            resolve(${schemaName.toLowerCase()});
          } else {
            reject();
          }
        });
      });
    }
  });
};`;

}

module.exports = {findByCredentials};
