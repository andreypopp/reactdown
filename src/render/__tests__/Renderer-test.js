/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import * as build from 'babel-types';
import {Renderer} from '../Renderer';

it('keeps track of used identifiers', function() {
  let renderer = new Renderer({
    directives: {
      Paragraph: build.identifier('Paragraph')
    },
    roles: {},
    build: build,
    buildImageURL: url => url,
  });
  renderer.render({
    type: 'root',
    children: [
      {
        type: 'directive',
        name: 'Paragraph',
        children: [
          {type: 'text', value: 'Hello'}
        ]
      }
    ]
  });
  expect(renderer.identifiersUsed.length).toEqual(1);
  expect(renderer.identifiersUsed[0].name).toEqual('Paragraph');
});

it('do not duplicatyes usages', function() {
  let renderer = new Renderer({
    directives: {
      Paragraph: build.identifier('Paragraph')
    },
    roles: {},
    build: build,
    buildImageURL: url => url,
  });
  renderer.render({
    type: 'root',
    children: [
      {
        type: 'directive',
        name: 'Paragraph',
        children: [
          {type: 'text', value: 'Hello'}
        ]
      },
      {
        type: 'paragraph',
        children: [
          {type: 'text', value: 'Hello'}
        ]
      }
    ]
  });
  expect(renderer.identifiersUsed.length).toEqual(1);
  expect(renderer.identifiersUsed[0].name).toEqual('Paragraph');
});
