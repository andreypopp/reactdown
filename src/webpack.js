/**
 * @copyright 2016-present, Reactdown team
 * @flow
 */

import {renderToString} from './index';
import {findConfig, mergeConfig, parseConfigFromQuery} from './Config';

module.exports = function reactdown(source: string): string {
  this.cacheable();
  let compiler = this._compiler;
  if (compiler.__reactdownConfig === undefined) {
    compiler.__reactdownConfig = findConfig(compiler.context).config;
  }
  let config = mergeConfig(
    compiler.__reactdownConfig,
    parseConfigFromQuery(this.query)
  );
  return renderToString(source, config).code;
};
