'use strict';
/*eslint no-path-concat:0*/
/*eslint no-wrap-func:0*/
/**
 * Testing includes
 */

var mqtt = require('../');

/**
 * Unit under test
 */

describe('mqtt', function () {
    describe('#connect', function () {
        it('should return an MqttClient when connect is called with mqtt:/ url', function () {
            var c = mqtt.connect('mqtt://localhost:1883');

            c.should.be.instanceOf(mqtt.MqttClient);
        });

        it('should return an MqttClient with username option set', function () {
            var c = mqtt.connect('mqtt://user:pass@localhost:1883');

            c.should.be.instanceOf(mqtt.MqttClient);
            c.options.should.have.property('username', 'user');
            c.options.should.have.property('password', 'pass');
        });

        it('should return an MqttClient with username and password options set', function () {
            var c = mqtt.connect('mqtt://user@localhost:1883');

            c.should.be.instanceOf(mqtt.MqttClient);
            c.options.should.have.property('username', 'user');
        });

        it('should return an MqttClient with the clientid option set', function () {
            var c = mqtt.connect('mqtt://user@localhost:1883?clientId=123');

            c.should.be.instanceOf(mqtt.MqttClient);
            c.options.should.have.property('clientId', '123');
        });

        it('should return an MqttClient when connect is called with tcp:/ url', function () {
            var c = mqtt.connect('tcp://localhost');

            c.should.be.instanceOf(mqtt.MqttClient);
        });

        it('should return an MqttClient with correct host when called with a host and port', function () {
            var c = mqtt.connect('tcp://user:pass@localhost:1883');

            c.options.should.have.property('hostname', 'localhost');
            c.options.should.have.property('port', '1883');
        });
    });
});
