'use strict';

/* Protocol - protocol constants */

/* Command code => mnemonic */
exports.types = {
    0: 'reserved',
    1: 'connect',
    2: 'connack',
    3: 'publish',
    4: 'puback',
    5: 'pubrec',
    6: 'pubrel',
    7: 'pubcomp',
    8: 'subscribe',
    9: 'suback',
    10: 'unsubscribe',
    11: 'unsuback',
    12: 'pingreq',
    13: 'pingresp',
    14: 'disconnect',
    15: 'reserved'
};

/* Mnemonic => Command code */
exports.codes = {};

for (var k in exports.types) {
    var v = exports.types[k];
    exports.codes[v] = k;
}

/* Header */
exports.CMD_SHIFT = 4;
exports.CMD_MASK = 0xF0;
exports.DUP_MASK = 0x08;
exports.QOS_MASK = 0x03;
exports.QOS_SHIFT = 1;
exports.RETAIN_MASK = 0x01;

/* Length */
exports.LENGTH_MASK = 0x7F;
exports.LENGTH_FIN_MASK = 0x80;

/* Connack */
exports.SESSIONPRESENT_MASK = 0x01;

/* Connect */
exports.USERNAME_MASK = 0x80;
exports.PASSWORD_MASK = 0x40;
exports.WILL_RETAIN_MASK = 0x20;
exports.WILL_QOS_MASK = 0x18;
exports.WILL_QOS_SHIFT = 3;
exports.WILL_FLAG_MASK = 0x04;
exports.CLEAN_SESSION_MASK = 0x02;
