'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = undefined;
exports.renderToString = renderToString;

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _render = require('./render');

var _Config = require('./Config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderToString(value) {
  var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  config = (0, _Config.mergeConfig)(_Config.defaultConfig, config);
  var renderConfig = (0, _Config.toRenderConfig)(config);
  var parseConfig = (0, _Config.toParseConfig)(config);
  var mdast = (0, _parse2.default)(value, parseConfig);
  var jsast = (0, _render.renderToProgram)(mdast, renderConfig);
  return (0, _babelGenerator2.default)(jsast, {
    compact: false,
    concise: false
  });
} /**
   * @copyright 2016-present, Reactdown Team
   * 
   */

exports.parse = _parse2.default;
