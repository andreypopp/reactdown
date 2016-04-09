import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import { heading } from "reactdown/lib/elements";
export default function Document() {
  return React.createElement(DocumentContext, {
    "metadata": metadata
  }, React.createElement("div", null, null, React.createElement(heading, {
    "level": 1
  }, "Hello world")));
}
export let metadata = {
  "YAML": "cool"
};
