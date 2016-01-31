import jwt from 'koa-jwt'
import config from '../../config'

export const generateToken = (email, password) => {
  const payload = { email, password }

  return jwt.sign(payload, config.jwt.secret, {
    expire: config.jwt.expire
  })
}
