# Reactdown

Reactdown is a Markdown based live document format.

It is implemented as a compiler from Markdown to React components. This is what
makes reactdown documents "live" — you can use any React component to drive
interactions beyween a user and a Reactdown document.

Reactdown also provides two main extension points for Markdown syntax:
**directives** and **roles**.

## Custom Directives

Custom directives are used to insert block-level markup constructs into
document. They are modelled after [ReStructured Text][] directives.

The simplest form of a custom directive is:

    ::TOC


### Content

They also could have any other markdown content. It is up to directives to
process the content. The rule is everything which is indented up to a directive
name becomes a directive's content:

    ::Note

      Some *markdown* content.

### Properties

Metadata, encoded as YAML document:

    ::TOC
      ---
      depth: 3
      ---

## Custom Roles

TK Describe what custom roles are and what are their usecases.

## Built-in Directives

There are a couple of built-in directives.

### Meta

## Runtime Representation

## Installation & Usage

Install via npm:

    % npm install reactdown

### Command Line Interface

Reactdown documents can be rendered into JavaScript modules using a CLI utility:

    % reactdown-render --help
    Usage: reactdown-render [options] <file>

    Options:

      -h, --help                       output usage information
      -V, --version                    output the version number
      -d, --directive [component-ref]  Register component for a directive
      -e, --elements [module-ref]      Module with HTML elements


### Webpack Loader

The current implementation relies on [Webpack][] and [Babel][], which is why you
also need to install them:

    % npm install webpack babel-loader

The following Webpack configuration would suit the needs and would allow to
compile any `*.md` file into JavaScript modules which then could be imported and
processed liek regular React components:

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

### Configuration

## Development

Development takes place at [GitHub][].

[Webpack]: https://webpack.github.io/
[Babel]: http://babeljs.io/
[ReStructured Text]: http://docutils.sourceforge.net/rst.html
[GitHub]: https://github.com/andreypopp/reactdown
