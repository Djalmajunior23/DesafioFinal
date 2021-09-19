"use strict";

var knex = require('knex');

var databaseConfig = require('./knex');

knex(databaseConfig);
var databaseConnection = knex(databaseConfig);
module.exports = {
  databaseConnection: databaseConnection
};