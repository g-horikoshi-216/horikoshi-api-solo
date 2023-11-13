const environment = "development";
const config = require('../../db/knexfile.js')[environment];
const knex = require('knex')(config);

module.exports = knex;
