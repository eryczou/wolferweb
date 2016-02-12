import Router from 'koa-router'
import jwt from 'koa-jwt'
import moment from 'moment'
import bcrypt from 'bcrypt'
import config from '../../config'
import { generateToken } from '../utils/authUtils'
import User from '../data/models/User'


const auth = new Router()

auth.post('/login', async (ctx, next) => {
  let { email, password } = ctx.request.body

  await new User({
    'username': email
  })
    .fetch()
    .then((model) => {
      const hash = model.get('password')
      const isValidPassword = bcrypt.compareSync(password, hash)

      if (isValidPassword) {
        const token = generateToken(email, hash)
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
  const salt = bcrypt.genSaltSync(8) + config.auth.secret
  const hash = bcrypt.hashSync(password, salt)
  const token = generateToken(email, hash)

  if (hash) {
    await new User({
      username: email,
      password: hash,
      token: token,
      created_at: timeNow,
      updated_at: timeNow
    })
      .save()
      .then((model) => {
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
  }
})

auth.get('/validateToken', (ctx, next) => {

  let token = ctx.headers.authorization

  if (!token) {
    ctx.status = 401
  } else {
    try {
      const decodedToken = jwt.verify(token.replace('Bearer ', ''), config.jwt.secret)
      console.log(decodedToken)
      ctx.status = 200
      ctx.body = {data: 'Valid Token'}
    } catch (e) {
      ctx.status = 401
    }
  }
})

export default auth
