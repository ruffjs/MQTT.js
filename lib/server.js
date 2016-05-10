'use strict';
/**
 * Requires
 */
var net = require('net');
var util = require('util');
var Connection = require('./connection/index.js');
var MqttServer;

function setupConnection(duplex) {
    /*jshint validthis: true*/
    var connection = new Connection(duplex);
    this.emit('client', connection);
    /*jshint validthis: false*/
}

/*
 * MqttServer
 *
 * @param {Function} listener - fired on client connection
 */
MqttServer = module.exports.MqttServer = function Server(listener) {
    if (!(this instanceof Server)) {
        return new Server(listener);
    }

    net.Server.call(this);

    this.on('connection', setupConnection);

    if (listener) {
        this.on('client', listener);
    }

    return this;
};

util.inherits(MqttServer, net.Server);
