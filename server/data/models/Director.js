import bookshelf from '../bookshelf'
import './Movie'

const Director = bookshelf.Model.extend({
  tableName: 'directors',

  movies: function() {
    return this.hasMany('Movie')
  }
})

export default bookshelf.model('Director', Director)
