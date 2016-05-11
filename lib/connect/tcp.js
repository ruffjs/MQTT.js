'use strict';

var net = require('net');

/*
  variables port and host can be removed since
  you have all required information in opts object
*/
function buildBuilder(client, opts) {
    opts.port = opts.port || 1883;
    opts.hostname = opts.hostname || opts.host || 'localhost';

    var port = opts.port;
    var host = opts.hostname;

    return net.createConnection(port, host);
}

module.exports = buildBuilder;
