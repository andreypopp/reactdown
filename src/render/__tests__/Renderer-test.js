/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import assert from 'assert';
import * as types from 'babel-types';
import Renderer from '../Renderer';

declare function describe(description: string, body: any): void;
declare function it(description: string, body: any): void;

describe('reactdown/render', function() {

  describe('Renderer', function() {

    it('keeps track of used identifiers', function() {
      let renderer = new Renderer({
        types: null,
        markdownComponents: {
          paragraph: types.identifier('Paragraph')
        },
        blockComponents: null,
      });
      renderer.render({
        type: 'paragraph',
        children: [
          {type: 'text', value: 'Hello'}
        ]
      });
      assert(renderer.identifiersUsed.length === 1);
      assert(renderer.identifiersUsed[0].name === 'Paragraph');
    });

  });

});
