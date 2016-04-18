/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
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

type RenderPartsResult = {
  expression: JSAST;
  identifiersUsed: Array<JSAST>;
  metadata: ?JSON;
};

export type DirectiveConfig = ComponentRef;

type DirectiveMapping = {
  [name: string]: ComponentRef;
};

type CompleteRenderConfig = {
  build: JSASTFactory;
  elements: string;
  directives: DirectiveMapping;
  model: {[attribute: string]: (node: MDASTRootNode) => any};
};

export type RenderConfig = $Shape<CompleteRenderConfig>;

const defaultRendererConfig: RendererConfig = {
  build: build,
  directives: {},
};

function directive(name: string): ComponentRef {
  return {source: `reactdown/lib/directives/${name}`, name: 'default'};
}

const defaultRenderConfig: CompleteRenderConfig = {
  build: build,
  elements: 'reactdown/lib/elements',
  directives: {
    'meta': directive('meta'),
  },
  model: {toc},
};

function applyDefaultConfig<T: {directives: Object}>(config: T, defaultConfig: T): T {
  if (config !== defaultConfig) {
    config = {
      ...defaultConfig,
      ...config,
      directives: {
        ...defaultConfig.directives,
        ...config.directives,
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
  let {build, elements, directives} = config;
  let rendererConfig = {
    build,
    directives: keyMirrorToJSAST(build, directives),
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
    let spec = directives[identifier.name];
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

  statements = stmt`
    import React from "react";
    import DocumentContext from "reactdown/lib/DocumentContext";
    import * as defaultElements from "reactdown/lib/elements";
    import * as customElements from "${build.stringLiteral(elements)}";

    let elements = {...defaultElements, ...customElements};
  `.concat(statements);

  return build.program(statements);
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
