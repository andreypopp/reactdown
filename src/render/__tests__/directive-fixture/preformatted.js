import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultElements from "reactdown/lib/elements";
import * as customElements from "reactdown/lib/elements";
let elements = { ...defaultElements, ...customElements };
import pre from "lib/pre";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(elements.Root, null, React.createElement(elements.Paragraph, null, "Hello,"), React.createElement(pre, null, "ok, *this* is **just** some code"), React.createElement(elements.Paragraph, null, "Bye")));
}
export let metadata = null;
export let model = {
  "toc": [],
  "title": null
};
