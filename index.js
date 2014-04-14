"use strict";

var jsxTransform   = require('react-tools').transform;
var marked         = require('./lib/meta-marked');
var parseScopeSpec = require('./lib/parseScopeSpec');
var runtime        = require.resolve('./lib/runtime');

function make(marked) {
  return function compile(src, opts) {
    var compiled = marked(src);
    var meta = compiled.meta || {};

    var component = meta.component ?
      'require(' + JSON.stringify(meta.component) + ')' :
      opts.component ?
      'require(' + JSON.stringify(opts.component) + ')' :
      '_runtime.Reactdown'

    var scope = {};

    if (meta.scope) {
      for (var k in meta.scope) {
        scope[k] = meta.scope[k];
      }
    }

    if (opts.scope) {
      var optsScope = parseScopeSpec(opts.scope);
      for (var n in optsScope) {
        scope[n] = optsScope[n];
      }
    }

    delete meta.component;
    delete meta.scope;

    var scopeCode = [];
    for (var name in scope) {
      scopeCode.push('var ' + name +
          ' = require(' + JSON.stringify(scope[name]) + ');');
    }

    var html = compiled.html;

    var code = [
      '/** @jsx React.DOM */',
      'var React      = require("react");',
      '',
      'var _runtime   = require(' + JSON.stringify(runtime) + ');',
      'var _Wrapper   = _runtime.Wrapper;',
      'var _Component = ' + component + ';',
      '',
      'module.exports = function create(props) {',
      '  var _markup    = <_Wrapper>' + html + '</_Wrapper>;',
      '  props = _runtime.merge(module.exports.meta, props);',
      '  return _Component.apply(_Component, [props].concat(_markup));',
      '};',
      'module.exports.meta   = ' + JSON.stringify(meta) + ';'
    ].concat(scopeCode).join('\n');

 //   annotated(code);
    code = jsxTransform(code);

    return {code: code, meta: meta};
  }
}

function annotated(code) {
  code.split('\n').forEach(function(line, idx) {
    console.log('' + idx + '  ' + line);
  });
}

module.exports = make(marked);
module.exports.make = make;
module.exports.marked = marked;
module.exports.Renderer = marked.noMeta.Renderer;
