var createServer = (modules, appListening, appUse) => {
    var renderModules = '';
    for(key in modules) {
      let module = `const ${key} = ${modules[key]};\n`;
      renderModules += module;
    }

return `${renderModules}
${appUse}
${appListening}
`;
};

module.exports = {createServer};
