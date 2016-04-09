import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
export default function Document() {
  return React.createElement(DocumentContext, {
    "metadata": metadata
  }, React.createElement("div", null, React.createElement("p", null, "Hello", React.createElement("br", null), "world"), React.createElement("br", null), React.createElement("p", null, React.createElement("img", {
    "src": "http://exaple.com/fav.ico",
    "alt": "Favicon",
    "title": "Example Favicon"
  }))));
}
export let metadata = null;
