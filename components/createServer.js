var createServer = () => {
  return `const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {mongoose} = require('./../db/db');
const {User} = require('./../models/user');
const _ = require('lodash');
const {authenticate} = require('./../middleware/authenticate');

app.use(bodyParser.json());

//Main route
app.get('/', (req, res)=>{
  res.send('I am the main page');
});

//Create user request
app.post('/create', (req, res)=>{

  var body = req.body;

  var user = new User(body);

  user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth', token).send(user);
  }).catch((e)=>{
    res.send(e);
  })
});

//Get user request
app.get('/user', authenticate , (req, res) => {
  res.send(req.user)
});

//Login request
app.post('/login', (req, res) => {

  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token)=>{
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send(e);
  });
});

//logout request
app.delete('/logout', authenticate, (req, res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  }, ()=> {
    res.status(400).send();
  })
});

//Server code
app.listen(2000, ()=> {
  console.log('server is running on port 2000');
});

  `
}
