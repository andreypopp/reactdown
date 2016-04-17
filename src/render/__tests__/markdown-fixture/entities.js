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
  }, React.createElement(elements.Root, null, React.createElement(elements.Paragraph, null, "Lots of entities are supported: ", " ", ", ", "&", ", ", "©", ", ", "Æ", ",\n", "Ď", ", ", "¾", ", ", "ℋ", ", ", "ⅆ", ",\n", "∲", ", &c.  Even some entities with a missing\nterminal semicolon are parsed correctly (as per the HTML5 spec):\n", "ÿ", ", ", "á", ", ", "©", ", and ", "&", "."), React.createElement(elements.Paragraph, null, "However, &MadeUpEntities; are kept in the document."), React.createElement(elements.Paragraph, null, "Entities even work in the language flag of fenced code blocks:"), React.createElement(elements.Code, null, "alert('Hello');\n"), React.createElement(elements.Paragraph, null, "Or in ", React.createElement(elements.Link, {
    "href": "~/some%E2%80%94file",
    "title": "in some plæce"
  }, "l", "í", "nks")), React.createElement(elements.Paragraph, null, "Or in ", React.createElement(elements.Image, {
    "src": "~/an%E2%80%93image.png",
    "alt": "ímages",
    "title": "© Someone"
  })), React.createElement(elements.Paragraph, null, "But, entities are not interpreted in ", React.createElement(elements.InlineCode, null, "inline c&ouml;de"), ", or in\ncode blocks:"), React.createElement(elements.Code, null, "C&Ouml;DE block.\n")));
}
export let metadata = null;
