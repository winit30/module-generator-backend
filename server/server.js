const express = require("express"),
      app = express(),
      path = require("path"),
      bodyParser = require("body-parser"),
      cors = require('cors'),
      {generateFiles} = require('./../utils/generateFiles');

app.use(bodyParser.json()); // get user request in json format
app.use(express.static(path.join(__dirname, '../public')));  // set route for index
app.use(cors({origin: '*'})); // set cross origin headers

app.get("/", (req, res) => {
    res.send("This is a homepage");
});

//module generate post request
app.post("/generate", (req, res) => {
    generateFiles(req.body, (rep) => {
      res.send(rep);
    });
});

const port = process.env.PORT || 4000; //set port dynamically
//start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
