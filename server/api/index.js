import Router from 'koa-router'
import counterApi from './counter'
import authApi from './auth'

export const publicApi = new Router({
  prefix: '/api'
})

publicApi.use('/auth', authApi.routes())

export const privateApi = new Router({
  prefix: '/api'
})

privateApi.use('/counter', counterApi.routes())
