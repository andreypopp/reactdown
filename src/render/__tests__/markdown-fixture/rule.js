import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
export default function Document() {
  return React.createElement(DocumentContext, {
    "context": {
      "metadata": metadata
    }
  }, React.createElement("div", null, React.createElement("h1", "Horizontal Rules"), React.createElement("br", null), React.createElement("br", null), React.createElement("br", null)));
}
export let metadata = null;
