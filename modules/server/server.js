const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {mongoose} = require('./../db/db');
const userRoutes = require('./../routes/userRoutes');
const eventRoutes = require('./../routes/eventRoutes');

app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/event', eventRoutes);

const port = process.env.PORT || 2000;
//Server code
app.listen(port, ()=> {
	console.log(`server is running on port ${port}`);
});

