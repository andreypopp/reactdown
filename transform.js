"use strict";

var util        = require('util');
var reactdown   = require('./index');
var Transform   = require('stream').Transform;
var PassThrough = require('stream').PassThrough;
var Buffer      = require('buffer').Buffer;

module.exports = function reactdownTransform(filename, opts) {
  if (!isString(filename) && !opts) {
    opts = filename;
    filename = undefined;
  }
  if (filename && !/\.md$/.exec(filename)) {
    return new PassThrough();
  }
  return new ReactdownTransform(opts);
}

function ReactdownTransform(opts) {
  Transform.call(this);
  this._buffer = new Buffer('');
  this._opts = opts;
}
util.inherits(ReactdownTransform, Transform);

ReactdownTransform.prototype._transform = function(chunk, encoding, done) {
  this._buffer = Buffer.concat([this._buffer, chunk]);
  done();
}

ReactdownTransform.prototype._flush = function(done) {
  var src = this._buffer.toString();
  this.push(reactdown(src, this._opts).code);
  done();
}

function isString(o) {
  return Object.prototype.toString.call(o) === '[object String]';
}
