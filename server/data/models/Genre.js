import bookshelf from '../bookshelf'

const Genre = bookshelf.Model.extend({
  tableName: 'genres'
})

export default bookshelf.model('Genre', Genre)
