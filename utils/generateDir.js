const fs = require("fs"),
      fse = require('fs-extra');

var generateDir = (userID) => {

  //delete base folder
  fse.removeSync('./modules');
  fse.removeSync(`./public/downloads/${userID}`);
  //create folders
  fs.mkdirSync('./modules');
  fs.mkdirSync('./modules/db');
  fs.mkdirSync('./modules/middleware');
  fs.mkdirSync('./modules/models');
  fs.mkdirSync('./modules/routes');
  fs.mkdirSync('./modules/server');
  fs.mkdirSync('./modules/utils');
  fs.mkdirSync(`./public/downloads/${userID}`);
};

module.exports = {generateDir};
