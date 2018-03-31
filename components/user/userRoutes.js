const {create} = require('./../routeFunctions/create');
const {read} = require('./../routeFunctions/read');
const {login} = require('./../routeFunctions/login');
const {logout} = require('./../routeFunctions/logout');

var userRoutes = (schemaName) => {

return `const Router = require('express').Router();
const {${schemaName}} = require('./../models/${schemaName.toLowerCase()}');
const _ = require('lodash');
const {authenticate} = require('./../middleware/authenticate');

${create(schemaName)}

${read(schemaName)}

${login(schemaName)}

${logout(schemaName)}

module.exports = Router;`;

}

module.exports = {userRoutes}
