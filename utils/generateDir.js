const fs = require("fs"),
      fse = require('fs-extra');

var generateDir = (userID) => {

  //delete base folder
  fse.removeSync('./modules');
  fs.mkdirSync(`./public/downloads/${userID}`);
  console.log(userID, 1);
  //create folders
  fs.mkdirSync('./modules');
  fs.mkdirSync('./modules/db');
  fs.mkdirSync('./modules/middleware');
  fs.mkdirSync('./modules/models');
  fs.mkdirSync('./modules/routes');
  fs.mkdirSync('./modules/server');
  fs.mkdirSync('./modules/utils');

  console.log(userID, 2);
};

module.exports = {generateDir};
