/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import indentString from 'indent-string';
import {renderToString} from './index';
import {
  findConfig,
  mergeConfig,
  parseConfigFromQuery,
  ValidationError
} from './Config';

/**
 * Webpack loader for reactdown documents.
 */
function reactdown(source: string): ?string {
  this.cacheable();

  let compiler = this._compiler;

  // We read the config once. That means on changes to config one must restart
  // the compiler.
  //
  // TODO: Improve on that, so changes to configration do not require restarting
  // Webpack compiler.
  if (compiler.__reactdownConfig === undefined) {
    try {
      compiler.__reactdownConfig = findConfig(compiler.context).config;
    } catch (error) {
      if (error instanceof ValidationError) {
        this.emitError(formatConfigurationError(error));
        return;
      }
      throw error;
    }
  }

  let config = mergeConfig(
    compiler.__reactdownConfig,
    parseConfigFromQuery(this.query)
  );

  let code;
  try {
    code = renderToString(source, config).code;
  } catch (error) {
    // TODO: this is a hackyway how we distinguish errors from parser
    if (error.ruleId !== undefined) {
      this.emitError(formatSyntaxError(error));
    } else {
      throw error;
    }
  }
  return code;
}

function formatSyntaxError(error) {
  let message = error.message || error;
  if (error.line !== undefined && error.column !== undefined) {
    message = `${message} at line ${error.line} column ${error.column}`;
  }
  return message;
}

function formatConfigurationError(error) {
  return 'Invalid reactdown configuration:\n' + indentString(error.message, '  ', 1);
}

module.exports = reactdown;
