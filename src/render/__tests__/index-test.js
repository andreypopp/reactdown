/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import generate from 'babel-generator';
import * as model from '../../model';
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
    Pre: {
      component: {source: 'lib', name: 'Pre'},
    },
    Children: {
      component: {source: 'lib', name: 'Children'},
    },
    Line: {
      component: {source: 'lib', name: 'Line'},
    },
    Data: {
      component: {source: 'lib', name: 'Data'},
    },
    DataChildren: {
      component: {source: 'lib', name: 'DataChildren'},
    },
    Plain: {
      component: {source: 'lib', name: 'Plain'},
    },
  },
  roles: {
    mod: {
      component: {source: 'roles', name: 'mod'},
    },
    GHIssue: {
      component: {source: 'roles', name: 'GHIssue'},
    },
    GHBranch: {
      component: {source: 'roles', name: 'GHBranch'},
    },
  },
  build: null,
  buildImageURL: url => url,
  components: null,
  model: model,
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
  describe('role', function() {
    generateCases('role-fixture');
  });
});
