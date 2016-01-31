import Router from 'koa-router'
import jwt1 from 'jsonwebtoken'
import jwt from 'koa-jwt'
import config from '../../config'
import { generateToken, extractToken } from '../utils/authUtils'
import _ from 'lodash'

const auth = new Router()

const HARDCODED_USER = {
  id: 4,
  email: 'hello@test.com',
  password: 'test'
};

auth.post('/login', (ctx, next) => {
  let { email, password } = ctx.request.body;
  if (email == HARDCODED_USER.email && password == HARDCODED_USER.password) {
    const token = generateToken(email, password)
    const user = {
      id : HARDCODED_USER.id,
      username : HARDCODED_USER.email
    }
    ctx.status = 200
    ctx.body = {
      payload: {
        token: token,
        user: user
      }
    }
  } else {
    ctx.status = 403
  }
})

auth.get('/validateToken', (ctx, next) => {

  let token = ctx.headers.authorization;

  if (!token) {
    ctx.status = 401
  } else {
    try {
      jwt.verify(token.replace('Bearer ', ''), config.jwt.secret);
      ctx.status = 200
      ctx.body = {data: 'Valid JWT found! This protected data was fetched from the server.'};
    } catch (e) {
      ctx.status = 401
    }
  }
})

export default auth
