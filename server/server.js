const express = require("express"),
      app = express(),
      path = require("path"),
      bodyParser = require("body-parser"),
      cors = require('cors'),
      {generateFiles} = require('./../utils/generateFiles');

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
    generateFiles(req.body, (rep) => {
      res.send(rep);
    });
});
