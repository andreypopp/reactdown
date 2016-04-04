/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 */

import assert from 'assert';
import * as types from 'babel-types';
import Renderer from '../Renderer';

describe('reactdown/render', function() {

  describe('Renderer', function() {

    it('keeps track of used identifiers', function() {
      let renderer = new Renderer(types, {
        paragraph: types.identifier('Paragraph')
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
