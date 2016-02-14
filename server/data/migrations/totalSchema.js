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
    .raw(`CREATE TABLE token (
      user_id int(10) unsigned NOT NULL,
      device varchar(31) NOT NULL,
      refresh varchar(127) DEFAULT NULL,
      created_at datetime DEFAULT NULL,
      updated_at datetime DEFAULT NULL,
      PRIMARY KEY (user_id, device),
      CONSTRAINT token_user_id_foreign FOREIGN KEY (user_id) REFERENCES user (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`)
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
