var createServer = (modules, appListening) => {
    var constModules = '';

    for(key in modules) {
      let module = `const ${key} = ${modules[key]};\n`;
      constModules += module;
    }

return `${constModules}
${appListening}
`;
};

module.exports = {createServer};
