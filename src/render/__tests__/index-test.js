/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import generate from 'babel-generator';
import {renderToProgram as render} from '../index';

declare function describe(description: string, body: any): void;
declare function it(description: string, body: any): void;

function expectedOutput(name) {
  return fs
    .readFileSync(fixtureFilename(name, 'js'), 'utf8')
    .trim();
}

function fixtureFilename(name, ext) {
  return path.join(__dirname, name) + '.' + ext;
}

function readFixtures(dir) {
  return fs
    .readdirSync(path.join(__dirname, dir))
    .filter(name => /\.json$/.exec(name))
    .map(name => path.join(dir, name.replace(/\.json$/, '')));
}

let config = {
  directives: {
    Block: {source: 'lib', name: 'Block'},
    SubBlock: {source: 'lib/SubBlock', name: 'default'},
    pre: {source: 'lib/pre', name: 'default'},
  }
};

function generateCases(dir, only = null) {
  let fixtures = readFixtures(dir);
  fixtures.forEach(fixture => {
    let test = only === fixture ? it.only : it;
    test(`renders ${fixture}`, function() {
      let src = fs.readFileSync(fixtureFilename(fixture, 'json'), 'utf8');
      let node = JSON.parse(src);
      let jsnode = render(node, config);
      let {code} = generate(jsnode);
      assert.equal(code, expectedOutput(fixture));
    });
  });
}

describe('reactdown/render', function() {
  describe('markdown', function() {
    generateCases('markdown-fixture');
  });
  describe('directive', function() {
    generateCases('directive-fixture');
  });
});
