const knex = require('knex');
const config = require('../config/DataBase');

const DB = knex(config);

module.exports = DB;
