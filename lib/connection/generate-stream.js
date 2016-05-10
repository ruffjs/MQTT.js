'use strict';

var through = require('../through.js');
var generate = require('../packet/generate.js');
var empty = new Buffer(0);

function generateStream() {
    var stream = through.obj(process);

    function process(chunk, enc, cb) {
        var packet = empty;

        try {
            packet = generate(chunk);
        } catch (err) {
            this.emit('error', err);
            return;
        }

        this.push(packet);
        cb();
    }

    return stream;
}

module.exports = generateStream;
