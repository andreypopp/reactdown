/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import parse from '../index';

declare function describe(description: string, body: any): void;
declare function it(description: string, body: any): void;

function expectedOutput(name) {
  return fs
    .readFileSync(fixtureFilename(name, 'json'), 'utf8')
    .trim();
}

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
    pre: {preformatted: true},
  },
};

function generateCases(dir, only = null) {
  let fixtures = readFixtures(dir);
  fixtures.forEach(fixture => {
    let test = only === fixture ? it.only : it;
    test(`parses ${fixture}`, function() {
      let src = fs.readFileSync(fixtureFilename(fixture, 'md'), 'utf8');
      let node = parse(src, config);
      assert.equal(JSON.stringify(node, null, 2).trim(), expectedOutput(fixture));
    });
  });
}

describe('reactdown/parse', function() {
  describe('directive', function() {
    generateCases('directive-fixture');
  });
});
