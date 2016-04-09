import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import { html } from "reactdown/lib/elements";
export default function Document() {
  return React.createElement(DocumentContext, {
    "metadata": metadata
  }, React.createElement("div", null, React.createElement(html, {
    "html": "<h1>Alpha</h1>"
  }), React.createElement("p", null, React.createElement(html, {
    "html": "<strong>"
  }), "Foo", React.createElement(html, {
    "html": "</strong>"
  }), " ", React.createElement(html, {
    "html": "<em>"
  }), "bar", React.createElement(html, {
    "html": "</em>"
  }), " ", React.createElement(html, {
    "html": "<sup>"
  }), "baz", React.createElement(html, {
    "html": "</sup>"
  }), " ", React.createElement(html, {
    "html": "<sub>"
  }), "qux", React.createElement(html, {
    "html": "</sub>"
  }), ".")));
}
export let metadata = null;
