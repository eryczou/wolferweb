import Router from 'koa-router'
import Movie from '../data/models/Movie'


const test = new Router()

test.get('/random-increment', (ctx, next) => {
  ctx.body = {
    increment: Math.floor((Math.random() * 25) + 1)
  }
})

test.get('/movies', async (ctx, next) => {
  await new Movie().fetchAll()
    .then(function(movies) {
      ctx.status = 200
      ctx.body = {
        payload: movies.toJSON()
      }
    })
    .catch(function(error) {
      console.log(error)
    })
})


export default test
