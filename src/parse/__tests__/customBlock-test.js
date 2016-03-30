/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 */

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import parse from '../index';

let fixtures = fs.readdirSync(path.join(__dirname, 'customBlock-fixture'))
                 .filter(name => /\.md$/.exec(name))
                 .map(name => name.replace(/\.md$/, ''));

let expectedOutput = name =>
  fs.readFileSync(fixtureFilename(name + '.json'), 'utf8').trim();

let fixtureFilename = name =>
  path.join(__dirname, 'customBlock-fixture', name);

describe('reactdown/parse', function() {
  describe('customBlock', function() {
    fixtures.forEach(name => {
      it(`customBlock: ${name}`, function() {
        let src = fs.readFileSync(fixtureFilename(name + '.md'), 'utf8');
        let node = parse(src);
        assert.equal(JSON.stringify(node, null, 2).trim(), expectedOutput(name));
      });
    });
  });
});
