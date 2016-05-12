import React from "react";
import { DocumentContext, directives as defaultDirectives, components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
import { Pre } from "lib";
export default function Document({
  className,
  style
}) {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.cloneElement(React.createElement(components.Root, null, React.createElement(components.Paragraph, null, "Hello,"), React.createElement(Pre, null, "ok, *this* is **just** some code"), React.createElement(components.Paragraph, null, "Bye")), {
    className,
    style
  }));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
