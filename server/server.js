const express = require("express"),
      app = express(),
      path = require("path"),
      bodyParser = require("body-parser"),
      fs = require("fs"),
      archiver = require('archiver'),
      {generateModule} = require('./../utils/generateModule'),
      {user} = require('./../components/user/user'),
      cors = require('cors');

const packageJsonPath = "./modules/package.json",
      userPath = "./modules/user/user.js";

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors({origin: '*'}));

app.get("/", (req, res) => {
    res.send("This is a homepage")
});

app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});

app.post("/generate", (req, res) => {

    const json = req.body;
    const userschema = fs.readFileSync("./components/user/schema.js", "utf8");
    const schema = user(userschema);

    try {
      fs.writeFileSync(packageJsonPath, JSON.stringify(json, null, 2) , "utf8");
      fs.writeFileSync(userPath, schema , "utf8");
      generateModule();
      res.send('module generated');
    } catch(err) {
      res.send(err);
    }

});
