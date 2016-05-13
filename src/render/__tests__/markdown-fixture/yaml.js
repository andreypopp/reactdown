import React from "react";
import { DocumentContext, directives as defaultDirectives, components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
export default function Document({
  className,
  style
}) {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.cloneElement(React.createElement(components.Root, null, null, React.createElement(components.Heading, {
    "level": 1
  }, "Hello world")), {
    className,
    style
  }));
}
export let metadata = {
  "YAML": "cool"
};
export let model = {
  "toc": [{
    "value": "Hello world",
    "depth": 1
  }],
  "title": "Hello world"
};
