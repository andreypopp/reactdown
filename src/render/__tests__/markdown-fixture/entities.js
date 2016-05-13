import React from "react";
import { DocumentContext, directives as defaultDirectives, components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
export default function Document({
  className,
  style
}) {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.cloneElement(React.createElement(components.Root, null, React.createElement(components.Paragraph, null, "Lots of entities are supported: ", " ", ", ", "&", ", ", "©", ", ", "Æ", ",\n", "Ď", ", ", "¾", ", ", "ℋ", ", ", "ⅆ", ",\n", "∲", ", &c.  Even some entities with a missing\nterminal semicolon are parsed correctly (as per the HTML5 spec):\n", "ÿ", ", ", "á", ", ", "©", ", and ", "&", "."), React.createElement(components.Paragraph, null, "However, &MadeUpEntities; are kept in the document."), React.createElement(components.Paragraph, null, "Entities even work in the language flag of fenced code blocks:"), React.createElement(components.Code, null, "alert('Hello');\n"), React.createElement(components.Paragraph, null, "Or in ", React.createElement(components.Link, {
    "href": "~/some%E2%80%94file",
    "title": "in some plæce"
  }, "l", "í", "nks")), React.createElement(components.Paragraph, null, "Or in ", React.createElement(components.Image, {
    "src": "~/an%E2%80%93image.png",
    "alt": "ímages",
    "title": "© Someone"
  })), React.createElement(components.Paragraph, null, "But, entities are not interpreted in ", React.createElement(components.InlineCode, null, "inline c&ouml;de"), ", or in\ncode blocks:"), React.createElement(components.Code, null, "C&Ouml;DE block.\n")), {
    className,
    style
  }));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
