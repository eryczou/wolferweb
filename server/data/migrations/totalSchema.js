exports.up = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('user')
    .createTable('user', function(table) {
      table.increments().unsigned().primary().index()
      table.string('username', 63).notNullable().unique().index()
      table.string('password', 63).notNullable()
      table.string('token')
      table.string('refresh')
      table.timestamps()
    })
    .then(function() {
      console.log(`
      Table created in order:
      Users table created
      `)
    })
}

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('user')
    .then(function() {
      console.log(`
      Table dropped in order:
      Users table dropped
      `)
    })
}
