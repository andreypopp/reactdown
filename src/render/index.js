/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {MDASTRootNode, JSAST, JSASTFactory} from '../types';
import type {ComponentRef} from '../ComponentRef';
import type {RendererConfig} from './Renderer';

import * as build from 'babel-types';
import invariant from 'invariant';

import Renderer from './Renderer';
import buildJSON from './buildJSON';
import toc from '../model/toc';
import title from '../model/title';

type RenderPartsResult = {
  expression: JSAST;
  identifiersUsed: Array<JSAST>;
  metadata: ?JSON;
};

export type DirectiveConfig = ComponentRef;
export type RoleConfig = ComponentRef;

type ComponentMapping = {
  [name: string]: ComponentRef;
};

export type ModelConfig = {
  [attribute: string]: (node: MDASTRootNode) => any
};

type CompleteRenderConfig = {
  build: JSASTFactory;
  components: ?string;
  directives: ComponentMapping;
  roles: ComponentMapping;
  model: ModelConfig;
};

export type RenderConfig = $Shape<CompleteRenderConfig>;

const defaultRendererConfig: RendererConfig = {
  build: build,
  directives: {},
  roles: {},
};

const defaultRenderConfig: CompleteRenderConfig = {
  build: build,
  components: null,
  directives: {},
  roles: {},
  model: {toc, title},
};

function applyDefaultConfig<T: {directives: any; roles: any}>(config: T, defaultConfig: T): T {
  if (config !== defaultConfig) {
    config = {
      ...defaultConfig,
      ...config,
      directives: {
        ...defaultConfig.directives,
        ...config.directives,
      },
      roles: {
        ...defaultConfig.roles,
        ...config.roles,
      },
    };
  }
  return config;
}

function keyMirrorToJSAST(build, obj): {[name: string]: JSAST} {
  let result = {};
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      result[key] = build.stringLiteral(obj[key]);
    } else if (build.isNode(obj[key])) {
      result[key] = obj[key];
    } else {
      result[key] = build.identifier(key);
    }
  }
  return result;
}

export function renderToProgram(
    node: MDASTRootNode,
    config: RenderConfig = defaultRenderConfig): JSAST {
  config = applyDefaultConfig(config, defaultRenderConfig);
  let {build, components, directives, roles} = config;
  let rendererConfig = {
    build,
    directives: keyMirrorToJSAST(build, directives),
    roles: keyMirrorToJSAST(build, roles),
  };

  let {
    expression,
    identifiersUsed,
    metadata
  } = renderToParts(node, rendererConfig);

  let model = {};

  for (let attr in config.model) {
    if (config.model.hasOwnProperty(attr)) {
      model[attr] = config.model[attr](node);
    }
  }

  expression = expr`
    React.createElement(DocumentContext, {context: {metadata, model}},
      ${expression})
  `;

  let statements = stmt`
    export default function Document() {
      return ${expression};
    }
    export let metadata = ${buildJSON(build, metadata)};
    export let model = ${buildJSON(build, model)};
  `;

  identifiersUsed.forEach(identifier => {
    let spec = directives[identifier.name] || roles[identifier.name];
    invariant(
      spec !== undefined,
      'Cannot resolve identifier to spec'
    );
    if (typeof spec === 'string') {
      return;
    }
    if (spec.name === 'default') {
      statements.unshift(
        stmt`import ${identifier} from "${build.stringLiteral(spec.source)}"`
      );
    } else {
      statements.unshift(
        stmt`import { ${build.identifier(spec.name)} as ${identifier} } from "${build.stringLiteral(spec.source)}"`
      );
    }
  });

  let prelude = stmt`
    import React from "react";
    import {
      DocumentContext,
      directives as defaultDirectives,
      components as defaultComponents
    } from "reactdown/runtime";
  `;

  if (components) {
    prelude = prelude.concat(stmt`
      import * as customComponents from "${build.stringLiteral(components)}";
      let components = {...defaultComponents, ...customComponents};
    `);
  } else {
    prelude = prelude.concat(stmt`
      let components = defaultComponents;
    `);
  }

  return build.program(prelude.concat(statements));
}

export function renderToParts(
    node: MDASTRootNode,
    config: RendererConfig = defaultRendererConfig): RenderPartsResult {
  config = applyDefaultConfig(config, defaultRendererConfig);
  let renderer = new Renderer(config);
  renderer.render(node);
  invariant(
    renderer.expression != null,
    'Renderer should result in a not null expression after render() call'
  );
  return {
    expression: renderer.expression,
    identifiersUsed: renderer.identifiersUsed,
    metadata: renderer.metadata,
  };
}
