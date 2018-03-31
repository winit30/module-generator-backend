const {user} = require('./../components/user/user'),
      {api} = require('./../components/api/api'),
      {authenticate} = require('./../components/user/authenticate'),
      {userRoutes} = require('./../components/user/userRoutes'),
      {apiRoutes} = require('./../components/api/apiRoutes'),
      {createServer} = require('./../components/server/createServer'),
      {createAppUse} = require('./../components/server/appUse'),
      {dbs} = require('./../components/db/db'),
      {generateModule} = require('./generateModule'),
      {generateDir} = require('./generateDir'),
      {writeFiles} = require('./writeFiles'),
      fs = require("fs");

var {modules} = require('./../components/server/modules');

const PACKAGE_JSON_PATH = "./modules/package.json",
      SERVER_PATH = "./modules/server/server.js",
      DB_PATH = "./modules/db/db.js",
      MIDDLEWARE_PATH = "./modules/middleware/authenticate.js";

var generateFiles = (resBody, cb) => {
    //create module directory
    generateDir();
    //initialize schemaObject variable
    var schemaObject = "";
    var appUse = "";
    const json = resBody.package;
    const db = dbs(resBody.dbName);
    const apiSchema = resBody.apiSchema;
    //loop through apiSchema
    for(let i = 0; i<apiSchema.length; i++) {
      //create schema object
      schemaObject =  JSON.stringify(apiSchema[i].schema, null, 2);
      schemaObject = schemaObject.replace(/\"/g, "");
      //add route modules
      modules[`${apiSchema[i].schemaName.toLowerCase()}Routes`] = `require('./../routes/${apiSchema[i].schemaName.toLowerCase()}Routes')`;
      //add app.use
      appUse = createAppUse(`'/${apiSchema[i].schemaName.toLowerCase()}', ${apiSchema[i].schemaName.toLowerCase()}Routes`);
      //if register schema
      if (apiSchema[i].schemaType === "register") {
        //create userSchema
        const userSchema = user(apiSchema[i].schemaName ,schemaObject);
        //create auth middleware
        const authMiddleware = authenticate(apiSchema[i].schemaName);
        //create auth routes
        const routes = userRoutes(apiSchema[i].schemaName, apiSchema[i].schemaType);
        //user file path
        const REGISTER_MODEL_PATH = `./modules/models/${apiSchema[i].schemaName.toLowerCase()}.js`;
        //userRoutes file path
        const REGISTER_ROUTE_PATH = `./modules/routes/${apiSchema[i].schemaName.toLowerCase()}Routes.js`;
        try {
          //write user file
          writeFiles(REGISTER_MODEL_PATH, userSchema);
          // write middleware file
          writeFiles(MIDDLEWARE_PATH, authMiddleware);
          // write user routes file
          writeFiles(REGISTER_ROUTE_PATH, routes);
        } catch(err) {
          cb(err);
        }
      } else {
          //create api schema
          var schema = api(apiSchema[i].schemaName ,schemaObject);
          //create api routes
          var routes = apiRoutes(apiSchema[i].schemaName, apiSchema[i].schemaType);
          //create api path
          var API_PATH = `./modules/models/${apiSchema[i].schemaName.toLowerCase()}.js`;
          //create api route path
          var API_ROUTE_PATH = `./modules/routes/${apiSchema[i].schemaName.toLowerCase()}Routes.js`;
          try {
            //write api file
            writeFiles(API_PATH, schema);
            //write api route file
            writeFiles(API_ROUTE_PATH, routes);
          } catch(err) {
            cb(err);
          }
      }
    }

    var serverListening = fs.readFileSync("./components/server/appListen.js", "utf8");
    var server = createServer(modules, serverListening, appUse);

    try {
      //write package.json file
      writeFiles(PACKAGE_JSON_PATH, JSON.stringify(json, null, 2));
      //write db file
      writeFiles(DB_PATH, db);
      //write server file
      writeFiles(SERVER_PATH, server);
      //generate module zip file
      generateModule();
      //send response
      cb('module generated');
    } catch(err) {
      cb(err);
    }
}

module.exports = {generateFiles};
