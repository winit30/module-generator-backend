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

var generateFiles = (resBody, userID, cb) => {
    //create module directory
    generateDir(userID);
    try {
        //get package json
        const json = resBody.package,
              //create database file
              db = dbs(resBody.dbName),
              //get listening codes
              serverListening = fs.readFileSync("./components/server/appListen.js", "utf8"),
              //get api schema object
              apiSchema = resBody.apiSchema;
        //loop through apiSchema
        for(let i = 0; i<apiSchema.length; i++) {
          //add route modules
          modules[`${apiSchema[i].schemaName.toLowerCase()}Routes`] = `require('./../routes/${apiSchema[i].schemaName.toLowerCase()}Routes')`;
          //add app.use
          createAppUse(`'/${apiSchema[i].schemaName.toLowerCase()}', ${apiSchema[i].schemaName.toLowerCase()}Routes`);
          //if register schema
          if (apiSchema[i].schemaType === "register") {
            //create user model
            const userModel = user(apiSchema[i]),
                  //create auth middleware
                  authMiddleware = authenticate(apiSchema[i].schemaName),
                  //create auth routes
                  routes = userRoutes(apiSchema[i]),
                  //user file path
                  REGISTER_MODEL_PATH = `./modules/models/${apiSchema[i].schemaName.toLowerCase()}.js`,
                  //userRoutes file path
                  REGISTER_ROUTE_PATH = `./modules/routes/${apiSchema[i].schemaName.toLowerCase()}Routes.js`;
                  //write user file
                  writeFiles(REGISTER_MODEL_PATH, userModel);
                  // write middleware file
                  writeFiles(MIDDLEWARE_PATH, authMiddleware);
                  // write user routes file
                  writeFiles(REGISTER_ROUTE_PATH, routes);

          } else {
                    //create api model
              const apiModel = api(apiSchema[i]),
                    //create api routes
                    routes = apiRoutes(apiSchema[i]),
                    //create api path
                    API_PATH = `./modules/models/${apiSchema[i].schemaName.toLowerCase()}.js`,
                    //create api route path
                    API_ROUTE_PATH = `./modules/routes/${apiSchema[i].schemaName.toLowerCase()}Routes.js`;
                    //write api file
                    writeFiles(API_PATH, apiModel);
                    //write api route file
                    writeFiles(API_ROUTE_PATH, routes);
          }
        }

        //create server codes
        const server = createServer(serverListening);
        //write package.json file
        writeFiles(PACKAGE_JSON_PATH, JSON.stringify(json, null, 2));
        //write db file
        writeFiles(DB_PATH, db);
        //write server file
        writeFiles(SERVER_PATH, server);
        //generate module zip file
        generateModule(userID);
        //send response
        cb('module generated');

  } catch(err) {
      cb("Some went wrong. Please check your json format.");
    }
}

module.exports = {generateFiles};
