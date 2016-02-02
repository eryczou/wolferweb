exports.up = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('directors')
    .createTable('directors', function(table) {
      table.increments().unsigned().primary().index()
      table.string('first_name')
      table.string('last_name')
      table.timestamps()
    })
    .dropTableIfExists('movies')
    .dropTableIfExists('movie')
    .createTable('movies', function(table) {
      table.increments().unsigned().primary()
      table.string('title')
      table.integer('year')
      table.integer('director_id').unsigned().references('id').inTable('directors')
      table.timestamps()
    })
    .dropTableIfExists('genres')
    .createTable('genres', function(table) {
      table.increments().primary()
      table.string('name')
      table.timestamps()
    })
    .dropTableIfExists('movies_genres')
    .createTable('movies_genres', function(table) {
      table.increments().unsigned()
      table.integer('movie_id')
      table.integer('genre_id')
      table.timestamps()
    })
    .then(function() {
      console.log(`
      Table created in order:

      Directors table created,
      Movies table created,
      Genres table created,
      Movies_genres created`)
    })
}

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('movies_genres')
    .dropTable('genres')
    .dropTable('movie')
    .dropTable('directors')
    .dropTable('knex_migrations')
    .then(function() {
      console.log(`
      Table dropped in order:
      Directors table dropped,
      Movie table dropped,
      Genres table dropped,
      Movies_genres dropped`)
    })
}
