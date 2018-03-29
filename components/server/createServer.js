var createServer = (modules, appListening, appUse) => {
    var constModules = '';

    for(key in modules) {
      let module = `const ${key} = ${modules[key]};\n`;
      constModules += module;
    }

return `${constModules}
${appUse}
${appListening}
`;
};

module.exports = {createServer};
