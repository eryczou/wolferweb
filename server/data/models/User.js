import bookshelf from '../bookshelf'

const User = bookshelf.Model.extend({
  tableName: 'users'
})

export default bookshelf.model('User', User)
