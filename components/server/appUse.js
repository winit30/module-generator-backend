var appUseString = "app.use(bodyParser.json());\n";

var createAppUse = (params) => {
  if(params !== undefined){
        appUseString += `app.use(${params});\n`;
  }
  return appUseString;
}

module.exports = {createAppUse};
