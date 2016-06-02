/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {MDASTRootNode, JSAST} from '../types';
import type {CodeRef} from '../CodeRef';
import type {Buildable} from './buildJSON';

import * as build from 'babel-types';
import {stmt} from 'babel-plugin-ast-literal/api';
import invariant from 'invariant';

import {render as renderNode} from './Renderer';
import {mapValue} from '../utils';

export type DirectiveConfig = {
  component: CodeRef;
};
export type RoleConfig = {
  component: CodeRef;
};

export type ModelConfig = {
  [attribute: string]: (node: MDASTRootNode) => any
};

export type RenderConfig = {
  defaultComponents?: string;
  components?: string;
  directives: {[name: string]: DirectiveConfig};
  roles: {[name: string]: RoleConfig};
  model: ModelConfig;
  buildImageURL: (url: string) => Buildable;
};

function mapToJSAST(obj): {[name: string]: JSAST} {
  return mapValue(obj, (value, key) => {
    if (build.isNode(value.component)) {
      return value.component;
    } else if (typeof value === 'string') {
      return build.stringLiteral(value.component);
    } else {
      return build.identifier(key);
    }
  });
}

export function renderToProgram(node: MDASTRootNode, config: RenderConfig): JSAST {
  let {defaultComponents, components, directives, roles} = config;
  let rendererConfig = {
    directives: mapToJSAST(directives),
    roles: mapToJSAST(roles),
    buildImageURL: config.buildImageURL,
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

  let statements = stmt`
    export default function Document({className, style}) {
      return React.createElement(DocumentContext,
        {context: {meta}},
        React.cloneElement(${expression}, {className, style}));
    }
    export let meta = {
      data: ${metadata},
      model: ${model},
    };
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
        stmt`import ${identifier} from "${component.source}"`
      );
    } else {
      statements.unshift(
        stmt`import { ${build.identifier(component.name)} as ${identifier} } from "${component.source}"`
      );
    }
  });

  let prelude = stmt`
    import React from "react";
    import {
      DocumentContext,
      directives as defaultDirectives
    } from "reactdown/runtime";
  `;

  if (defaultComponents) {
    prelude = prelude.concat(stmt`
      import * as defaultComponents from "${defaultComponents}";
    `);
  } else {
    prelude = prelude.concat(stmt`
      import {components as defaultComponents} from "reactdown/runtime";
    `);
  }

  if (components) {
    prelude = prelude.concat(stmt`
      import * as customComponents from "${components}";
      let components = {...defaultComponents, ...customComponents};
    `);
  } else {
    prelude = prelude.concat(stmt`
      let components = defaultComponents;
    `);
  }

  return build.program(prelude.concat(statements));
}
