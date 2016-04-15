import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata
    }
  }, React.createElement("div", null, React.createElement("p", null, "Lots of entities are supported: ", " ", ", ", "&", ", ", "©", ", ", "Æ", ",\n", "Ď", ", ", "¾", ", ", "ℋ", ", ", "ⅆ", ",\n", "∲", ", &c.  Even some entities with a missing\nterminal semicolon are parsed correctly (as per the HTML5 spec):\n", "ÿ", ", ", "á", ", ", "©", ", and ", "&", "."), React.createElement("p", null, "However, &MadeUpEntities; are kept in the document."), React.createElement("p", null, "Entities even work in the language flag of fenced code blocks:"), React.createElement("code", null, "alert('Hello');\n"), React.createElement("p", null, "Or in ", React.createElement("a", {
    "href": "~/some%E2%80%94file",
    "title": "in some plæce"
  }, "l", "í", "nks")), React.createElement("p", null, "Or in ", React.createElement("img", {
    "src": "~/an%E2%80%93image.png",
    "alt": "ímages",
    "title": "© Someone"
  })), React.createElement("p", null, "But, entities are not interpreted in ", React.createElement("code", null, "inline c&ouml;de"), ", or in\ncode blocks:"), React.createElement("code", null, "C&Ouml;DE block.\n")));
}
export let metadata = null;
