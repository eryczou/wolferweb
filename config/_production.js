/* eslint key-spacing:0 */
export default (config) => ({
  server_host : 'wolferx.com',
  compiler_fail_on_warning : false,
  compiler_hash_type       : 'chunkhash',
  compiler_devtool         : null,
  compiler_public_path: '/',
  compiler_stats           : {
    chunks : true,
    chunkModules : true,
    colors : true
  },
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
    __NODE_API_URL__: JSON.stringify(`http://wolferx.com/api`)
  }
})
