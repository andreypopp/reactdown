/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {MDASTRootNode, JSAST, JSASTFactory} from '../types';
import type {ComponentRef} from '../ComponentRef';

import * as build from 'babel-types';
import invariant from 'invariant';

import {render as renderNode} from './Renderer';
import buildJSON from './buildJSON';
import toc from '../model/toc';
import title from '../model/title';
import {mapValue} from '../utils';

export type DirectiveConfig = {
  component: ComponentRef;
};
export type RoleConfig = {
  component: ComponentRef;
};

export type ModelConfig = {
  [attribute: string]: (node: MDASTRootNode) => any
};

type CompleteRenderConfig = {
  build: JSASTFactory;
  components: ?string;
  directives: {[name: string]: DirectiveConfig};
  roles: {[name: string]: RoleConfig};
  model: ModelConfig;
};

export type RenderConfig = $Shape<CompleteRenderConfig>;

const defaultRenderConfig: CompleteRenderConfig = {
  build: build,
  components: null,
  directives: {},
  roles: {},
  model: {toc, title},
};

function applyDefaultConfig(config: RenderConfig, defaultConfig: CompleteRenderConfig): CompleteRenderConfig {
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

function mapToJSAST(build, obj): {[name: string]: JSAST} {
  return mapValue(obj, (value, key) => {
    if (build.isNode(value.component)) {
      return value;
    } else if (typeof value === 'string') {
      return build.stringLiteral(value.component);
    } else {
      return build.identifier(key);
    }
  });
}

export function renderToProgram(
    node: MDASTRootNode,
    config: RenderConfig = defaultRenderConfig): JSAST {
  config = applyDefaultConfig(config, defaultRenderConfig);
  let {build, components, directives, roles} = config;
  let rendererConfig = {
    build,
    directives: mapToJSAST(build, directives),
    roles: mapToJSAST(build, roles),
  };

  let {
    expression,
    identifiersUsed,
    metadata
  } = renderNode(node, rendererConfig);

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
    let component = spec.component;
    if (typeof component === 'string') {
      return;
    }
    if (component.name === 'default') {
      statements.unshift(
        stmt`import ${identifier} from "${build.stringLiteral(component.source)}"`
      );
    } else {
      statements.unshift(
        stmt`import { ${build.identifier(component.name)} as ${identifier} } from "${build.stringLiteral(component.source)}"`
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
