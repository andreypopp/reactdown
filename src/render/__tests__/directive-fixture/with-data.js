import React from "react";
import { DocumentContext, directives as defaultDirectives, components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
import { Data } from "lib";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(components.Root, null, React.createElement(components.Paragraph, null, "Prologue"), React.createElement(Data, {
    "a": 1,
    "b": [1, 2, 3],
    "c": {
      "d": 4
    }
  })));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
