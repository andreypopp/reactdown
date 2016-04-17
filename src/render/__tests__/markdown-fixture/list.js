import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultElements from "reactdown/lib/elements";
import * as customElements from "reactdown/lib/elements";
let elements = { ...defaultElements, ...customElements };
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata
    }
  }, React.createElement(elements.Root, null, React.createElement(elements.Heading, {
    "level": 1
  }, "List"), React.createElement(elements.UnorderedList, null, React.createElement(elements.ListItem, null, React.createElement(elements.Paragraph, null, React.createElement(elements.Strong, null, "One"), ";")), React.createElement(elements.ListItem, null, React.createElement(elements.Paragraph, null, React.createElement(elements.Emphasis, null, "Two"), ";")), React.createElement(elements.ListItem, null, React.createElement(elements.Paragraph, null, React.createElement(elements.Strikethrough, null, "Three"), ".")), React.createElement(elements.ListItem, null, React.createElement(elements.Paragraph, null, "One;")), React.createElement(elements.ListItem, null, React.createElement(elements.Paragraph, null, "Two;"))), React.createElement(elements.HTML, {
    "html": "<!--  -->"
  }), React.createElement(elements.OrderedList, null, React.createElement(elements.ListItem, null, React.createElement(elements.Paragraph, null, "Four.")), React.createElement(elements.ListItem, null, React.createElement(elements.Paragraph, null, "Five.")), React.createElement(elements.ListItem, null, React.createElement(elements.Paragraph, null, "Loose:"), React.createElement(elements.UnorderedList, null, React.createElement(elements.ListItem, null, "Alpha;"), React.createElement(elements.ListItem, null, "Bravo;"), React.createElement(elements.ListItem, null, "Charlie."))), React.createElement(elements.ListItem, null, React.createElement(elements.Paragraph, null, "Loose 2:"), React.createElement(elements.UnorderedList, null, React.createElement(elements.ListItem, null, "Delta;"), React.createElement(elements.ListItem, null, "Echo;"), React.createElement(elements.ListItem, null, "Foxtrot.")))), React.createElement(elements.Break, null), React.createElement(elements.Code, null, "And a rule.\n")));
}
export let metadata = null;
