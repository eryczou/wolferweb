import cookieParser from 'cookie-parser'
import applyExpressMiddleware from '../lib/apply-express-middleware'
import _debug from 'debug'

const debug = _debug('app:server:webpack-hmr')

export default function (compiler, opts) {
  debug('Enable Express Cookie-Parser')

  const middleware = cookieParser()
  return async function koaExpressCookieParserMiddleware (ctx, next) {
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, ctx.res)

    if (hasNext && next) {
      await next()
    }
  }
}