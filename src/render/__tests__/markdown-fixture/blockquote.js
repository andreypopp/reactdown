import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as elements from "reactdown/lib/elements";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata
    }
  }, React.createElement(elements.Root, null, React.createElement(elements.Heading, {
    "level": 1
  }, "Block Quote"), React.createElement(elements.Blockquote, null, React.createElement(elements.UnorderedList, null, React.createElement(elements.ListItem, null, React.createElement(elements.Code, null, "code.in.a.list();\n")), React.createElement(elements.ListItem, null, React.createElement(elements.Paragraph, null, "Paragraph.")), React.createElement(elements.ListItem, null, React.createElement(elements.Paragraph, null, "Normal list"), React.createElement(elements.Paragraph, null, "Paragraph."))))));
}
export let metadata = null;
