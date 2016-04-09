import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
export default function Document() {
  return React.createElement(DocumentContext, {
    "context": {
      "metadata": metadata
    }
  }, React.createElement("div", null, React.createElement("h1", "Entities"), React.createElement("p", null, "Plain text:"), React.createElement("p", null, "AT", "&", "T with entity, AT", "&", "T with numeric entity, AT&T without entity."), React.createElement("p", null, "Fenced code language flags:"), React.createElement("code", null, "Something in the AT&amp;T language\n"), React.createElement("code", null, "Something in the AT&#x26;T language\n"), React.createElement("code", null, "Something in the AT&T language\n"), React.createElement("p", null, "Automatic links:"), React.createElement("p", null, React.createElement("a", {
    "href": "http://at&t.com",
    "title": null
  }, "http://at", "&", "t.com"), ", ", React.createElement("a", {
    "href": "http://at&t.com",
    "title": null
  }, "http://at", "&", "t.com"), ", and ", React.createElement("a", {
    "href": "http://at&t.com",
    "title": null
  }, "http://at&t.com"), "."), React.createElement("p", null, "Link ", React.createElement("code", null, "href"), ":"), React.createElement("p", null, React.createElement("a", {
    "href": "http://at&t.com",
    "title": null
  }, "With entity"), ", ", React.createElement("a", {
    "href": "http://at&t.com",
    "title": null
  }, "numeric entity"), ", ", React.createElement("a", {
    "href": "http://at&t.com",
    "title": null
  }, "without entity"), "."), React.createElement("p", null, "Link ", React.createElement("code", null, "title"), ":"), React.createElement("p", null, React.createElement("a", {
    "href": "http://att.com",
    "title": "AT&T"
  }, "With entity"), ", ", React.createElement("a", {
    "href": "http://att.com",
    "title": "AT&T"
  }, "numeric entity"), ", ", React.createElement("a", {
    "href": "http://example.com",
    "title": "AT&T"
  }, "without entity"), "."), React.createElement("p", null, "Image ", React.createElement("code", null, "src"), ":"), React.createElement("p", null, React.createElement("img", {
    "src": "http://at&t.com/fav.ico",
    "alt": "With entity",
    "title": null
  }), ", ", React.createElement("img", {
    "src": "http://at&t.com/fav.ico",
    "alt": "numeric entity",
    "title": null
  }), ", ", React.createElement("img", {
    "src": "http://at&t.com/fav.ico",
    "alt": "without entity",
    "title": null
  }), "."), React.createElement("p", null, "Image ", React.createElement("code", null, "alt"), ":"), React.createElement("p", null, React.createElement("img", {
    "src": "http://att.com/fav.ico",
    "alt": "AT&T with entity",
    "title": null
  }), ", ", React.createElement("img", {
    "src": "http://att.com/fav.ico",
    "alt": "AT&T with numeric entity",
    "title": null
  }), ", ", React.createElement("img", {
    "src": "http://att.com/fav.ico",
    "alt": "AT&T without entity",
    "title": null
  }), "."), React.createElement("p", null, "Image ", React.createElement("code", null, "title"), ":"), React.createElement("p", null, React.createElement("img", {
    "src": "http://att.com/fav.ico",
    "alt": "With entity",
    "title": "AT&T"
  }), ", ", React.createElement("img", {
    "src": "http://att.com/fav.ico",
    "alt": "numeric entity",
    "title": "AT&T"
  }), ", ", React.createElement("img", {
    "src": "http://att.com/fav.ico",
    "alt": "without entity",
    "title": "AT&T"
  }), "."), React.createElement("p", null, "Reference ", React.createElement("code", null, "link"), ":"), React.createElement("p", null, React.createElement("a", {
    "href": "http://at&t.com/fav.ico",
    "title": "ATT favicon"
  }, "Entity"), ", ", React.createElement("a", {
    "href": "http://at&t.com/fav.ico",
    "title": "ATT favicon"
  }, "Numeric entity"), ", ", React.createElement("a", {
    "href": "http://at&t.com/fav.ico",
    "title": "ATT favicon"
  }, "Literal"), "."), React.createElement("p", null, React.createElement("img", {
    "src": "http://at&t.com/fav.ico",
    "alt": "Entity",
    "title": "ATT favicon"
  }), ", ", React.createElement("img", {
    "src": "http://at&t.com/fav.ico",
    "alt": "Numeric entity",
    "title": "ATT favicon"
  }), ", ", React.createElement("img", {
    "src": "http://at&t.com/fav.ico",
    "alt": "Literal",
    "title": "ATT favicon"
  }), "."), React.createElement("p", null, "Reference ", React.createElement("code", null, "title"), ":"), React.createElement("p", null, React.createElement("a", {
    "href": "http://at&t.com/fav.ico",
    "title": "AT&T favicon"
  }, "Entity"), ", ", React.createElement("a", {
    "href": "http://at&t.com/fav.ico",
    "title": "AT&T favicon"
  }, "Numeric entity"), ", ", React.createElement("a", {
    "href": "http://at&t.com/fav.ico",
    "title": "AT&T favicon"
  }, "Literal"), "."), React.createElement("p", null, React.createElement("img", {
    "src": "http://at&t.com/fav.ico",
    "alt": "Entity",
    "title": "AT&T favicon"
  }), ", ", React.createElement("img", {
    "src": "http://at&t.com/fav.ico",
    "alt": "Numeric entity",
    "title": "AT&T favicon"
  }), ", ", React.createElement("img", {
    "src": "http://at&t.com/fav.ico",
    "alt": "Literal",
    "title": "AT&T favicon"
  }), "."), React.createElement("p", null, "Image Reference ", React.createElement("code", null, "alt"), ":"), React.createElement("p", null, React.createElement("img", {
    "src": "http://at&t.com/fav.ico",
    "alt": "AT&T with entity",
    "title": "AT&T favicon"
  }), ", ", React.createElement("img", {
    "src": "http://at&t.com/fav.ico",
    "alt": "AT&T with numeric entity",
    "title": "AT&T favicon"
  }), ", ", React.createElement("img", {
    "src": "http://at&t.com/fav.ico",
    "alt": "AT&T without entity",
    "title": "AT&T favicon"
  }), "."), React.createElement("p", null, "Definitions:"), null, null, null, null, null, null, null));
}
export let metadata = null;
