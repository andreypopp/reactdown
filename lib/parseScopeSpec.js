'use strict';

var isString = require('./isString');

function parseScopeSpec(spec) {
  var scope = {};

  if (!spec || spec.length === 0) {
    return scope;
  }

  if (!Array.isArray(spec)) {
    spec = [spec];
  }

  spec.forEach(function(s) {
    if (isString(s)) {
      s = s.split(':');
      if (s.length !== 2) {
        throw new Error('invalid scope specifier: ' + s.join(':'));
      }
      scope[s[0]] = s[1];

    } else if (typeof s === 'object') {
      for (var k in s) {
        scope[k] = s[k];
      }
    }
  });

  return scope;
}

module.exports = parseScopeSpec;
