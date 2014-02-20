"use strict";

var marked       = require('meta-marked');
var jsxTransform = require('react-tools').transform;
var runtime      = require.resolve('./runtime');

function compile(src, opts) {
  var compiled = marked(src);
  var meta = compiled.meta || {};

  var component = meta.component ?
    'require(' + JSON.stringify(meta.component) + ')' :
    opts.component ?
    'require(' + JSON.stringify(opts.component) + ')' :
    '_runtime.Reactdown'

  var scope = meta.scope ?
    'require(' + JSON.stringify(meta.scope) + ')' :
    opts.scope ?
    'require(' + JSON.stringify(opts.scope) + ')' :
    '{}';

  delete meta.component;
  delete meta.scope;

  var code = [
    '/** @jsx React.DOM */',
    'var React      = require("react");',
    '',
    'var _runtime   = require(' + JSON.stringify(runtime) + ');',
    'var _Wrapper   = _runtime.Wrapper;',
    'var _Component = ' + component + ';',
    '',
    '_runtime.mergeInto(global, ' + scope + ');',
    '',
    'var _markup    = <_Wrapper>' + compiled.html + '</_Wrapper>;',
    '',
    'module.exports = function create(props) {',
    '  props = _runtime.merge(module.exports.meta, props);',
    '  return _Component.apply(_Component, [props].concat(_markup));',
    '};',
    'module.exports.meta   = ' + JSON.stringify(meta) + ';'
  ].join('\n');

  code = jsxTransform(code);

  return {code: code, meta: meta};
}

module.exports = compile;
