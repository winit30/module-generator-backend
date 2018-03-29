const express = require("express"),
      app = express(),
      path = require("path"),
      bodyParser = require("body-parser"),
      fs = require("fs"),
      fse = require('fs-extra'),
      archiver = require('archiver'),
      {generateModule} = require('./../utils/generateModule'),
      {generateDir} = require('./../utils/generateDir'),
      {user} = require('./../components/user/user'),
      {api} = require('./../components/api/api'),
      {authenticate} = require('./../components/user/authenticate'),
      {userRoutes} = require('./../components/user/userRoutes'),
      {createServer} = require('./../components/server/createServer'),
      {createAppUse} = require('./../components/server/appUse'),
      {dbs} = require('./../components/db/db'),
      cors = require('cors');

var {modules} = require('./../components/server/modules');

const packageJsonPath = "./modules/package.json",
      serverPath = "./modules/server/server.js",
      dbPath = "./modules/db/db.js",
      authMiddlewarePath = "./modules/middleware/authenticate.js";

const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors({origin: '*'}));

app.get("/", (req, res) => {
    res.send("This is a homepage");
});

app.listen(port, () => {
    console.log("Server is listening on port 4000");
});

app.post("/generate", (req, res) => {

    generateDir();

    const json = req.body.package;
    const db = dbs(req.body.dbName);

    var appUse = '';

    for(let i = 0; i<req.body.apiSchema.length; i++) {
      var schemaObject =  JSON.stringify(req.body.apiSchema[i].schema, null, 2);
          schemaObject = schemaObject.replace(/\"/g, "");
      if(req.body.apiSchema[i].schemaType === "register") {
          var schema = user(req.body.apiSchema[i].schemaName ,schemaObject);
          var authMiddleware = authenticate(req.body.apiSchema[i].schemaName);
          var routes = userRoutes(req.body.apiSchema[i].schemaName);
          var userPath = `./modules/models/${req.body.apiSchema[i].schemaName.toLowerCase()}.js`;
          var userRoutesPath = `./modules/routes/${req.body.apiSchema[i].schemaName.toLowerCase()}Routes.js`;
          modules[`${req.body.apiSchema[i].schemaName.toLowerCase()}Routes`] = `require('./../routes/${req.body.apiSchema[i].schemaName.toLowerCase()}Routes')`;
          appUse = createAppUse(`'/${req.body.apiSchema[i].schemaName.toLowerCase()}', ${req.body.apiSchema[i].schemaName.toLowerCase()}Routes`);
          try {
            fs.writeFileSync(userPath, schema , "utf8");
            fs.writeFileSync(authMiddlewarePath, authMiddleware , "utf8");
            fs.writeFileSync(userRoutesPath, routes , "utf8");
          } catch(err) {
            res.send(err);
          }
      } else {
        var schema = api(req.body.apiSchema[i].schemaName ,schemaObject);
        var routes = userRoutes(req.body.apiSchema[i].schemaName);
        var userPath = `./modules/models/${req.body.apiSchema[i].schemaName.toLowerCase()}.js`;
        var userRoutesPath = `./modules/routes/${req.body.apiSchema[i].schemaName.toLowerCase()}Routes.js`;
        modules[`${req.body.apiSchema[i].schemaName.toLowerCase()}Routes`] = `require('./../routes/${req.body.apiSchema[i].schemaName.toLowerCase()}Routes')`;
        appUse = createAppUse(`'/${req.body.apiSchema[i].schemaName.toLowerCase()}', ${req.body.apiSchema[i].schemaName.toLowerCase()}Routes`);
        try {
          fs.writeFileSync(userPath, schema , "utf8");
          fs.writeFileSync(userRoutesPath, routes , "utf8");
        } catch(err) {
          res.send(err);
        }
      }
    }

    var serverListening = fs.readFileSync("./components/server/appListen.js", "utf8");
    var server = createServer(modules, serverListening, appUse);

    try {
      fs.writeFileSync(packageJsonPath, JSON.stringify(json, null, 2) , "utf8");
      fs.writeFileSync(dbPath, db , "utf8");
      fs.writeFileSync(serverPath, server , "utf8");
      generateModule();
      res.send('module generated');
    } catch(err) {
      res.send(err);
    }

});
