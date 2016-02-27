import Router from 'koa-router'
import jwt from 'koa-jwt'
import moment from 'moment'
import bcrypt from 'bcrypt'
import config from '../../config'
import Constants from '../utils/constants'
import { generateToken, generateRefreshToken } from '../utils/authUtils'
import User from '../data/models/User'
import Token from '../data/models/Token'

const auth = new Router()

auth.post('/login', async (ctx, next) => {
  let { email, password, rememberMe } = ctx.request.body

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
        const freshToken = generateRefreshToken(userId)
        const dateNow = Date.now()

        ctx.status = 200
        ctx.body = {
          payload: {
            user: {
              id: userId
            }
          }
        }
        if (rememberMe) {
          ctx.cookies.set('wfx_token', token, {
            httpOnly: true,
            overwrite: true,
            expires: new Date(dateNow + config.jwt.cookie_expire)
          })
          ctx.cookies.set('wfx_refresh', freshToken, {
            httpOnly: true,
            overwrite: true,
            expires: new Date(dateNow + config.jwt.cookie_refresh_expire)
          })
        } else {
          ctx.cookies.set('wfx_token', token, {
            httpOnly: true,
            overwrite: true
          })
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

  let isEmailBeenTaken = false
  await new User({
    'email': email
  })
    .fetch()
    .then((model) => {
      if (model != null) {
        ctx.status = 202
        ctx.body = {
          errorCode: Constants.errorCode.AUTH_DUPLICAT_EMAIL
        }
        isEmailBeenTaken = true
      }
    })
    .catch((error) => {
      ctx.status = 403
    })

  if (!isEmailBeenTaken) {
    const dbTimeNow = moment().format("YYYY-MM-DD HH:mm:ss")
    const salt = bcrypt.genSaltSync(8) + config.auth.secret
    const hash = bcrypt.hashSync(password, salt)

    if (hash) {
      let userId = null

      await new User({
        email: email,
        password: hash,
        created_at: dbTimeNow,
        updated_at: dbTimeNow
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
          created_at: dbTimeNow,
          updated_at: dbTimeNow
        })
          .save()
          .then(() => {
            ctx.status = 200
            ctx.body = {
              payload: {
                user: {
                  id: userId
                }
              }
            }
            ctx.cookies.set('wfx_token', token, {
              httpOnly: true,
              overwrite: true
            })
          })
          .catch((error) => {
            throw error
          })
      }
    }
  }
})

auth.get('/isLoggedIn', (ctx, next) => {
  const token = ctx.cookies.get('wfx_token')
  if (typeof token != 'undefined' && token) {
    try {
      jwt.verify(token, config.jwt.secret)
      ctx.status = 200
      ctx.body = { payload: 'User has already logged in' }
    } catch (e) {
      ctx.status = 401
    }
  } else {
    const refreshToken = ctx.cookies.get('wfx_refresh')
    if (typeof refreshToken != 'undefined' && refreshToken) {

      try {
        const decodeRefreshToken = jwt.verify(refreshToken, config.jwt.secret)
        const userId = decodeRefreshToken.userId
        const token = generateToken(userId)
        const dateNow = Date.now()
        ctx.status = 200
        ctx.body = { payload: 'User has already logged in' }
        ctx.cookies.set('wfx_token', token, {
          httpOnly: true,
          overwrite: true,
          expires: new Date(dateNow + config.jwt.cookie_expire)
        })
      } catch (e) {
        ctx.status = 401
      }
    } else {
      ctx.status = 401
    }
  }

})

export default auth
