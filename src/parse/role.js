/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {MDASTAnyNode} from '../types';

import invariant from 'invariant';

const ROLE_TAG_RE = /^:([a-zA-Z\_\-]+):/;
const WORD_RE = /^([^\s\.\,\?!:]+)/;
const QUOTED_WORD_RE = /^`([^`]+)`/;

type ProduceNode = (node: MDASTAnyNode) => void;
type Eat = (value: string) => ProduceNode;

/**
 * Find a possible role.
 *
 * @example
 *   locateRole('foo :class:some'); // 4
 *
 * @param {string} value - Value to search.
 * @param {number} fromIndex - Index to start searching at.
 * @return {number} - Location of possible role sequence.
 */
function locateRole(value: string, fromIndex: number): number {
  return value.indexOf(':', fromIndex);
}

/**
 * Tokenize a role.
 *
 * @example
 *   tokenizeRole(eat, ':class:some');
 *
 * @property {Function} locator - Mention locator.
 * @param {function(string)} eat - Eater.
 * @param {string} value - Rest of content.
 * @param {boolean?} [silent] - Whether this is a dry run.
 * @return {Node?|boolean} - `role` node.
 */
function tokenizeRole(eat: Eat, value: string, silent: boolean) {
  let match = ROLE_TAG_RE.exec(value);

  if (match) {
    if (silent) {
      return true;
    }

    let [token, name] = match;

    // Eat/slice the ':<role name>' but not the trailing ':', we need it later
    // in the word parsing loop.
    eat(token.slice(0, token.length - 1));
    value = value.slice(token.length - 1);

    let words = [];

    while (value[0] === ':' && value[1] !== ':') {
      // Eat slice the leading ':'.
      value = value.slice(1);
      eat(':');

      // parse quoted word (`some word`).
      if (value[0] === '`') {
        let wordMatch = QUOTED_WORD_RE.exec(value);
        invariant(
          wordMatch != null,
          'Failed to parse word from: %s', value
        );
        let [quotedWord, word] = wordMatch;
        eat(quotedWord);
        value = value.slice(quotedWord.length);
        words.push(word);
      // parse regular word
      } else {
        let wordMatch = WORD_RE.exec(value);
        invariant(
          wordMatch != null,
          'Failed to parse word from: %s', value
        );
        let [_, word] = wordMatch;
        eat(word);
        value = value.slice(word.length);
        words.push(word);
      }
    }

    return eat('')({
      type: 'role',
      name,
      words,
      position: null,
      data: null,
    });
  }
}

tokenizeRole.notInLink = true;
tokenizeRole.locator = locateRole;

export default function role() {

  return function(remark: any) {
    let ParserPrototype = remark.Parser.prototype;
    ParserPrototype.inlineTokenizers.role = tokenizeRole;
    ParserPrototype.inlineMethods.splice(
      ParserPrototype.inlineMethods.indexOf('inlineText'),
      0,
      'role'
    );
  };
}
