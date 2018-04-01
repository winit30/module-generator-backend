const {createAppUse} = require('./appUse');
const {modules} = require('./modules');

var createServer = (appListening) => {
    var renderModules = '';
    for(key in modules) {
      let module = `const ${key} = ${modules[key]};\n`;
      renderModules += module;
    }

return `${renderModules}
${createAppUse()}
${appListening}
`;
};

module.exports = {createServer};
