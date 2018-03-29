const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {mongoose} = require('./../db/db');
const routes = require('./../routes/routes');

app.use(bodyParser.json());

app.use('/app/',routes);

//Server code
app.listen(2000, ()=> {
	console.log('server is running on port 2000');
});
