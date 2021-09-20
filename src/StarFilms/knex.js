module.exports=({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'DGj1107!',
    database: 'Movies'
  }
});

knex.schema.withSchema('public').createTable('users', function (table) {
  table.increments();
});

knex.schema.createTable('users', function (table) {
  id.increments();
  nome_filme.string('name');
  table.descrição();
});



