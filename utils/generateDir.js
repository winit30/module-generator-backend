const fs = require("fs"),
      fse = require('fs-extra');

var generateDir = () => {

  //delete base folder
  fse.removeSync('./modules');
  //create folders
  fs.mkdirSync('./modules');
  fs.mkdirSync('./modules/db');
  fs.mkdirSync('./modules/middleware');
  fs.mkdirSync('./modules/models');
  fs.mkdirSync('./modules/routes');
  fs.mkdirSync('./modules/server');
  fs.mkdirSync('./modules/utils');

};

module.exports = {generateDir};
