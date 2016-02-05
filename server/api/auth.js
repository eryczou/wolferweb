import Router from 'koa-router'
import jwt from 'koa-jwt'
import moment from 'moment'
import config from '../../config'
import { generateToken } from '../utils/authUtils'
import User from '../data/models/User'


const auth = new Router()

const HARDCODED_USER = {
  id: 4,
  email: 'hello@test.com',
  password: 'test'
};

auth.post('/login', async (ctx, next) => {
  let { email, password } = ctx.request.body
  const token = generateToken(email, password)

  await new User({
    'username': email
  })
    .fetch()
    .then((model) => {
      console.log(model)
      console.log(`The saved token = ${model.get('token')}`)
      console.log (model.get('token') == token ? 'true' : 'false')
      if (model.get('token').split('.')[0] == token.split('.')[0]) {
        ctx.status = 200
        ctx.body = {
          payload: {
            token: model.get('token'),
            user: {
              id: model.get('id'),
              username: model.get('username')
            }
          }
        }
      } else {
        ctx.status = 403
      }
    })
    .catch((error) => {
      ctx.status = 403
    })
})

auth.post('/register', async (ctx, next) => {
  let { email, password } = ctx.request.body
  const timeNow = moment().format()
  const token = generateToken(email, password)

  await new User({
    username: email,
    password: password,
    token: token,
    created_at: timeNow,
    updated_at: timeNow
  })
    .save()
    .then((model) => {
      console.log(model)
      ctx.status = 200
      ctx.body = {
        payload: {
          token: model.get('token'),
          user: {
            id: model.get('id'),
            username: model.get('username')
          }
        }
      }
    })
    .catch((error) => {
      console.log(error)
    })
})

auth.get('/validateToken', (ctx, next) => {

  let token = ctx.headers.authorization

  if (!token) {
    ctx.status = 401
  } else {
    try {
      jwt.verify(token.replace('Bearer ', ''), config.jwt.secret)
      ctx.status = 200
      ctx.body = {data: 'Valid JWT found! This protected data was fetched from the server.'};
    } catch (e) {
      ctx.status = 401
    }
  }
})

export default auth
