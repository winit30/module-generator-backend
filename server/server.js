const express = require("express"),
      app = express(),
      path = require("path"),
      bodyParser = require("body-parser"),
      fs = require("fs"),
      fse = require('fs-extra'),
      archiver = require('archiver'),
      {generateModule} = require('./../utils/generateModule'),
      {user} = require('./../components/user/user'),
      {authenticate} = require('./../components/user/authenticate'),
      {userRoutes} = require('./../components/user/userRoutes'),
      {createServer} = require('./../components/server/createServer'),
      {dbs} = require('./../components/db/db'),
      cors = require('cors');

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

    fse.removeSync('./modules');

    fs.mkdirSync('./modules');
    fs.mkdirSync('./modules/db');
    fs.mkdirSync('./modules/middleware');
    fs.mkdirSync('./modules/models');
    fs.mkdirSync('./modules/routes');
    fs.mkdirSync('./modules/server');
    fs.mkdirSync('./modules/utils');

    const json = req.body.package;
    var userschema =  JSON.stringify(req.body.apiSchema[0].schema, null, 2);
        userschema = userschema.replace(/\"/g, "");

    if(req.body.apiSchema[0].schemaType === "register") {
        var schema = user(req.body.apiSchema[0].schemaName ,userschema);
        var authMiddleware = authenticate(req.body.apiSchema[0].schemaName);
        var routes = userRoutes(req.body.apiSchema[0].schemaName);
        var server = createServer(`${req.body.apiSchema[0].schemaName.toLowerCase()}Routes`);
        var db = dbs(req.body.apiSchema[0].schemaName);
        var userPath = `./modules/models/${req.body.apiSchema[0].schemaName.toLowerCase()}.js`;
        var userRoutesPath = `./modules/routes/${req.body.apiSchema[0].schemaName.toLowerCase()}Routes.js`;
    }

    try {
      fs.writeFileSync(packageJsonPath, JSON.stringify(json, null, 2) , "utf8");
      fs.writeFileSync(userPath, schema , "utf8");
      fs.writeFileSync(authMiddlewarePath, authMiddleware , "utf8");
      fs.writeFileSync(userRoutesPath, routes , "utf8");
      fs.writeFileSync(serverPath, server , "utf8");
      fs.writeFileSync(dbPath, db , "utf8");
      generateModule();
      res.send('module generated');
    } catch(err) {
      res.send(err);
    }

});
