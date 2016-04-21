/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import {renderToString} from './index';
import {
  findConfig,
  mergeConfig,
  parseConfigFromQuery
} from './Config';

/**
 * Webpack loader for reactdown documents.
 */
function reactdown(source: string): string {
  this.cacheable();

  let compiler = this._compiler;

  // We read the config once. That means on changes to config one must restart
  // the compiler.
  //
  // TODO: Improve on that, so changes to configration do not require restarting
  // Webpack compiler.
  if (compiler.__reactdownConfig === undefined) {
    compiler.__reactdownConfig = findConfig(compiler.context).config;
  }

  let config = mergeConfig(
    compiler.__reactdownConfig,
    parseConfigFromQuery(this.query)
  );

  return renderToString(source, config).code;
}

module.exports = reactdown;
