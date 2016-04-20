---
title: Reactdown
---

## Overview & Motivation

Markdown based live document format.

It is implemented as a compiler from Markdown to React components. This is what
makes Reactdown documents "live" — you can use any React component to drive
interactions between a user and a Reactdown document.

Reactdown also provides two main extension points for Markdown syntax:
**directives** and **roles**.

## Installation & Configuration

Install via npm:

    % npm install reactdown

..note Tool Integrations

  Reactdown currently provides basic command line utilities and a Webpack loader.
  Support for other integrations is on the way, help is highly appreciated.

### Command Line Interface

Reactdown documents can be rendered into JavaScript modules using a CLI utility:

    % reactdown-render --help
    Usage: reactdown-render [options] <file>

    Options:

      -h, --help                       output usage information
      -V, --version                    output the version number
      -d, --directive [component-ref]  Register component for a directive
      -e, --components [module-ref]    Module with HTML components


### Webpack Loader

The current implementation relies on [Webpack][] and [Babel][], which is why you
also need to install them:

    % npm install webpack babel-loader

The following Webpack configuration would suit the needs and would allow to
compile any `*.md` file into JavaScript modules which then could be imported and
processed liek regular React components:

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
  it can be execute in browsers. The relevant poriton of Babel config is:

      {
        "presets": ["es2015", "stage-1"]
      }

  Make sure you out these line in your `.babelrc`.

### Configuration

## Usage

### Document metadata

Documents can attach arbitrary metadata using YAML frontmatter:

    ---
    title: Document
    published: 2017-12-01
    ---

    Document

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

### Creating new directives

## Roles

TK Describe what roles are and what are their usecases.

## Built-in Directives

There are a couple of built-in directives.

### Meta

Directive `..meta` is used for debug purposes to render metadata attached to a
document.

Example:

    ..meta

### Ref

Directive `..ref` can be used to place anchors within a document which then can
be references using hyperlinks.

Example:

    ..ref see-more

    Some important text.

See [Webpack configuration example](#webpack-config)

Later in the document we can place a hyperlink to a referenced content using a
regular markdown syntax:

    [See more info](#see-more)

## Document API

### Component

### Metadata

### Model

## Development

Development takes place at [GitHub][].

[Webpack]: https://webpack.github.io/
[Babel]: http://babeljs.io/
[ReStructured Text]: http://docutils.sourceforge.net/rst.html
[GitHub]: https://github.com/andreypopp/reactdown
