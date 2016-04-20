import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultElements from "reactdown/lib/elements";
import * as customElements from "reactdown/lib/elements";
let elements = { ...defaultElements, ...customElements };
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(elements.Root, null, null, React.createElement(elements.Heading, {
    "level": 1
  }, "Hello world")));
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
