import bookshelf from '../bookshelf'
import './Director'

const Movie = bookshelf.Model.extend({
  tableName: 'movies',

  director: function() {
    return this.belongsTo('Director')
  }
})

export default bookshelf.model('Movie', Movie)
