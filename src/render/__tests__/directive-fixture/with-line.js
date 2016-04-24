import React from "react";
import { DocumentContext, directives as defaultDirectives, components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
import { Line } from "lib";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(components.Root, null, React.createElement(components.Paragraph, null, "Ok"), React.createElement(Line, {
    "line": "some-ref"
  }), React.createElement(components.Paragraph, null, "wow")));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
