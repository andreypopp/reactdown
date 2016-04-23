import React from "react";
import { DocumentContext, directives as defaultDirectives, components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(components.Root, null, React.createElement(components.HTML, {
    "html": "<h1>Alpha</h1>"
  }), React.createElement(components.Paragraph, null, React.createElement(components.HTML, {
    "html": "<strong>"
  }), "Foo", React.createElement(components.HTML, {
    "html": "</strong>"
  }), " ", React.createElement(components.HTML, {
    "html": "<em>"
  }), "bar", React.createElement(components.HTML, {
    "html": "</em>"
  }), " ", React.createElement(components.HTML, {
    "html": "<sup>"
  }), "baz", React.createElement(components.HTML, {
    "html": "</sup>"
  }), " ", React.createElement(components.HTML, {
    "html": "<sub>"
  }), "qux", React.createElement(components.HTML, {
    "html": "</sub>"
  }), ".")));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
