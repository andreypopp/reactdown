import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as elements from "reactdown/lib/elements";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata
    }
  }, React.createElement(elements.Root, null, React.createElement(elements.Paragraph, null, "Hello", React.createElement(elements.Break, null), "world"), React.createElement(elements.Break, null), React.createElement(elements.Paragraph, null, React.createElement(elements.Image, {
    "src": "http://exaple.com/fav.ico",
    "alt": "Favicon",
    "title": "Example Favicon"
  }))));
}
export let metadata = null;
