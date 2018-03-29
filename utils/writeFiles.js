const fs = require("fs");

var writeFiles = (filepath, schema) => {
    fs.writeFileSync(filepath, schema , "utf8");
}

module.exports = {writeFiles};
