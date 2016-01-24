import Router from 'koa-router'
import counterApi from './counter'
import authApi from './auth'

const api = new Router({
  prefix: '/api'
})

api.use('/counter', counterApi.routes())
api.use('/auth', authApi.routes())

export default api
