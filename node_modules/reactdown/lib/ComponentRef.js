'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.parse = parse;
exports.parseNamed = parseNamed;
exports.resolve = resolve;
/**
 * @copyright 2016-present, Reactdown Team
 * 
 */

// TODO: More robust regexpes required!
var PARSE_REF_RE = /^([a-zA-Z0-9\._\-\/]+)(\?([a-zA-Z0-9_]+))?$/;
var PARSE_NAMED_REF_RE = /^([a-zA-Z0-9_]+)=([a-zA-Z0-9_\.\-\/]+)(\?([a-zA-Z0-9_]+))?$/;

function parse(ref) {
  var match = PARSE_REF_RE.exec(ref);
  if (!match) {
    return null;
  }

  var _match = _slicedToArray(match, 4);

  var _everything = _match[0];
  var source = _match[1];
  var _nothing = _match[2];
  var _match$ = _match[3];
  var name = _match$ === undefined ? 'default' : _match$;

  return { source: source, name: name };
}

function parseNamed(ref) {
  var match = PARSE_NAMED_REF_RE.exec(ref);
  if (!match) {
    return null;
  }

  var _match2 = _slicedToArray(match, 5);

  var _everything = _match2[0];
  var id = _match2[1];
  var source = _match2[2];
  var _nothing = _match2[3];
  var _match2$ = _match2[4];
  var name = _match2$ === undefined ? 'default' : _match2$;

  return { id: id, ref: { source: source, name: name } };
}

function resolve(ref) {
  if (typeof ref === 'string') {
    ref = parse(ref);
  }
  if (ref == null) {
    return null;
  }
  // $FlowIssue: not a flow issue, we are just being smart here
  return require(ref.source)[ref.name];
}
