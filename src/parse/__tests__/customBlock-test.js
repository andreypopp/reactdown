/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 */

import test from 'ava';
import fs from 'fs';
import path from 'path';
import parse from '../index';

let fixtures = fs.readdirSync('./customBlock-fixture')
                 .filter(fixture => /\.md$/.exec(fixture));

let expectedOutput = name =>
  fs.readFileSync(fixtureFilename(name.replace(/\.md$/, '.json')), 'utf8').trim();

let fixtureFilename = name =>
  path.join('./customBlock-fixture', name);

fixtures.forEach(name => {
  test(`customBlock: ${name.replace(/\.md$/, '')}`, test => {
    let src = fs.readFileSync(fixtureFilename(name), 'utf8');
    let node = parse(src);
    test.is(JSON.stringify(node, null, 2).trim(), expectedOutput(name));
  });
});
