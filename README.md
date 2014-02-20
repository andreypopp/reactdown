# reactdown

Write React components using markdown syntax:

    ---
    title: Awesome blog post
    some: metadata
    ...

    # Hello, this is just a markdown

    But it's actually a React component.

    You can call instantiate other components directly

    <TwitterFeed username="@andreypopp" />

    ^^ this is my twitter feed!

This will be compiled by `reactdown` into a CommonJS module which exports a
React component.

## Installation

    % npm install reactdown

## Usage

From command line:

    % reactdown ./page.md > page.js

From Node:

    var reactdown = require('reactdown');

    reactdown('...');

As a browserify transform:

    % browserify -t reactdown/transform ...
