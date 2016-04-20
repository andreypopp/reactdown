import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultComponents from "reactdown/lib/components";
import * as customComponents from "reactdown/lib/components";
let components = { ...defaultComponents, ...customComponents };
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(components.Root, null, React.createElement(components.Paragraph, null, "Hello", React.createElement(components.Break, null), "world"), React.createElement(components.Break, null), React.createElement(components.Paragraph, null, React.createElement(components.Image, {
    "src": "http://exaple.com/fav.ico",
    "alt": "Favicon",
    "title": "Example Favicon"
  }))));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
