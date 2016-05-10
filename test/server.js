'use strict';
/**
 * Testing requires
 */

var server = require('../lib/server.js');
var Connection = require('../lib/connection/index.js');
var mqtt = require('../');

describe('MqttServer', function () {
    it('should emit MqttServerClients', function (done) {
        var s = new server.MqttServer();
        s.listen(9877);

        s.once('client', function (client) {
            client.should.be.instanceOf(Connection);
            done();
        });

        mqtt.connect('mqtt://localhost:9877');
    });

    it('should bind the stream\'s error in the clients', function (done) {
        var s = new server.MqttServer();
        s.listen(9878);

        s.once('client', function (client) {
            client.once('error', function () {
                done();
            });
            client.stream.emit('error', new Error('bad idea!'));
        });

        mqtt.connect('mqtt://localhost:9878');
    });

    it('should bind the stream\'s close in the clients', function (done) {
        var s = new server.MqttServer();
        s.listen(9879);

        s.once('client', function (client) {
            client.once('close', done);
            client.stream.emit('close');
        });

        mqtt.connect('mqtt://localhost:9879');
    });
});
