/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {Node} from 'validated/schema';
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
  maybe, string, enumeration, any,
  object, partialObject, mapping,
  ValidationError
} from 'validated/schema';
import {
  validate as validateJSON5
} from 'validated/json5';
import {
  parseQuery
} from 'loader-utils';

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

type CompleteConfig = {
  components: ?string;
  directives: DirectiveMapping;
  roles: RoleMapping;
  model: ModelConfig;
};

export type Config = $Shape<CompleteConfig>;

const CONFIG_FILENAME = '.reactdownrc';
const PACKAGE_FILENAME = 'package.json';

export const defaultConfig: CompleteConfig = {
  components: null,
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
};

export function mergeConfig(config: CompleteConfig, merge: ?Config): CompleteConfig {
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

export function findConfig(loc: string): {config: CompleteConfig, sourceList: Array<string>} {
  let seenConfig = false;
  let seenPackage = false;
  let config = defaultConfig;
  let sourceList = [];
  while (!(seenPackage && seenConfig) && loc !== path.dirname(loc)) {
    let configLoc = path.join(loc, CONFIG_FILENAME);
    if (fs.existsSync(configLoc)) {
      config = mergeConfig(config, readConfigSync(configLoc, createConfigSchema));
      sourceList.push(configLoc);
      seenConfig = true;
    }

    let pkgLoc = path.join(loc, PACKAGE_FILENAME);
    if (fs.existsSync(pkgLoc)) {
      config = mergeConfig(config, readConfigSync(pkgLoc, createConfigSchemaWithinPackageJSON));
      sourceList.push(pkgLoc);
      seenPackage = true;
    }

    loc = path.dirname(loc);
  }
  return {config, sourceList};
}

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

export function toRenderConfig(config: CompleteConfig): RenderConfig {
  let renderConfig = {
    components: config.components,
    directives: config.directives,
    roles: config.roles,
    model: mapValue(config.model, analyzer => {
      if (typeof analyzer === 'string') {
        return CodeRef.resolve(analyzer);
      } else {
        return analyzer;
      }
    }),
  };
  return renderConfig;
}

export function toParseConfig(config: CompleteConfig): ParseConfig {
  return config;
}

export function createConfigSchema(basedir: string): Node {
  let moduleReference = string.andThen(loc => path.resolve(basedir, loc));
  let directive = object({
    component: CodeRef.schema(basedir),
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
    data: maybe(any),
  });
  let schema = object({
    components: maybe(moduleReference),
    directives: maybe(mapping(directive)),
  });
  return schema;
}

function createConfigSchemaWithinPackageJSON(basedir: string): Node {
  return partialObject({
    reactdown: maybe(createConfigSchema(basedir)),
  }).andThen(pkg => pkg.reactdown);
}

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
