const express = require("express"),
      app = express(),
      path = require("path"),
      bodyParser = require("body-parser"),
      fs = require("fs"),
      archiver = require('archiver');

const packageJsonPath = "./modules/package.json";

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get("/", (req, res) => {
    res.send("This is a homepage")
});

app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});

app.post("/generate", (req, res) => {

    const application = {
      name : "New Application",
      version: "1.0.0",
      description: "This is a new application",
      author: "ModuleBuilder",
      dependencies: {
          "bcryptjs": "^2.4.3",
          "body-parser": "^1.18.2",
          "express": "^4.16.2",
          "jsonwebtoken": "^8.1.0",
          "mongoose": "^4.12.4",
          "validator": "^9.0.0"
      }
    }

    var json = {
        "name": application.name,
        "version": application.version,
        "description": application.description,
        "main": "server/server.js",
        "scripts": {
            "start": "node server/server.js"
        },
        "author": application.author,
        "license": "ISC",
        "dependencies": application.dependencies
    };

    fs.writeFile(packageJsonPath, JSON.stringify(json, null, 2) , function (err) {
        if (err) throw err;
        console.log('package.json file modified');
        res.send("Module generated");
    });

    var output = fs.createWriteStream('generatedModule.zip');
    var archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });

    output.on('close', function() {
      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    archive.on('error', function(err){
      throw err;
    });

    archive.pipe(output);
    archive.directory('./modules', false);
    archive.finalize();
});
