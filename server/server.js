const express = require("express"),
      app = express(),
      path = require("path"),
      bodyParser = require("body-parser"),
      cors = require('cors'),
      fs = require("fs"),
      fse = require('fs-extra'),
      multer = require('multer'),
      {generateFiles} = require('./../utils/generateFiles');

app.use(bodyParser.json()); // get user request in json format
app.use(express.static(path.join(__dirname, '../public')));  // set route for index
app.use(cors({origin: '*'})); // set cross origin headers

app.get("/", (req, res) => {
    res.send("This is a homepage");
});

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 100000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('requestJson');


// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /json/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Json Only!');
  }
}

//module generate post request
/*app.post("/generate", (req, res) => {
    generateFiles(req.body, (rep) => {
      if(rep == "module generated") {
        res.download('./public/downloads/generatedModule.zip');
      } else {
        res.send(rep);
      }
    });
});*/

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.send(`Message: ${err}`);
    } else {
      if(req.file == undefined){
        res.send('Error: No File Selected!');
      } else {
        var doc = fs.readFileSync(`./public/uploads/${req.file.filename}`, "utf8");
        doc = JSON.parse(doc);
        generateFiles(doc, (rep) => {
            fse.removeSync(`./public/uploads/${req.file.filename}`);
            res.send(rep);
        });
      }
    }
  });
});

const port = process.env.PORT || 4000; //set port dynamically
//start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
