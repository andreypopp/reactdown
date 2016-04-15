import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata
    }
  }, React.createElement("div", null, React.createElement("p", null, React.createElement("a", {
    "href": "http://example.com",
    "title": "Example Link"
  }, "Example")), React.createElement("p", null, React.createElement("a", {
    "href": "http://example.com",
    "title": null
  }, "Example")), React.createElement("p", null, React.createElement("a", {
    "href": "http://example.com",
    "title": null
  })), React.createElement("p", null, React.createElement("a", {
    "href": "",
    "title": "Example Link"
  })), React.createElement("p", null, React.createElement("a", {
    "href": "",
    "title": null
  })), React.createElement("p", null, React.createElement("a", {
    "href": "",
    "title": null
  }))));
}
export let metadata = null;
