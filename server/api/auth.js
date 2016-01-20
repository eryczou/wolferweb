import Router from 'koa-router'
import counterApi from './counter'
const jwt = require('jsonwebtoken');


const auth = new Router()

auth.post('/getToken', (ctx, next) => {
  let params = ctx.request.body;
  console.log(typeof params)
  console.log(params)
  if (params.email == 'hello@test.com' && params.password == 'test') {
    ctx.status = 200
    ctx.body = {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8'};
  } else {
    ctx.status = 403
  }
})

auth.get('/getData', (ctx, next) => {
  let token = ctx.headers['authorization'];
  console.log(token)
  if (!token) {
    ctx.status = 401
  } else {
    try {
      console.log(token.replace('Bearer ', ''))
      let decoded = jwt.verify(token.replace('Bearer ', ''), 'secret-key');
      ctx.status = 200
      ctx.body = {data: 'Valid JWT found! This protected data was fetched from the server.'};
    } catch (e) {
      ctx.status = 401
    }
  }
})

export default auth
