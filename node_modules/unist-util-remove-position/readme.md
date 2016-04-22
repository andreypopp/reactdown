# unist-util-remove-position [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Remove [`position`][position]s from a [unist][] tree.

## Installation

[npm][npm-install]:

```bash
npm install unist-util-remove-position
```

**unist-util-remove-position** is also available as an AMD, CommonJS,
and globals module, [uncompressed and compressed][releases].

## Usage

Dependencies:

```javascript
var remark = require('remark');
var removePosition = require('unist-util-remove-position');
```

Tree:

```javascript
var tree = remark.parse('Some **strong**, _emphasis_, and `code`.');
```

Yields:

```json
{
  "type": "root",
  "children": [
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Some ",
          "position": {
            "start": {
              "line": 1,
              "column": 1
            },
            "end": {
              "line": 1,
              "column": 6
            },
            "indent": []
          }
        },
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "strong",
              "position": {
                "start": {
                  "line": 1,
                  "column": 8
                },
                "end": {
                  "line": 1,
                  "column": 14
                },
                "indent": []
              }
            }
          ],
          "position": {
            "start": {
              "line": 1,
              "column": 6
            },
            "end": {
              "line": 1,
              "column": 16
            },
            "indent": []
          }
        },
        {
          "type": "text",
          "value": ", ",
          "position": {
            "start": {
              "line": 1,
              "column": 16
            },
            "end": {
              "line": 1,
              "column": 18
            },
            "indent": []
          }
        },
        {
          "type": "emphasis",
          "children": [
            {
              "type": "text",
              "value": "emphasis",
              "position": {
                "start": {
                  "line": 1,
                  "column": 19
                },
                "end": {
                  "line": 1,
                  "column": 27
                },
                "indent": []
              }
            }
          ],
          "position": {
            "start": {
              "line": 1,
              "column": 18
            },
            "end": {
              "line": 1,
              "column": 28
            },
            "indent": []
          }
        },
        {
          "type": "text",
          "value": ", and ",
          "position": {
            "start": {
              "line": 1,
              "column": 28
            },
            "end": {
              "line": 1,
              "column": 34
            },
            "indent": []
          }
        },
        {
          "type": "inlineCode",
          "value": "code",
          "position": {
            "start": {
              "line": 1,
              "column": 34
            },
            "end": {
              "line": 1,
              "column": 40
            },
            "indent": []
          }
        },
        {
          "type": "text",
          "value": ".",
          "position": {
            "start": {
              "line": 1,
              "column": 40
            },
            "end": {
              "line": 1,
              "column": 41
            },
            "indent": []
          }
        }
      ],
      "position": {
        "start": {
          "line": 1,
          "column": 1
        },
        "end": {
          "line": 1,
          "column": 41
        },
        "indent": []
      }
    }
  ],
  "position": {
    "start": {
      "line": 1,
      "column": 1
    },
    "end": {
      "line": 1,
      "column": 41
    }
  }
}
```

Removing position from tree:

```javascript
tree = removePosition(tree);
```

Yields:

```json
{
  "type": "root",
  "children": [
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Some "
        },
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "strong"
            }
          ]
        },
        {
          "type": "text",
          "value": ", "
        },
        {
          "type": "emphasis",
          "children": [
            {
              "type": "text",
              "value": "emphasis"
            }
          ]
        },
        {
          "type": "text",
          "value": ", and "
        },
        {
          "type": "inlineCode",
          "value": "code"
        },
        {
          "type": "text",
          "value": "."
        }
      ]
    }
  ]
}
```

## API

### `removePosition(tree)`

Remove [`position`][position]s from `tree`.

**Parameters**:

*   `tree` ([`Node`][node]).

**Returns**: [`Node`][node] — `tree` without [`position`][position]s.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/unist-util-remove-position.svg

[travis]: https://travis-ci.org/wooorm/unist-util-remove-position

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/unist-util-remove-position.svg

[codecov]: https://codecov.io/github/wooorm/unist-util-remove-position

[npm-install]: https://docs.npmjs.com/cli/install

[releases]: https://github.com/wooorm/unist-util-remove-position/releases

[license]: LICENSE

[author]: http://wooorm.com

[unist]: https://github.com/wooorm/unist

[position]: https://github.com/wooorm/unist#position

[node]: https://github.com/wooorm/unist#node
