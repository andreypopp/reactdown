import React from "react";
import { DocumentContext, directives as defaultDirectives, components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
import { Block } from "lib";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(components.Root, null, React.createElement(components.Paragraph, null, "Prologue"), React.createElement(Block, {
    "a": 1,
    "b": 2
  }, React.createElement(components.Paragraph, null, "Ok, ", React.createElement(components.Emphasis, null, "some"), " paragraph."))));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
