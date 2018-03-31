const {create} = require('./../routeFunctions/create');
const {read} = require('./../routeFunctions/read');

var apiRoutes = (schemaName, schemaType) => {

return `const Router = require('express').Router();
const {${schemaName}} = require('./../models/${schemaName.toLowerCase()}');
const _ = require('lodash');
const {authenticate} = require('./../middleware/authenticate');

${create(schemaName, schemaType)}

${read(schemaName)}

module.exports = Router;`;

}

module.exports = {apiRoutes}
