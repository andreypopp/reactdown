import React from "react";
import { DocumentContext, directives as defaultDirectives, components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
export default function Document({
  className,
  style
}) {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.cloneElement(React.createElement(components.Root, null, React.createElement(components.Heading, {
    "level": 1
  }, "Entities"), React.createElement(components.Paragraph, null, "Plain text:"), React.createElement(components.Paragraph, null, "AT", "&", "T with entity, AT", "&", "T with numeric entity, AT&T without entity."), React.createElement(components.Paragraph, null, "Fenced code language flags:"), React.createElement(components.Code, null, "Something in the AT&amp;T language\n"), React.createElement(components.Code, null, "Something in the AT&#x26;T language\n"), React.createElement(components.Code, null, "Something in the AT&T language\n"), React.createElement(components.Paragraph, null, "Automatic links:"), React.createElement(components.Paragraph, null, React.createElement(components.Link, {
    "href": "http://at&t.com",
    "title": null
  }, "http://at", "&", "t.com"), ", ", React.createElement(components.Link, {
    "href": "http://at&t.com",
    "title": null
  }, "http://at", "&", "t.com"), ", and ", React.createElement(components.Link, {
    "href": "http://at&t.com",
    "title": null
  }, "http://at&t.com"), "."), React.createElement(components.Paragraph, null, "Link ", React.createElement(components.InlineCode, null, "href"), ":"), React.createElement(components.Paragraph, null, React.createElement(components.Link, {
    "href": "http://at&t.com",
    "title": null
  }, "With entity"), ", ", React.createElement(components.Link, {
    "href": "http://at&t.com",
    "title": null
  }, "numeric entity"), ", ", React.createElement(components.Link, {
    "href": "http://at&t.com",
    "title": null
  }, "without entity"), "."), React.createElement(components.Paragraph, null, "Link ", React.createElement(components.InlineCode, null, "title"), ":"), React.createElement(components.Paragraph, null, React.createElement(components.Link, {
    "href": "http://att.com",
    "title": "AT&T"
  }, "With entity"), ", ", React.createElement(components.Link, {
    "href": "http://att.com",
    "title": "AT&T"
  }, "numeric entity"), ", ", React.createElement(components.Link, {
    "href": "http://example.com",
    "title": "AT&T"
  }, "without entity"), "."), React.createElement(components.Paragraph, null, "Image ", React.createElement(components.InlineCode, null, "src"), ":"), React.createElement(components.Paragraph, null, React.createElement(components.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "With entity",
    "title": null
  }), ", ", React.createElement(components.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "numeric entity",
    "title": null
  }), ", ", React.createElement(components.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "without entity",
    "title": null
  }), "."), React.createElement(components.Paragraph, null, "Image ", React.createElement(components.InlineCode, null, "alt"), ":"), React.createElement(components.Paragraph, null, React.createElement(components.Image, {
    "src": "http://att.com/fav.ico",
    "alt": "AT&T with entity",
    "title": null
  }), ", ", React.createElement(components.Image, {
    "src": "http://att.com/fav.ico",
    "alt": "AT&T with numeric entity",
    "title": null
  }), ", ", React.createElement(components.Image, {
    "src": "http://att.com/fav.ico",
    "alt": "AT&T without entity",
    "title": null
  }), "."), React.createElement(components.Paragraph, null, "Image ", React.createElement(components.InlineCode, null, "title"), ":"), React.createElement(components.Paragraph, null, React.createElement(components.Image, {
    "src": "http://att.com/fav.ico",
    "alt": "With entity",
    "title": "AT&T"
  }), ", ", React.createElement(components.Image, {
    "src": "http://att.com/fav.ico",
    "alt": "numeric entity",
    "title": "AT&T"
  }), ", ", React.createElement(components.Image, {
    "src": "http://att.com/fav.ico",
    "alt": "without entity",
    "title": "AT&T"
  }), "."), React.createElement(components.Paragraph, null, "Reference ", React.createElement(components.InlineCode, null, "link"), ":"), React.createElement(components.Paragraph, null, React.createElement(components.Link, {
    "href": "http://at&t.com/fav.ico",
    "title": "ATT favicon"
  }, "Entity"), ", ", React.createElement(components.Link, {
    "href": "http://at&t.com/fav.ico",
    "title": "ATT favicon"
  }, "Numeric entity"), ", ", React.createElement(components.Link, {
    "href": "http://at&t.com/fav.ico",
    "title": "ATT favicon"
  }, "Literal"), "."), React.createElement(components.Paragraph, null, React.createElement(components.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "Entity",
    "title": "ATT favicon"
  }), ", ", React.createElement(components.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "Numeric entity",
    "title": "ATT favicon"
  }), ", ", React.createElement(components.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "Literal",
    "title": "ATT favicon"
  }), "."), React.createElement(components.Paragraph, null, "Reference ", React.createElement(components.InlineCode, null, "title"), ":"), React.createElement(components.Paragraph, null, React.createElement(components.Link, {
    "href": "http://at&t.com/fav.ico",
    "title": "AT&T favicon"
  }, "Entity"), ", ", React.createElement(components.Link, {
    "href": "http://at&t.com/fav.ico",
    "title": "AT&T favicon"
  }, "Numeric entity"), ", ", React.createElement(components.Link, {
    "href": "http://at&t.com/fav.ico",
    "title": "AT&T favicon"
  }, "Literal"), "."), React.createElement(components.Paragraph, null, React.createElement(components.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "Entity",
    "title": "AT&T favicon"
  }), ", ", React.createElement(components.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "Numeric entity",
    "title": "AT&T favicon"
  }), ", ", React.createElement(components.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "Literal",
    "title": "AT&T favicon"
  }), "."), React.createElement(components.Paragraph, null, "Image Reference ", React.createElement(components.InlineCode, null, "alt"), ":"), React.createElement(components.Paragraph, null, React.createElement(components.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "AT&T with entity",
    "title": "AT&T favicon"
  }), ", ", React.createElement(components.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "AT&T with numeric entity",
    "title": "AT&T favicon"
  }), ", ", React.createElement(components.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "AT&T without entity",
    "title": "AT&T favicon"
  }), "."), React.createElement(components.Paragraph, null, "Definitions:"), null, null, null, null, null, null, null), {
    className,
    style
  }));
}
export let metadata = {};
export let model = {
  "toc": [{
    "value": "Entities",
    "depth": 1
  }],
  "title": "Entities"
};
