import webpack from 'webpack'
import webpackConfig from '../build/webpack.config'
import Koa from 'koa'
import convert from 'koa-convert'
import jwt from 'koa-jwt'
import historyApiFallback from 'koa-connect-history-api-fallback'
import serve from 'koa-static'
import _debug from 'debug'
import config from '../config'

import bodyParser from 'koa-bodyparser'
import cookieParser from './middleware/express-coookieParser'
import { publicApi, privateApi } from './api'

const debug = _debug('app:server')
const paths = config.utils_paths
const app = new Koa()

// koa-bodyparser
app.use(bodyParser());
// express cookie-parser
app.use(cookieParser())

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(
  async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      if (401 == err.status) {
        ctx.status = 401;
        ctx.body = { message: 'Log In is require for this resource' }
      } else {
        ctx.status = err.status || 500
        ctx.body = { message: err.message }
      }
    }
  }
)

// Rewrites all routes requests to the root /index.html file
// Remove this, if you want to implement isomorphic rendering
app.use(convert(historyApiFallback({
  verbose: false
})))

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output

  if (config.proxy && config.proxy.enabled) {
    const options = config.proxy.options
    app.use(convert(require('./middleware/webpack-proxy')(options)))
  }

  app.use(require('./middleware/webpack-dev')(compiler, publicPath))
  app.use(require('./middleware/webpack-hmr')(compiler))

  app.use(convert(serve(paths.client('static'))))
} else {
  debug('Server is being run outside of live development mode.')
  app.use(convert(serve(paths.base(config.dir_dist))))
}

// ------------------------------------
// API
// ------------------------------------

// public api
app.use(publicApi.routes());

// jwt validation
//app.use(convert(jwt({ secret: config.JWT.secret })));

// private api
app.use(privateApi.routes());

export default app
