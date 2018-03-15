const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
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

    var json = {
        "name": "modulegenerator",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
            "start": "node server/server.js"
        },
        "author": "",
        "license": "ISC",
        "dependencies": {
            "express": "^4.16.2"
        }
    };

    fs.writeFile(packageJsonPath, JSON.stringify(json, null, 2) , function (err) {
        if (err) throw err;
        console.log('package.json file modified');
    });

    res.send("Module generated");
});
