import React from "react";
import { DocumentContext, directives as defaultDirectives, components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
export default function Document({
  className,
  style
}) {
  return React.createElement(DocumentContext, {
    context: {
      meta
    }
  }, React.cloneElement(React.createElement(components.Root, null, React.createElement(components.Heading, {
    "level": 1
  }, "List"), React.createElement(components.UnorderedList, null, React.createElement(components.ListItem, null, React.createElement(components.Paragraph, null, React.createElement(components.Strong, null, "One"), ";")), React.createElement(components.ListItem, null, React.createElement(components.Paragraph, null, React.createElement(components.Emphasis, null, "Two"), ";")), React.createElement(components.ListItem, null, React.createElement(components.Paragraph, null, React.createElement(components.Strikethrough, null, "Three"), ".")), React.createElement(components.ListItem, null, React.createElement(components.Paragraph, null, "One;")), React.createElement(components.ListItem, null, React.createElement(components.Paragraph, null, "Two;"))), React.createElement(components.HTML, {
    "html": "<!--  -->"
  }), React.createElement(components.OrderedList, null, React.createElement(components.ListItem, null, React.createElement(components.Paragraph, null, "Four.")), React.createElement(components.ListItem, null, React.createElement(components.Paragraph, null, "Five.")), React.createElement(components.ListItem, null, React.createElement(components.Paragraph, null, "Loose:"), React.createElement(components.UnorderedList, null, React.createElement(components.ListItem, null, "Alpha;"), React.createElement(components.ListItem, null, "Bravo;"), React.createElement(components.ListItem, null, "Charlie."))), React.createElement(components.ListItem, null, React.createElement(components.Paragraph, null, "Loose 2:"), React.createElement(components.UnorderedList, null, React.createElement(components.ListItem, null, "Delta;"), React.createElement(components.ListItem, null, "Echo;"), React.createElement(components.ListItem, null, "Foxtrot.")))), React.createElement(components.Break, null), React.createElement(components.Code, null, "And a rule.\n")), {
    className,
    style
  }));
}
export let meta = {
  data: {},
  model: {
    "toc": [{
      "value": "List",
      "depth": 1
    }],
    "title": "List"
  }
};
