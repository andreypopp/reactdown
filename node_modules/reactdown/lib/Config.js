'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultConfig = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * @copyright 2016-present, Reactdown Team
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   */

exports.mergeConfig = mergeConfig;
exports.findConfig = findConfig;
exports.parseConfigFromQuery = parseConfigFromQuery;
exports.toRenderConfig = toRenderConfig;
exports.toParseConfig = toParseConfig;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _json = require('json5');

var _json2 = _interopRequireDefault(_json);

var _loaderUtils = require('loader-utils');

var _model = require('./model');

var model = _interopRequireWildcard(_model);

var _ComponentRef = require('./ComponentRef');

var ComponentRef = _interopRequireWildcard(_ComponentRef);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONFIG_FILENAME = '.reactdownrc';
var PACKAGE_FILENAME = 'package.json';

var defaultConfig = exports.defaultConfig = {
  components: null,
  directives: {},
  roles: {},
  model: model
};

function mergeConfig(config, merge) {
  if (!merge) {
    return config;
  }
  return _extends({}, config, merge, {
    directives: _extends({}, config.directives, merge.directives),
    roles: _extends({}, config.roles, merge.roles),
    model: _extends({}, config.model, merge.model)
  });
}

function findConfig(loc) {
  var seenConfig = false;
  var seenPackage = false;
  var config = defaultConfig;
  var sourceList = [];
  while (!(seenPackage && seenConfig) && loc !== _path2.default.dirname(loc)) {
    var configLoc = _path2.default.join(loc, CONFIG_FILENAME);
    if (_fs2.default.existsSync(configLoc)) {
      config = mergeConfig(config, readJSON(configLoc, _json2.default));
      sourceList.push(configLoc);
      seenConfig = true;
    }

    var pkgLoc = _path2.default.join(loc, PACKAGE_FILENAME);
    if (_fs2.default.existsSync(pkgLoc)) {
      config = mergeConfig(config, readJSON(pkgLoc, JSON)['reactdown']);
      sourceList.push(pkgLoc);
      seenPackage = true;
    }

    loc = _path2.default.dirname(loc);
  }
  return { config: config, sourceList: sourceList };
}

function parseConfigFromQuery(query) {
  var config = {};
  query = (0, _loaderUtils.parseQuery)(query);
  if (query.directives) {
    config.directives = query.directives;
  }
  if (query.roles) {
    config.roles = query.roles;
  }
  if (query.components) {
    config.components = query.components;
  }
  return config;
}

function toRenderConfig(config) {
  var renderConfig = {
    components: config.components,
    directives: mapObject(config.directives, function (config) {
      return config.render;
    }),
    roles: config.roles,
    model: mapObject(config.model, function (analyzer) {
      if (typeof analyzer === 'string') {
        return ComponentRef.resolve(analyzer);
      } else {
        return analyzer;
      }
    })
  };
  return renderConfig;
}

function toParseConfig(config) {
  var parseConfig = {
    directives: mapObject(config.directives, function (config) {
      return config.parse;
    })
  };
  return parseConfig;
}

function readJSON(loc) {
  var syntax = arguments.length <= 1 || arguments[1] === undefined ? JSON : arguments[1];

  return syntax.parse(_fs2.default.readFileSync(loc, { flag: 'r' }).toString('utf8'));
}

function mapObject(object, map) {
  var result = {};
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      var value = map(object[key]);
      if (value !== undefined) {
        result[key] = value;
      }
    }
  }
  return result;
}
