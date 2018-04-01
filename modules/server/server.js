const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {mongoose} = require('./../db/db');
const authRoutes = require('./../routes/authRoutes');
const employeeRoutes = require('./../routes/employeeRoutes');

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/employee', employeeRoutes);

const port = process.env.PORT || 2000;
//Server code
app.listen(port, ()=> {
	console.log(`server is running on port ${port}`);
});

