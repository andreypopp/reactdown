/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 */

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import generate from 'babel-generator';
import * as types from 'babel-types';
import Renderer from '../Renderer';

function render(node) {
  let renderer = new Renderer(types);
  return renderer.render(node);
}

let fixtures = fs.readdirSync(path.join(__dirname, 'markdown-fixture'))
                 .filter(name => /\.json$/.exec(name))
                 .map(name => name.replace(/\.json$/, ''));

let expectedOutput = name =>
  fs.readFileSync(fixtureFilename(name + '.js'), 'utf8').trim();

let fixtureFilename = name =>
  path.join(__dirname, 'markdown-fixture', name);

describe('reactdown/render', function() {
  describe('markdown', function() {
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
