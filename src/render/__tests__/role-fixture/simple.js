import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultComponents from "reactdown/lib/components";
import * as customComponents from "reactdown/lib/components";
let components = { ...defaultComponents, ...customComponents };
import { mod } from "roles";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(components.Root, null, React.createElement(components.Paragraph, null, "OK, this is just some ", React.createElement(mod, {
    "words": ["react-dom/server"]
  })), React.createElement(components.Paragraph, null, React.createElement(mod, {
    "words": ["react-dom/start"]
  }), " start"), React.createElement(components.Paragraph, null, "In between ", React.createElement(mod, {
    "words": ["between"]
  }), " ok...")));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
