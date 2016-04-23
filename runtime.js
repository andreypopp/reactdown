/**
 * @copyright 2016-present, Reactdown team
 */

// All modules used by compiled markdown files.
//
// When using webpack, you will probably want to import 'reactdown/runtime' in a
// vendor bundle to cut down on per-file weight.
module.exports.components = require('./components');
module.exports.DocumentContext = require('./DocumentContext').default;
