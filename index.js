"use strict";

var marked       = require('meta-marked');
var jsxTransform = require('react-tools').transform;
var runtime      = require.resolve('./runtime');

function compile(src, scope) {
  var compiled = marked(src);
  var meta = compiled.meta || {};

  var component = meta.component ?
    'require("' + meta.component + '")' :
    '_runtime.Reactdown'

  var scope = scope ?
    'require(' + JSON.stringify(scope) + ')' :
    '{}';

  delete meta.component;

  var code = [
    '/** @jsx React.DOM */',
    'var React      = require("react");',
    '',
    'var _runtime   = require(' + JSON.stringify(runtime) + ');',
    'var _Wrapper   = _runtime.Wrapper;',
    'var _Component = ' + component + ';',
    '',
    '_runtime.merge(' + scope + ');',
    '',
    'var _markup    = <_Wrapper>' + compiled.html + '</_Wrapper>;',
    '',
    'module.exports = function create(props) {',
    '  props = _runtime.merge(exports.meta, props);',
    '  return _Component.apply(_Component, [props].concat(_markup));',
    '};',
    'module.exports.meta   = ' + JSON.stringify(meta) + ';'
  ].join('\n');

  code = jsxTransform(code);

  return {code: code, meta: meta};
}

module.exports = compile;
