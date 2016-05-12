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
  }, React.cloneElement(React.createElement(components.Root, null, React.createElement(components.Paragraph, null, "Hello", React.createElement(components.Break, null), "world"), React.createElement(components.Break, null), React.createElement(components.Paragraph, null, React.createElement(components.Image, {
    "src": "http://exaple.com/fav.ico",
    "alt": "Favicon",
    "title": "Example Favicon"
  }))), {
    className,
    style
  }));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
