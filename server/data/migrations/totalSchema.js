exports.up = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('token')
    .dropTableIfExists('user')
    .createTable('user', function(table) {
      table.increments().unsigned().primary().index()
      table.string('email', 63).notNullable().unique().index()
      table.string('username', 63).nullable().unique().index()
      table.string('password', 127).notNullable()
      table.integer('status').notNullable().defaultTo(0)
      table.timestamps()
    })
    .createTable('token', function(table) {
      table.integer('user_id').unsigned().references('id').inTable('user')
      table.string('device', 31).notNullable()
      table.string('refresh', 127).nullable()
      table.timestamps()
      table.primary(['user_id', 'device'])
      table.index(['user_id', 'device'])
    })
    .then(function() {
      console.log(`
      user table created
      token table created
      `)
    })
}

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('user')
    .then(function() {
      console.log('Users table dropped')
    })
}
