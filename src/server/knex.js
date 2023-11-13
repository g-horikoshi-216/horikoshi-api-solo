const environment = "development";
const config = require('../../db/knexfile.js')[environment];
const knex = reuire('knex')(config);

module.exports = knex;
