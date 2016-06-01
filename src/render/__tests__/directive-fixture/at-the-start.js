import React from "react";
import { DocumentContext, directives as defaultDirectives } from "reactdown/runtime";
import { components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
import { Children } from "lib";
export default function Document({
  className,
  style
}) {
  return React.createElement(DocumentContext, {
    context: {
      meta
    }
  }, React.cloneElement(React.createElement(components.Root, null, React.createElement(Children, null, React.createElement(components.Paragraph, null, "Hello")), React.createElement(components.Paragraph, null, "Bye!")), {
    className,
    style
  }));
}
export let meta = {
  data: {},
  model: {
    "toc": [],
    "title": null
  }
};
