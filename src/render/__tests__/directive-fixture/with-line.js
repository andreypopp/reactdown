import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultComponents from "reactdown/lib/components";
import * as customComponents from "reactdown/lib/components";
let components = { ...defaultComponents, ...customComponents };
import ref from "reactdown/lib/directives/ref";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(components.Root, null, React.createElement(components.Paragraph, null, "Ok"), React.createElement(ref, {
    "line": "some-ref"
  }), React.createElement(components.Paragraph, null, "wow")));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
