# Reactdown

Reactdown is a markdown based live document format.

There are two main extensions to markdown syntax: directives and roles
its semantics and appearance are configured through React components.

An entire document renders into a React element tree with directives, roles and
regular markdown markup mapped onto a collection of React components.

## Custom Directives

Custom directives are used to insert block-level markup constructs into
document. They are modelled after [ReStructured Text][] directives.

The simplest form of a custom directive is:

    ::TOC

They also coould have any other markdown content (indented by two spaces):

    ::Note

      Some *markdown* content.

Metadata, encoded as YAML document:

    ::TOC
      ---
      depth: 3
      ---

Or even both metadata and content:

    ::form
      ---
      action: /form
      ---

      ::field
        ---
        name: first_name
        ---

      ::field
        ---
        name: last_name
        ---

## Installation & Usage

Install via npm:

    % npm install reactdown

The current implementation relies on [Webpack][] and [Babel][], which is why you
also need to install them:

    % npm install webpack babel-loader

## Development

[Webpack]: https://webpack.github.io/
[Babel]: http://babeljs.io/
[ReStructured Text]: http://docutils.sourceforge.net/rst.html
