require('babel-register');

const config = require('../config');
const server = require('../server/main');
const debug = require('debug')('app:bin:server');

const host = config.server_host;
const port = config.server_port;

server.listen(port, function() {
  debug('Server listening at ' + host + ':' + port);
});
