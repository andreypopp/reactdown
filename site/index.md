---
title: Reactdown
---

## Overview & Motivation

Ever wanted to write with Markdown syntax but then include rich user
interactions in documents using React components?

You can do this with Reactdown.

Reactdown provides a set of syntax extensions on top of Markdown to include
React components in documents. It also provides an extendable document model.

It is implemented as a compiler from Markdown to React components, which has
bindings to Webpack. Your documents are just one "import-away":

    import Document, {metadata, model} from './blog-post.md'

    <Document />

That means that you can use all the power of Webpack and npm ecosystems to write
your documents.

## Installation & Usage

Install via npm:

    % npm install reactdown

..note Integrations

  Reactdown currently provides basic command line utilities and a Webpack
  loader.  Support for integrations with other build systems can be achieved
  easily and help on that front is highly appreciated.

### Command Line Interface

Reactdown documents can be rendered into JavaScript modules using a command line
utility:

    % reactdown-render --help
    Usage: reactdown-render [options] <file>

    Options:

      -h, --help                       output usage information
      -V, --version                    output the version number
      -d, --directive [component-ref]  Register component for a directive
      -r, --role [component-ref]       Register component for a role
      -e, --components [module-ref]    Module with HTML components

### Webpack Loader

The following Webpack configuration would suit the needs and would allow to
compile any `*.md` file into JavaScript modules which then could be imported and
processed like regular React components:

..ref webpack-config

    module.exports = {
      module: {
        loaders: [
          {
            test: /\.md$/,
            loader: 'babel-loader!reactdown/webpack',
          }
        ]
      }
    }

..note Babel is Required

  Currently Reactdown emits ES2015 code which must be compiled by Babel before
  it can be execute in browsers. You will need a corresponding Webpack loader
  and a set of presets:

      npm install babel-loader babel-preset-es2015 babel-preset-stage-1

  The relevant poriton of Babel config is:

      {
        "presets": ["es2015", "stage-1"]
      }

  Make sure you out these line in your `.babelrc`.

### Configuration

Reactdown enables you to configure a couple of things. The main configuration
mechanism is a `.reactdownrc` file in JSON format.

..note You can use comments in configuration!

  Reactdown uses [JSON5][] as its configuration format. It is backwards
  compatible with JSON but allows comments in its syntax. That could be useful.

Just put it in a directory with your Reactdown documents and compiler will pick
it up and configure itself accordingly.

An complete example of available configuration:

    {
      // You can define which modules is used to render native Markdown syntax.
      components: './module/with/html-components.js',

      // Configure available directives
      directives: {
        TwitterFeed: {
          render: {
            name: 'TwitterFeed',
            source: './module/with/directives'
          }
        }
      },

      // Configure available roles
      roles: {
        GHIssue: {
          name: 'GHIssue',
          source: './module/with/roles'
        }
      },
    }

## Document format & API

Reactdown uses Markdown as a base. That means that every Markdown syntax
construct is supported and every valid Markdown document is also a valid
Reactdown document.

..note Are Reactdown documents also Markdown documents?

  Yes and no. You can render a Reactdown with any other Markdown compiler but if
  Reactdown document contains custom syntax (directives or roles) it won't be
  compiled into pretty HTML.

The target medium of a Reactdown document is a JavaScript module. The main API
to interact with a document programmatically is through the module itself.

To access the resulted React component you need to import the `default` name
from a module:

    import Document from './my-document.md'

### Document metadata

Documents can attach arbitrary metadata using YAML frontmatter:

    ---
    title: Document
    published: 2017-12-01
    ---

You can get access to document metadata by importing `metadata` name from the
module:

    import {metadata} from './my-document.md'

The metadata would be an object (JSON) parsed from YAML.

### Document model

It is useful to have the representation of a document as a data structure. While
React component represents the UI of the document, the data part of the document
is called a *document model*.

Reactdown can be configured to expose different parts of the document as its
model. By default only *table of contents* (the list of headings with levels) and
the *document title* (first heading) available as the document model.

You can get access to document model by important `model` name from the module:

    import {model} from './my-document.md'

TK How to extend document model.

## Directives

Directives are used to insert block-level markup constructs into
document. They are modelled after [ReStructured Text][] directives.

The simplest form of a custom directive is:

    ..toc

### Syntax

They also could have any other markdown content. It is up to directives to
process the content. The rule is everything which is indented up to a directive
name becomes a directive's content:

    ..note Title

      Some *markdown* content.toc

Metadata, encoded as YAML document:

    ..toc
      ---
      depth: 3
      ---

### Built-in Directives

There are a couple of built-in directives.

#### Meta

Directive `..meta` is used for debug purposes to render metadata attached to a
document.

Example:

    ..meta

#### Ref

Directive `..ref` can be used to place anchors within a document which then can
be references using hyperlinks.

Example:

    ..ref see-more

    Some important text.

Later in the document we can place a hyperlink to a referenced content using a
regular markdown syntax:

    [See more info](#see-more)

### Creating new directives

TK How to create new directive?

## Roles

TK Describe what roles are and what are their usecases.

## Development

Development takes place at [GitHub][].

TK How to contribute?

[Webpack]: https://webpack.github.io/
[Babel]: http://babeljs.io/
[ReStructured Text]: http://docutils.sourceforge.net/rst.html
[GitHub]: https://github.com/andreypopp/reactdown
