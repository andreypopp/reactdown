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

  let code;
  try {
    code = renderToString(source, config).code;
  } catch(error) {
    this.emitError(formatError(error));
  }
  return code;
}

function formatError(error) {
  let message = error.message || error;
  if (error.line !== undefined && error.column !== undefined) {
    message = `${message} at line ${error.line} column ${error.column}`;
  }
  return message;
}

module.exports = reactdown;
