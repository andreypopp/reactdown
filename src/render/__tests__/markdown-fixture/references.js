import React from "react";
import { DocumentContext, directives as defaultDirectives, components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
export default function Document({
  className,
  style
}) {
  return React.createElement(DocumentContext, {
    context: {
      meta
    }
  }, React.cloneElement(React.createElement(components.Root, null, React.createElement(components.Heading, {
    "level": 1,
    "name": "References"
  }, "References"), React.createElement(components.Paragraph, null, "Entities contains some serious entity tests relating to titles and links\nin definitions."), React.createElement(components.Paragraph, null, "However, the ", React.createElement(components.Link, {
    "href": "",
    "title": undefined
  }, "missing"), ", ", React.createElement(components.Link, {
    "href": "",
    "title": undefined
  }, "missing"), ", and ", React.createElement(components.Link, {
    "href": "",
    "title": undefined
  }, "missing"), " are omitted."), React.createElement(components.Paragraph, null, "However, the ", React.createElement(components.Image, {
    "src": "",
    "alt": "missing",
    "title": undefined
  }), ", ", React.createElement(components.Image, {
    "src": "",
    "alt": "missing",
    "title": undefined
  }), ", and ", React.createElement(components.Image, {
    "src": "",
    "alt": "missing",
    "title": undefined
  }), " are omitted."), React.createElement(components.Paragraph, null, "Same goes for ", React.createElement(components.Link, {
    "href": "",
    "title": undefined
  }), " and ", React.createElement(components.Image, {
    "src": "",
    "alt": "",
    "title": undefined
  }), "."), null), {
    className,
    style
  }));
}
export let meta = {
  data: {},
  model: {
    "toc": [{
      "title": "References",
      "name": "References",
      "depth": 1
    }],
    "title": "References"
  }
};
