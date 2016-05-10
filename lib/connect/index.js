'use strict';

var url = require('url');

var MqttClient = require('../client.js');
var extend = require('../extend.js');

var protocols = {};
var protocolList = [];

if ('browser' !== process.title) {
    protocols.mqtt = require('./tcp.js');
    protocols.tcp = require('./tcp.js');
}

protocolList = [
    'mqtt'
];

/**
 * Parse the auth attribute and merge username and password in the options object.
 *
 * @param {Object} [opts] option object
 */
function parseAuthOptions(opts) {
    var matches;
    if (opts.auth) {
        matches = opts.auth.match(/^(.+):(.+)$/);
        if (matches) {
            opts.username = matches[1];
            opts.password = matches[2];
        } else {
            opts.username = opts.auth;
        }
    }
}

/**
 * connect - connect to an MQTT broker.
 *
 * @param {String} [brokerUrl] - url of the broker, optional
 * @param {Object} opts - see MqttClient#constructor
 */
function connect(brokerUrl, opts) {
    if (('object' === typeof brokerUrl) && !opts) {
        opts = brokerUrl;
        brokerUrl = null;
    }

    opts = opts || {};

    if (brokerUrl) {
        opts = extend(url.parse(brokerUrl, true), opts);
        opts.protocol = opts.protocol.replace(/\:$/, '');
    }

    // merge in the auth options if supplied
    parseAuthOptions(opts);

    // support clientId passed in the query string of the url
    if (opts.query && 'string' === typeof opts.query.clientId) {
        opts.clientId = opts.query.clientId;
    }

    if (!protocols[opts.protocol]) {
        opts.protocol = protocolList.filter(function (key) {
            return 'function' === typeof protocols[key];
        })[0];
    }

    if (false === opts.clean && !opts.clientId) {
        throw new Error('Missing clientId for unclean clients');
    }


    function wrapper(client) {
        if (opts.servers) {
            if (!client._reconnectCount || client._reconnectCount === opts.servers.length) {
                client._reconnectCount = 0;
            }

            opts.host = opts.servers[client._reconnectCount].host;
            opts.port = opts.servers[client._reconnectCount].port;
            opts.hostname = opts.host;

            client._reconnectCount++;
        }

        return protocols[opts.protocol](client, opts);
    }

    return new MqttClient(wrapper, opts);
}

module.exports = connect;
module.exports.connect = connect;
