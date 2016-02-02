import Koa from 'koa'
import convert from 'koa-convert'
import jwt from 'koa-jwt'
import _debug from 'debug'
import config from '../config'
import * as httpErrHandler from './middleware/http-error-handler'
import { publicApi, privateApi } from './api'

const debug = _debug('app:server')
const paths = config.utils_paths

const koaApp = () => {
  let app = new Koa()

  middlewareInit(app)

  // Custom 401 handling if you don't want to expose koa-jwt errors to users
  app.use(httpErrHandler.err401())

  // public api
  app.use(publicApi.routes())

  // jwt validation
  app.use(convert(jwt({ secret: config.jwt.secret, key: 'jwtdata' })))
  // use key pairs as secret
  //var publicKey = fs.readFileSync('/path/to/public.pub');
  //app.use(jwt({ secret: publicKey }));

  // private api
  app.use(privateApi.routes())

  return app
}

export default koaApp



const middlewareInit = (app) => {
  debug("Init server middleware")
  const log = require('logfilename')(__filename, config.log)
  const bodyParser = require('koa-bodyparser')
  const cookieParser = require('./middleware/express-coookieParser')
  const historyApiFallback = require('koa-connect-history-api-fallback')
  const webpack = require('webpack')
  const webpackConfig = require ('../build/webpack.config')
  const serve = require('koa-static')

  // koa-bodyparser
  app.use(bodyParser())
  // express cookie-parser
  app.use(cookieParser())

  // log api request
  app.use(async(ctx, next) => {
    const start = new Date;
    log.debug(`${ctx.method} ${ctx.url} begins`)
    await next();
    const ms = new Date - start;
    log.debug(`${ctx.method} ${ctx.url} ends in ${ms}ms, code: ${ctx.status}`)
  });

  // Rewrites all routes requests to the root /index.html file
  // Remove this, if you want to implement isomorphic rendering
  app.use(convert(historyApiFallback({
    verbose: false
  })))

  // webpack HMR middleware for dev only
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
    debug('Server is running on development mode.')
  } else {
    debug('Server is running on production mode.')
    app.use(convert(serve(paths.base(config.dir_dist))))
  }
}
