import Router from 'koa-router'
import jwt from 'koa-jwt'
import moment from 'moment'
import bcrypt from 'bcrypt'
import config from '../../config'
import { generateToken, generateRefreshToken } from '../utils/authUtils'
import User from '../data/models/User'
import Token from '../data/models/Token'

const auth = new Router()

auth.post('/login', async (ctx, next) => {
  let { email, password } = ctx.request.body

  await new User({
    'email': email
  })
    .fetch()
    .then((model) => {
      const hash = model.get('password')
      const isValidPassword = bcrypt.compareSync(password, hash)

      if (isValidPassword) {
        const userId = model.get('id')
        const token = generateToken(userId)
        ctx.status = 200

        ctx.cookies.set('wfx_token', token, {
          httpOnly: true,
          overwrite: true,
          maxAge: config.auth.expire
        })

        ctx.body = {
          payload: {
            token: token,
            user: {
              id: userId
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
  const timeNow = moment().format("YYYY-MM-DD HH:mm:ss")
  const salt = bcrypt.genSaltSync(8) + config.auth.secret
  const hash = bcrypt.hashSync(password, salt)

  if (hash) {
    let userId = null

    await new User({
      email: email,
      password: hash,
      created_at: timeNow,
      updated_at: timeNow
    }).save()
      .then((model) => {
        userId = model.get('id')
      })
      .catch((error) => {
        throw error
      })

    if (userId) {
      const token = generateToken(userId)
      const freshToken = generateRefreshToken(userId)
      const tokenSalt = bcrypt.genSaltSync(1)
      const hashedRefreshToken = bcrypt.hashSync(freshToken, tokenSalt)
      await new Token({
        user_id: userId,
        device: '',
        refresh: hashedRefreshToken,
        created_at: timeNow,
        updated_at: timeNow
      })
        .save()
        .then(() => {
          ctx.status = 200
          ctx.body = {
            payload: {
              token: token,
              refresh: freshToken,
              user: {
                id: userId
              }
            }
          }
        })
        .catch((error) => {
          throw error
        })
    }
  }
})

auth.get('/isValidToken', (ctx, next) => {

  //let token = ctx.headers.authorization

  let token = ctx.cookies.get('token', { signed: true })
  console.log(token)

  if (!token) {
    ctx.status = 401
  } else {
    try {
      const decodedToken = jwt.verify(token.replace('Bearer ', ''), config.jwt.secret)
      ctx.status = 200
      ctx.body = {payload: 'Valid Token'}
    } catch (e) {
      ctx.status = 401
    }
  }
})

export default auth
