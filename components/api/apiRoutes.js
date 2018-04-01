const {create} = require('./../routeFunctions/create');
const {read} = require('./../routeFunctions/read');
const {update} = require('./../routeFunctions/update');
const {deleteTemplate} = require('./../routeFunctions/delete');

var apiRoutes = (schemaName, schemaType) => {

return `const Router = require('express').Router();
const {${schemaName}} = require('./../models/${schemaName.toLowerCase()}');
const _ = require('lodash');
const {authenticate} = require('./../middleware/authenticate');

${create(schemaName, schemaType)}

${read(schemaName)}

${update(schemaName)}

${deleteTemplate(schemaName)}

module.exports = Router;`;

}

module.exports = {apiRoutes}
