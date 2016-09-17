/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import fs from 'fs';
import path from 'path';
import parse from '../index';
import {loadFront as getMeta} from 'yaml-front-matter';
import {any, object, string, mapping} from 'validated/schema';

declare function describe(description: string, body: any): void;
declare function it(description: string, body: any): void;

function fixtureFilename(name, ext) {
  return path.join(__dirname, name) + '.' + ext;
}

function readFixtures(dir) {
  return fs
    .readdirSync(path.join(__dirname, dir))
    .filter(name => /\.md$/.exec(name))
    .map(name => path.join(dir, name.replace(/\.md$/, '')));
}

let config = {
  directives: {
    Plain: {
    },
    Children: {
      children: 'required',
    },
    ChildrenOptional: {
      children: 'optional',
    },
    Pre: {
      children: 'required-preformatted',
    },
    PreOptional: {
      children: 'optional-preformatted',
    },
    Line: {
      line: 'required',
    },
    LineOptional: {
      line: 'optional',
    },
    Data: {
      data: any,
    },
    DataRequired: {
      data: mapping(any),
    },
    DataChildren: {
      data: any,
      children: 'required',
    },
    DataPerson: {
      data: object({name: string}),
    }
  },
};

function generateCases(dir, only = null) {
  let fixtures = readFixtures(dir);
  fixtures.forEach(fixture => {
    let test = only === fixture ? it.only : it;
    test(`parses ${fixture}`, function() {
      let src = fs.readFileSync(fixtureFilename(fixture, 'md'), 'utf8');
      if (/\.failure/.exec(fixture)) {
        let meta = getMeta(src);
        expect(() => parse(src, config)).toThrowError(meta.message);
      } else {
        let node = parse(src, config);
        expect(node).toMatchSnapshot();
      }
    });
  });
}

describe('reactdown/parse', function() {
  describe('directive', function() {
    generateCases('directive-fixture');
    generateCases('role-fixture');
  });
});
