const knex = require('knex')
const databaseConfig =require('./knex')

knex(databaseConfig)

const databaseConnection = knex(databaseConfig)

module.exports = {databaseConnection}
