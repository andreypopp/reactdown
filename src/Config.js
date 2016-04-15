/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {DirectiveConfig as DirectiveParseConfig} from './parse';
import type {DirectiveConfig as DirectiveRenderConfig} from './render';

import fs from 'fs';
import path from 'path';
import JSON5 from 'json5';
import {parseQuery} from 'loader-utils';

export type DirectiveConfig = DirectiveParseConfig & DirectiveRenderConfig;

export type DirectiveMapping = {
  [name: string]: DirectiveConfig;
};

export type CompleteConfig = {
  directives: ?DirectiveMapping;
};

export type Config = $Shape<CompleteConfig>;

const CONFIG_FILENAME = '.reactdownrc';
const PACKAGE_FILENAME = 'package.json';

export const defaultConfig: CompleteConfig = {
  directives: {},
};

export function mergeConfig(config: CompleteConfig, merge: ?Config): CompleteConfig {
  if (!merge) {
    return config;
  }
  return {
    ...config,
    ...merge,
    directives: {
      ...config.directives,
      ...merge.directives,
    }
  };
}

export function findConfig(loc: string): {config: CompleteConfig, sourceList: Array<string>} {
  let seenConfig = false;
  let seenPackage = false;
  let config = defaultConfig;
  let sourceList = [];
  while (!(seenPackage && seenConfig) && loc !== path.dirname(loc)) {
    let configLoc = path.join(loc, CONFIG_FILENAME);
    if (fs.existsSync(configLoc)) {
      config = mergeConfig(config, readJSON(configLoc, JSON5));
      sourceList.push(configLoc);
      seenConfig = true;
    }

    let pkgLoc = path.join(loc, PACKAGE_FILENAME);
    if (fs.existsSync(pkgLoc)) {
      config = mergeConfig(config, readJSON(pkgLoc, JSON)['reactdown']);
      sourceList.push(pkgLoc);
      seenPackage = true;
    }

    loc = path.dirname(loc);
  }
  return {config, sourceList};
}

export function parseConfigFromQuery(query: string): CompleteConfig {
  query = parseQuery(query);
  return {
    directives: query.directives || {},
    elements: query.elements || 'reactdown/lib/elements',
  };
}

function readJSON(loc, syntax = JSON) {
  return syntax.parse(fs.readFileSync(loc, {flag: 'r'}).toString('utf8'));
}

