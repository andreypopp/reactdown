import React from "react";
import { DocumentContext, directives as defaultDirectives } from "reactdown/runtime";
import { components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
export default function Document({
  className,
  style
}) {
  return React.createElement(DocumentContext, {
    context: {
      meta
    }
  }, React.cloneElement(React.createElement(components.Root, null, React.createElement(components.Heading, {
    "level": 1,
    "name": "Horizontal-Rules"
  }, "Horizontal Rules"), React.createElement(components.Break, null), React.createElement(components.Break, null), React.createElement(components.Break, null)), {
    className,
    style
  }));
}
export let meta = {
  data: {},
  model: {
    "toc": [{
      "title": "Horizontal Rules",
      "name": "Horizontal-Rules",
      "depth": 1
    }],
    "title": "Horizontal Rules"
  }
};
