"use strict";

var path            = require('path');
var util            = require('util');
var Transform       = require('stream').Transform;
var PassThrough     = require('stream').PassThrough;
var Buffer          = require('buffer').Buffer;
var reactdown       = require('./index');
var isString        = require('./lib/isString');
var parseScopeSpec  = require('./lib/parseScopeSpec');

var cwd = process.cwd();

module.exports = function reactdownTransform(filename, opts) {
  if (!isString(filename) && !opts) {
    opts = filename;
    filename = undefined;
  }


  if (filename && !/\.md$/.exec(filename)) {
    return new PassThrough();
  }

  var scope = parseScopeSpec(opts.scope);

  for (var k in scope) {
    scope[k] = path.resolve(cwd, scope[k]);
  }

  opts.scope = scope;

  return new ReactdownTransform(opts);
}

function ReactdownTransform(opts) {
  Transform.call(this);
  this._buffer = new Buffer('');
  this._opts = opts;
  this._reactdown = opts.reactdown || reactdown;
}
util.inherits(ReactdownTransform, Transform);

ReactdownTransform.prototype._transform = function(chunk, encoding, done) {
  this._buffer = Buffer.concat([this._buffer, chunk]);
  done();
}

ReactdownTransform.prototype._flush = function(done) {
  var src = this._buffer.toString();
  try {
    this.push(this._reactdown(src, this._opts).code);
  } catch(e) {
    return this.emit('error', e);
  }
  done();
}
