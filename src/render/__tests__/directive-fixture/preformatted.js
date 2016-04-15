import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as elements from "reactdown/lib/elements";
import pre from "lib/pre";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata
    }
  }, React.createElement(elements.Root, null, React.createElement(elements.Paragraph, null, "Hello,"), React.createElement(pre, null, React.createElement(elements.Paragraph, null, "ok, ", React.createElement(elements.Emphasis, null, "this"), " is ", React.createElement(elements.Strong, null, "just"), " some code")), React.createElement(elements.Paragraph, null, "Bye")));
}
export let metadata = null;
