# Reactdown

Markdown based live document format.

## Motivation

* Easy to write.
* Produce live documents.
* Extend with new constructs.
* Integrate with the whole JS ecosystem.

## Installation & Usage

First, install from npm:

    % npm install reactdown

### Command line interface

There's command line utility which helps converting your reactdown documents to
ES2015 modules:

    % ./node_modules/.bin/reactdown-render --help

## Webpack

There's webpack loader, configure it like so:

    module.exports = {
      module: {
        loaders: [
          {
            test: /\.md$/,
            loader: 'babel!reactdown/webpack'
        ]
      }
    }

## Primer

Example:

    :date: 2016-03-26
    :tags: primer, reactdown

    Reactdown primer
    ================

    Hello, this is just a regular markdown paragraph.

    Custom block elements
    ---------------------

    Reactdown allows custom block elements, the simplest example you can see
    below.

    ::Note

      This piece of markup will be handled by a special component.

    ::Element
      ---
      property: value
      key: value
      ---

      Children

    ::Form

      Individual
      ~~~~~~~~~~

      ::Field
        ---
        label: First Name
        key: firstName
        ---

      ::Field
        ---
        label: Last Name
        key: lastName
        ---


    Custom inline elements
    ----------------------

    This is a link to :gh-pr:786

    This is a link to :gh-issue:1256:`Custom issue title`

    Hope you liked it.
