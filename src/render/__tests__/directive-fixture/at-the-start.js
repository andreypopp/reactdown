import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultElements from "reactdown/lib/elements";
import * as customElements from "reactdown/lib/elements";
let elements = { ...defaultElements, ...customElements };
import { Block } from "lib";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(elements.Root, null, React.createElement(Block, null, React.createElement(elements.Paragraph, null, "Hello")), React.createElement(elements.Paragraph, null, "Bye!")));
}
export let metadata = null;
export let model = {
  "toc": [],
  "title": null
};
