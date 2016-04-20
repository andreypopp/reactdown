import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultElements from "reactdown/lib/elements";
import * as customElements from "reactdown/lib/elements";
let elements = { ...defaultElements, ...customElements };
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(elements.Root, null, React.createElement(elements.Heading, {
    "level": 1
  }, "Entities"), React.createElement(elements.Paragraph, null, "Plain text:"), React.createElement(elements.Paragraph, null, "AT", "&", "T with entity, AT", "&", "T with numeric entity, AT&T without entity."), React.createElement(elements.Paragraph, null, "Fenced code language flags:"), React.createElement(elements.Code, null, "Something in the AT&amp;T language\n"), React.createElement(elements.Code, null, "Something in the AT&#x26;T language\n"), React.createElement(elements.Code, null, "Something in the AT&T language\n"), React.createElement(elements.Paragraph, null, "Automatic links:"), React.createElement(elements.Paragraph, null, React.createElement(elements.Link, {
    "href": "http://at&t.com",
    "title": null
  }, "http://at", "&", "t.com"), ", ", React.createElement(elements.Link, {
    "href": "http://at&t.com",
    "title": null
  }, "http://at", "&", "t.com"), ", and ", React.createElement(elements.Link, {
    "href": "http://at&t.com",
    "title": null
  }, "http://at&t.com"), "."), React.createElement(elements.Paragraph, null, "Link ", React.createElement(elements.InlineCode, null, "href"), ":"), React.createElement(elements.Paragraph, null, React.createElement(elements.Link, {
    "href": "http://at&t.com",
    "title": null
  }, "With entity"), ", ", React.createElement(elements.Link, {
    "href": "http://at&t.com",
    "title": null
  }, "numeric entity"), ", ", React.createElement(elements.Link, {
    "href": "http://at&t.com",
    "title": null
  }, "without entity"), "."), React.createElement(elements.Paragraph, null, "Link ", React.createElement(elements.InlineCode, null, "title"), ":"), React.createElement(elements.Paragraph, null, React.createElement(elements.Link, {
    "href": "http://att.com",
    "title": "AT&T"
  }, "With entity"), ", ", React.createElement(elements.Link, {
    "href": "http://att.com",
    "title": "AT&T"
  }, "numeric entity"), ", ", React.createElement(elements.Link, {
    "href": "http://example.com",
    "title": "AT&T"
  }, "without entity"), "."), React.createElement(elements.Paragraph, null, "Image ", React.createElement(elements.InlineCode, null, "src"), ":"), React.createElement(elements.Paragraph, null, React.createElement(elements.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "With entity",
    "title": null
  }), ", ", React.createElement(elements.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "numeric entity",
    "title": null
  }), ", ", React.createElement(elements.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "without entity",
    "title": null
  }), "."), React.createElement(elements.Paragraph, null, "Image ", React.createElement(elements.InlineCode, null, "alt"), ":"), React.createElement(elements.Paragraph, null, React.createElement(elements.Image, {
    "src": "http://att.com/fav.ico",
    "alt": "AT&T with entity",
    "title": null
  }), ", ", React.createElement(elements.Image, {
    "src": "http://att.com/fav.ico",
    "alt": "AT&T with numeric entity",
    "title": null
  }), ", ", React.createElement(elements.Image, {
    "src": "http://att.com/fav.ico",
    "alt": "AT&T without entity",
    "title": null
  }), "."), React.createElement(elements.Paragraph, null, "Image ", React.createElement(elements.InlineCode, null, "title"), ":"), React.createElement(elements.Paragraph, null, React.createElement(elements.Image, {
    "src": "http://att.com/fav.ico",
    "alt": "With entity",
    "title": "AT&T"
  }), ", ", React.createElement(elements.Image, {
    "src": "http://att.com/fav.ico",
    "alt": "numeric entity",
    "title": "AT&T"
  }), ", ", React.createElement(elements.Image, {
    "src": "http://att.com/fav.ico",
    "alt": "without entity",
    "title": "AT&T"
  }), "."), React.createElement(elements.Paragraph, null, "Reference ", React.createElement(elements.InlineCode, null, "link"), ":"), React.createElement(elements.Paragraph, null, React.createElement(elements.Link, {
    "href": "http://at&t.com/fav.ico",
    "title": "ATT favicon"
  }, "Entity"), ", ", React.createElement(elements.Link, {
    "href": "http://at&t.com/fav.ico",
    "title": "ATT favicon"
  }, "Numeric entity"), ", ", React.createElement(elements.Link, {
    "href": "http://at&t.com/fav.ico",
    "title": "ATT favicon"
  }, "Literal"), "."), React.createElement(elements.Paragraph, null, React.createElement(elements.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "Entity",
    "title": "ATT favicon"
  }), ", ", React.createElement(elements.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "Numeric entity",
    "title": "ATT favicon"
  }), ", ", React.createElement(elements.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "Literal",
    "title": "ATT favicon"
  }), "."), React.createElement(elements.Paragraph, null, "Reference ", React.createElement(elements.InlineCode, null, "title"), ":"), React.createElement(elements.Paragraph, null, React.createElement(elements.Link, {
    "href": "http://at&t.com/fav.ico",
    "title": "AT&T favicon"
  }, "Entity"), ", ", React.createElement(elements.Link, {
    "href": "http://at&t.com/fav.ico",
    "title": "AT&T favicon"
  }, "Numeric entity"), ", ", React.createElement(elements.Link, {
    "href": "http://at&t.com/fav.ico",
    "title": "AT&T favicon"
  }, "Literal"), "."), React.createElement(elements.Paragraph, null, React.createElement(elements.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "Entity",
    "title": "AT&T favicon"
  }), ", ", React.createElement(elements.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "Numeric entity",
    "title": "AT&T favicon"
  }), ", ", React.createElement(elements.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "Literal",
    "title": "AT&T favicon"
  }), "."), React.createElement(elements.Paragraph, null, "Image Reference ", React.createElement(elements.InlineCode, null, "alt"), ":"), React.createElement(elements.Paragraph, null, React.createElement(elements.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "AT&T with entity",
    "title": "AT&T favicon"
  }), ", ", React.createElement(elements.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "AT&T with numeric entity",
    "title": "AT&T favicon"
  }), ", ", React.createElement(elements.Image, {
    "src": "http://at&t.com/fav.ico",
    "alt": "AT&T without entity",
    "title": "AT&T favicon"
  }), "."), React.createElement(elements.Paragraph, null, "Definitions:"), null, null, null, null, null, null, null));
}
export let metadata = {};
export let model = {
  "toc": [{
    "value": "Entities",
    "depth": 1
  }],
  "title": "Entities"
};
