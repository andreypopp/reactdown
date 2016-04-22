'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnorderedList = exports.OrderedList = exports.ListItem = exports.Link = exports.Code = exports.Blockquote = exports.TableCell = exports.TableHeaderCell = exports.TableRow = exports.TableHead = exports.TableBody = exports.Table = exports.Rule = exports.InlineCode = exports.Strong = exports.Emphasis = exports.Break = exports.Image = exports.Strikethrough = exports.Paragraph = exports.Root = undefined;
exports.HTML = HTML;
exports.Heading = Heading;
exports.Unknown = Unknown;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * @copyright 2016-present, Reactdown team
                                                                                                                                                                                                                              * 
                                                                                                                                                                                                                              */

var Root = exports.Root = 'div';
var Paragraph = exports.Paragraph = 'p';
var Strikethrough = exports.Strikethrough = 'del';
var Image = exports.Image = 'img';
var Break = exports.Break = 'br';
var Emphasis = exports.Emphasis = 'em';
var Strong = exports.Strong = 'strong';
var InlineCode = exports.InlineCode = 'code';
var Rule = exports.Rule = 'hr';
var Table = exports.Table = 'table';
var TableBody = exports.TableBody = 'tbody';
var TableHead = exports.TableHead = 'thead';
var TableRow = exports.TableRow = 'tr';
var TableHeaderCell = exports.TableHeaderCell = 'th';
var TableCell = exports.TableCell = 'td';
var Blockquote = exports.Blockquote = 'blockquote';
var Code = exports.Code = 'code';
var Link = exports.Link = 'a';
var ListItem = exports.ListItem = 'li';
var OrderedList = exports.OrderedList = 'ol';
var UnorderedList = exports.UnorderedList = 'ul';

function HTML(_ref) {
  var html = _ref.html;

  return _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}

function Heading(_ref2) {
  var level = _ref2.level;

  var props = _objectWithoutProperties(_ref2, ['level']);

  var Component = 'h' + Math.min(level, 6);
  return _react2.default.createElement(Component, props);
}

var unknownStyle = {
  root: {
    color: '#5F0101',
    background: 'rgb(255, 231, 231)',
    fontWeight: 'bold',
    fontFamily: 'monospace'
  },
  heading: {
    background: '#FF7575',
    padding: 5
  },
  report: {
    padding: 10,
    margin: 0
  }
};

function Unknown(_ref3) {
  var children = _ref3.children;

  return _react2.default.createElement(
    'div',
    { style: unknownStyle.root },
    _react2.default.createElement(
      'div',
      { style: unknownStyle.heading },
      'Unknown node found:'
    ),
    _react2.default.createElement(
      'pre',
      { style: unknownStyle.report },
      _react2.default.createElement(
        'code',
        null,
        children
      )
    )
  );
}
