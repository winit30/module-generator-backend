const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {mongoose} = require('./../db/db');
const userRoute = require('./../routes/userRoutes');
const eventRoute = require('./../routes/eventRoutes');

const port = process.env.PORT || 2000;
//Server code
app.listen(port, ()=> {
	console.log(`server is running on port ${port}`);
});

