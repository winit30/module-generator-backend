var appUseString = '';
var createAppUse = (params) => {
  appUseString += `app.use(${params});\n`;
  return appUseString;
}

module.exports = {createAppUse};
