/**
 * @copyright 2016-present, Reactdown team
 * @flow
 */

import {parseQuery} from 'loader-utils';
import {renderToString} from './index';

module.exports = function reactdown(source: string): string {
  this.cacheable();
  let query = parseQuery(this.query);
  let config = {
    directives: query.directives || {},
    elements: query.elements || {},
  };
  return renderToString(source, config).code;
}
