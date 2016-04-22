# vfile-location [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Convert between positions (line and column-based) and offsets
(range-based) locations in a [virtual file][vfile].

## Installation

[npm][npm-install]:

```bash
npm install vfile-location
```

**vfile-location** is also available as an AMD, CommonJS, and globals
module, [uncompressed and compressed][releases].

## Usage

Dependencies:

```javascript
var vfile = require('vfile');
var vfileLocation = require('vfile-location');
var location = vfileLocation(vfile('foo\nbar\nbaz'));
```

Using the methods:

```javascript
var offset = location.toOffset({
    'line': 3,
    'column': 3
});
var position = location.toPosition(offset);
```

Yields:

```txt
10
```

```json
{
  "line": 3,
  "column": 3,
  "offset": 10
}
```

## API

### `location = vfileLocation(doc)`

Partially apply the returned functions with `doc` or `file`.

**Signatures**:

*   `location = vfileLocation(file)`;
*   `location = vfileLocation(doc)`.

**Parameters**:

*   `file` ([`VFile`][vfile]);
*   `doc` (`string`).

**Returns**: `Object`:

*   `toOffset` ([`Function`][to-offset]);
*   `toPosition` ([`Function`][to-position]).

### `location.toOffset(position)`

Get the `offset` for a line and column-based `position` in the
bound file.

**Parameters**:

*   `position` ([`Position`][position]).

**Returns**: `number`. `-1` when given invalid or out of bounds input.

### `location.toPosition(offset)`

Get the line and column-based `position` for `offset` in the bound
file.

**Parameters**:

*   `offset` (`number`).

**Returns**: [`Position`][position]. An empty object when given
invalid or out of bounds input.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/vfile-location.svg

[travis]: https://travis-ci.org/wooorm/vfile-location

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/vfile-location.svg

[codecov]: https://codecov.io/github/wooorm/vfile-location

[npm-install]: https://docs.npmjs.com/cli/install

[releases]: https://github.com/wooorm/vfile-location/releases

[license]: LICENSE

[author]: http://wooorm.com

[position]: https://github.com/wooorm/unist#position

[vfile]: https://github.com/wooorm/vfile

[to-offset]: #locationtooffsetposition

[to-position]: #locationtopositionoffset
