'use strict';

var through = require('../through.js');
var Parser = require('../packet/parser.js');

function parseStream() {
    var parser = new Parser();
    var stream = through.obj(process);

    parser.on('packet', push);
    parser.on('error', stream.emit.bind(stream, 'error'));

    function process(chunk, enc, cb) {
        parser.parse(chunk);
        cb();
    }

    function push(packet) {
        stream.push(packet);
    }

    return stream;
}

module.exports = parseStream;
