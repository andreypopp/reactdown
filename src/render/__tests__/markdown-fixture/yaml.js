import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as elements from "reactdown/lib/elements";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata
    }
  }, React.createElement(elements.Root, null, null, React.createElement(elements.Heading, {
    "level": 1
  }, "Hello world")));
}
export let metadata = {
  "YAML": "cool"
};
