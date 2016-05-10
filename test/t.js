'use strict';

require('should');

var t = require('t');

t.options.timeout = 5000;

t.queue('test/mqtt.js');
t.queue('test/server.js');
t.queue('test/client.js');
t.queue('test/store.js');
