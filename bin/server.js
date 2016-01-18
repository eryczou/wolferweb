require('babel-register');

const config = require('../config');
//const server = require('../server/main');
const server = require('../server/koa');
const debug = require('debug')('app:bin:server');

const host = config.server_host;
const port = config.server_port;

server.listen(port)
debug(`Server is now running at ${host}:${port}.`)
