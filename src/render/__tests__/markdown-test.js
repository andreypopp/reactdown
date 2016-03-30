/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 */

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import generate from 'babel-generator';
import render from '../index';

let fixtures = fs.readdirSync(path.join(__dirname, 'markdown-fixture'))
                 .filter(name => /\.json$/.exec(name))
                 .map(name => name.replace(/\.json$/, ''));

let expectedOutput = name =>
  fs.readFileSync(fixtureFilename(name + '.js'), 'utf8').trim();

let fixtureFilename = name =>
  path.join(__dirname, 'markdown-fixture', name);

describe('reactdown/parse', function() {
  describe('customBlock', function() {
    fixtures.forEach(name => {
      it(`render markdown: ${name}`, function() {
        let src = fs.readFileSync(fixtureFilename(name + '.json'), 'utf8');
        let node = JSON.parse(src);
        let {code} = generate(render(node));
        assert.equal(code, expectedOutput(name));
      });
    });
  });
});
