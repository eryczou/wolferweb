import jwt from 'koa-jwt'
import config from '../../config'

export const generateToken = (userId) => {
  const payload = { userId }

  return jwt.sign(payload, config.jwt.secret, {
    expire: config.jwt.expire
  })
}

export const generateRefreshToken = (userId) => {
  const payload = { userId }

  return jwt.sign(payload, config.jwt.secret, {
    expire: config.jwt.refresh_expire
  })
}
