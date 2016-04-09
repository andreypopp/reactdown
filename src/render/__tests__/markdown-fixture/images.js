import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
export default function Document() {
  return React.createElement(DocumentContext, {
    "context": {
      "metadata": metadata
    }
  }, React.createElement("div", null, React.createElement("p", null, React.createElement("img", {
    "src": "http://example.com/favicon.ico",
    "alt": "Example",
    "title": "Example Image"
  })), React.createElement("p", null, React.createElement("img", {
    "src": "http://example.com/favicon.ico",
    "alt": "Example",
    "title": null
  })), React.createElement("p", null, React.createElement("img", {
    "src": "http://example.com/favicon.ico",
    "alt": "",
    "title": null
  })), React.createElement("p", null, React.createElement("img", {
    "src": "",
    "alt": "",
    "title": "Example Image"
  })), React.createElement("p", null, React.createElement("img", {
    "src": "",
    "alt": "",
    "title": null
  })), React.createElement("p", null, React.createElement("img", {
    "src": "",
    "alt": "",
    "title": null
  }))));
}
export let metadata = null;
