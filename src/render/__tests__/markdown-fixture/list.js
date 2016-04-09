import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import { HTML } from "reactdown/lib/elements";
export default function Document() {
  return React.createElement(DocumentContext, {
    "context": {
      "metadata": metadata
    }
  }, React.createElement("div", null, React.createElement("h1", "List"), React.createElement("ul", null, React.createElement("li", null, React.createElement("p", null, React.createElement("strong", null, "One"), ";")), React.createElement("li", null, React.createElement("p", null, React.createElement("em", null, "Two"), ";")), React.createElement("li", null, React.createElement("p", null, React.createElement("del", null, "Three"), ".")), React.createElement("li", null, React.createElement("p", null, "One;")), React.createElement("li", null, React.createElement("p", null, "Two;"))), React.createElement(HTML, {
    "html": "<!--  -->"
  }), React.createElement("ol", null, React.createElement("li", null, React.createElement("p", null, "Four.")), React.createElement("li", null, React.createElement("p", null, "Five.")), React.createElement("li", null, React.createElement("p", null, "Loose:"), React.createElement("ul", null, React.createElement("li", null, "Alpha;"), React.createElement("li", null, "Bravo;"), React.createElement("li", null, "Charlie."))), React.createElement("li", null, React.createElement("p", null, "Loose 2:"), React.createElement("ul", null, React.createElement("li", null, "Delta;"), React.createElement("li", null, "Echo;"), React.createElement("li", null, "Foxtrot.")))), React.createElement("br", null), React.createElement("code", null, "And a rule.\n")));
}
export let metadata = null;
