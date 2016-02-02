import knexfile from './knexfile'

var knex = require('knex')(knexfile.development)
var bookshelf = require('bookshelf')(knex)
bookshelf.plugin('registry')

export default bookshelf

require('./models/Movie');
require('./models/Director');
require('./models/Genre');
