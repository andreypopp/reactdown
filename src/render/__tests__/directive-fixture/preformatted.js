import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import pre from "lib/pre";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata
    }
  }, React.createElement("div", null, React.createElement("p", null, "Hello,"), React.createElement(pre, null, "ok, *this* is **just** some code"), React.createElement("p", null, "Bye")));
}
export let metadata = null;
