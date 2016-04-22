'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderNodeValue = renderNodeValue;

var _unistUtilVisit = require('unist-util-visit');

var _unistUtilVisit2 = _interopRequireDefault(_unistUtilVisit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright 2016-present, Reactdown Team
 * 
 */

function renderNodeValue(node) {
  var value = null;
  (0, _unistUtilVisit2.default)(node, function (node) {
    if (node.value) {
      value = value || '';
      value = value + node.value;
    }
  });
  return value;
}
