import React from "react";
import { DocumentContext, directives as defaultDirectives, components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
import { mod } from "roles";
export default function Document({
  className,
  style
}) {
  return React.createElement(DocumentContext, {
    context: {
      meta
    }
  }, React.cloneElement(React.createElement(components.Root, null, React.createElement(components.Paragraph, null, "OK, this is just some ", React.createElement(mod, {
    "words": ["react-dom/server"]
  })), React.createElement(components.Paragraph, null, React.createElement(mod, {
    "words": ["react-dom/start"]
  }), " start"), React.createElement(components.Paragraph, null, "In between ", React.createElement(mod, {
    "words": ["between"]
  }), " ok...")), {
    className,
    style
  }));
}
export let meta = {
  data: {},
  model: {
    "toc": [],
    "title": null
  }
};
