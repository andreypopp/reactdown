import React from "react";
import { DocumentContext, directives as defaultDirectives, components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
import { GHIssue } from "roles";
import { GHBranch } from "roles";
export default function Document({
  className,
  style
}) {
  return React.createElement(DocumentContext, {
    context: {
      meta
    }
  }, React.cloneElement(React.createElement(components.Root, null, React.createElement(components.Paragraph, null, "Link to GitHub issue: ", React.createElement(GHBranch, {
    "words": ["123", "next"]
  }), "."), React.createElement(components.Paragraph, null, "Link to GitHub issue: ", React.createElement(GHIssue, {
    "words": ["123", "Important issue"]
  }), "."), React.createElement(components.Paragraph, null, "Link to GitHub issue: ", React.createElement(GHIssue, {
    "words": ["Important issue", "123"]
  }), ".")), {
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
