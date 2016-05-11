/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import generate from 'babel-generator';
import loaderUtils from 'loader-utils';
import parse from './parse';
import visit from 'unist-util-visit';
import {renderToProgram} from './render';
import {
  findConfig,
  mergeConfig,
  parseConfigFromQuery,
  toParseConfig,
  toRenderConfig
} from './Config';

/**
 * Webpack loader for reactdown documents.
 */
function reactdown(source: string): string {
  this.cacheable();

  let config = completeConfig(this._compiler, this.query);

  let mdast = toMDAST(config, source);
  resolveImages(config, this, mdast); // Mutates mdast.

  let jsast = toJSAST(config, mdast);
  let compiledSource = toSource(jsast);
  return unwrapUrls(compiledSource);
}

function completeConfig(compiler, query) {
  // We read the config once. That means on changes to config one must restart
  // the compiler.
  //
  // TODO: Improve on that, so changes to configration do not require restarting
  // Webpack compiler.
  if (compiler.__reactdownConfig === undefined) {
    // TODO: Error handling
    // https://github.com/andreypopp/reactdown/pull/16/files#diff-821a16d38cf4ff69edc6b5b48313aa0bR67
    compiler.__reactdownConfig = findConfig(compiler.context).config;
  }

  return mergeConfig(
    compiler.__reactdownConfig,
    parseConfigFromQuery(query)
  );
}

function toMDAST(config, source) {
  let parseConfig = toParseConfig(config);
  // TODO: Error handling
  // https://github.com/andreypopp/reactdown/pull/16/files#diff-821a16d38cf4ff69edc6b5b48313aa0bR49
  return parse(source, parseConfig);
}

// Please note: This mutates the URL of any images in the MDAST!
function resolveImages(config, loader, mdast) {
  visit(mdast, 'image', (image) => {
    // Ignore remote URLs, either `scheme://` or `//`
    if (/^[^\/]+\/\//.test(image.url)) return;
    image.url = wrapUrl(loaderUtils.urlToRequest(image.url));
  });
}

function toJSAST(config, mdast) {
  let renderConfig = toRenderConfig(config);
  // TODO: Error handling
  // ???
  return renderToProgram(mdast, renderConfig);
}

function toSource(jsast) {
  return generate(jsast, {
    compact: false,
    concise: false
  }).code;
}

// Webpack loaders can't resolve downstream loaders inline.  Instead, they're
// expected to emit calls to `require()`.  In order to avoid jumping through
// JSAST hoops, we transform URLs in the MDAST, and then find/replace them with
// require statements in the generated source.  This is the same strategy
// employed by Webpack's css-loader.
function wrapUrl(url) {
  return `___RD_URL___${url}___END_RD_URL___`;
}

function unwrapUrls(source) {
  return source.replace(new RegExp('"___RD_URL___([^"]+)___END_RD_URL___"', 'g'), (_match, resolvedPath) => {
    return `require("${resolvedPath}")`;
  });
}

module.exports = reactdown;
