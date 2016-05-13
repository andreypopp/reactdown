import React from "react";
import { DocumentContext, directives as defaultDirectives, components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
import { DataChildren } from "lib";
export default function Document({
  className,
  style
}) {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.cloneElement(React.createElement(components.Root, null, React.createElement(components.Paragraph, null, "Prologue"), React.createElement(DataChildren, {
    "a": 1,
    "b": 2
  }, React.createElement(components.Paragraph, null, "Ok, ", React.createElement(components.Emphasis, null, "some"), " paragraph."))), {
    className,
    style
  }));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
