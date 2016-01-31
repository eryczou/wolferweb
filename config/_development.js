// We use an explicit public path when the assets are served by webpack
// to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
export default (config) => ({
  compiler_public_path: `http://${config.server_host}:${config.server_port}/`,
  proxy: {
    enabled: false,
    options: {
      // koa-proxy options
      host: 'http://localhost:8000',
      match: /^\/api\/.*/
    }
  },
  globals: {
    ...config.globals,
    __PYTHON_API_URL__: JSON.stringify('http://ec2-54-85-109-102.compute-1.amazonaws.com:9999/api'),
    __NODE_API_URL__: JSON.stringify(`http://${config.server_host}:${config.server_port}/api`)
  }
})
