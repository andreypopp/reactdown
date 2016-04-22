/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module unist:util:remove-position
 * @fileoverview Remove `position`s from a unist tree.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var visit = require('unist-util-visit');

/**
 * Remove `position`s from `tree`.
 *
 * @param {Node} tree - Node.
 * @return {Node} - Node without `position`s.
 */
function removePosition(tree) {
    visit(tree, function (node) {
        node.position = undefined;
    });

    return tree;
}

/*
 * Expose.
 */

module.exports = removePosition;
