import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata
    }
  }, React.createElement("div", null, null, React.createElement("h1", "Hello world")));
}
export let metadata = {
  "YAML": "cool"
};
