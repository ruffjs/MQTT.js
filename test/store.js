'use strict';
var Store = require('../lib/store.js');
var abstractTest = require('../test/abstract_store.js');

describe('in-memory store', function () {
    abstractTest(function (done) {
        done(null, new Store());
    });
});
