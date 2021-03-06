/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {Node} from 'validated/schema';
import type {Buildable} from './render/buildJSON';
import type {
  ParseConfig,
  DirectiveConfig as DirectiveParseConfig
} from './parse';
import type {
  RenderConfig,
  DirectiveConfig as DirectiveRenderConfig,
  RoleConfig as RoleRenderConfig,
  ModelConfig as ModelRenderConfig
} from './render';

import fs from 'fs';
import path from 'path';
import {
  maybe, enumeration,
  object, partialObject, mapping,
  ValidationError
} from 'validated/schema';
import {schema as schemaSchema} from 'validated/repr';
import {validate as validateJSON5} from 'validated/json5';
import {
  parseQuery
} from 'loader-utils';
import {expr} from 'babel-plugin-ast-literal/api';

import * as model from './model';
import * as CodeRef from './CodeRef';
import {
  filterUndefined,
  mapValue
} from './utils';

export {ValidationError} from 'validated/schema';

type ModelConfig
  // $FlowIssue: report it
  = {[attribute: string]: string}
  | ModelRenderConfig;

type DirectiveConfig = $Shape<DirectiveRenderConfig & DirectiveParseConfig>;

type DirectiveMapping = {
  [name: string]: DirectiveConfig;
};

type RoleMapping = {
  [name: string]: RoleRenderConfig;
};

export type Config = {
  defaultComponents?: string;
  components?: string;
  directives?: DirectiveMapping;
  roles?: RoleMapping;
  model?: ModelConfig;
  buildImageURL?: (url: string) => Buildable;
};

const CONFIG_FILENAME = '.reactdownrc';
const PACKAGE_FILENAME = 'package.json';

export const defaultConfig: Config = {
  directives: {
    ref: {
      component: expr`defaultDirectives.ref`,
      line: 'required'
    },
    meta: {
      component: expr`defaultDirectives.meta`,
    },
  },
  roles: {},
  model: model,
  buildImageURL: url => url,
};

export function mergeConfig(config: Config, merge: ?Config): Config {
  if (!merge) {
    return config;
  }
  merge = filterUndefined(merge);
  return {
    ...config,
    ...merge,
    directives: {
      ...config.directives,
      ...merge.directives,
    },
    roles: {
      ...config.roles,
      ...merge.roles,
    },
    model: {
      ...config.model,
      ...merge.model,
    },
  };
}

/**
 * Discover config for a directory `dirname`.
 */
export function discoverConfig(dirname: string): {config: Config, sourceList: Array<string>} {
  let seenConfig = false;
  let seenPackage = false;
  let config = defaultConfig;
  let sourceList = [];
  while (!(seenPackage && seenConfig) && dirname !== path.dirname(dirname)) {
    let configLoc = path.join(dirname, CONFIG_FILENAME);
    if (fs.existsSync(configLoc)) {
      config = mergeConfig(config, readConfigSync(configLoc, createConfigSchema));
      sourceList.push(configLoc);
      seenConfig = true;
    }

    let pkgLoc = path.join(dirname, PACKAGE_FILENAME);
    if (fs.existsSync(pkgLoc)) {
      config = mergeConfig(config, readConfigSync(pkgLoc, createConfigSchemaWithinPackageJSON));
      sourceList.push(pkgLoc);
      seenPackage = true;
    }

    dirname = path.dirname(dirname);
  }
  return {config, sourceList};
}

/**
 * Parse config out of query string.
 */
export function parseConfigFromQuery(query: string): Config {
  let config = {};
  query = parseQuery(query);
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

/**
 * Convert config to render config.
 *
 * @private
 */
export function toRenderConfig(config: Config): RenderConfig {
  let renderConfig = {
    defaultComponents: config.defaultComponents,
    components: config.components,
    directives: config.directives || {},
    roles: config.roles || {},
    model: mapValue(config.model || {}, analyzer => {
      if (typeof analyzer === 'string') {
        return CodeRef.resolve(analyzer);
      } else {
        return analyzer;
      }
    }),
    buildImageURL: config.buildImageURL || (url => url),
  };
  return renderConfig;
}

/**
 * Convert config to parse config.
 *
 * @private
 */
export function toParseConfig(config: Config): ParseConfig {
  return {
    directives: config.directives || {},
  };
}

function createConfigSchema(basedir: string): Node {
  let codeRef = CodeRef.schema(basedir);
  let role = object({
    component: codeRef,
  });
  let directive = object({
    component: codeRef,
    line: maybe(enumeration(
      'required',
      'optional',
    )),
    children: maybe(enumeration(
      'required',
      'required-preformatted',
      'optional',
      'optional-preformatted',
    )),
    data: maybe(schemaSchema),
  });
  let schema = object({
    components: maybe(codeRef.andThen(ref => ref.source)),
    directives: maybe(mapping(directive)),
    roles: maybe(mapping(role)),
  });
  return schema;
}

function createConfigSchemaWithinPackageJSON(basedir: string): Node {
  return partialObject({
    reactdown: maybe(createConfigSchema(basedir)),
  }).andThen(pkg => pkg.reactdown);
}

/**
 * React config from `filename`.
 */
export function readConfigSync(
    filename: string,
    schemaFactory: (filename: string) => Node = createConfigSchema) {
  let basedir = path.dirname(filename);
  let schema = schemaFactory(basedir);
  let source = fs.readFileSync(filename, {flag: 'r'}).toString('utf8');
  try {
    return validateJSON5(schema, source);
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error.withContext(`While reading configuration from ${filename}`);
    } else {
      throw error;
    }
  }
}
