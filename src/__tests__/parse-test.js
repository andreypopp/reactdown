/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 */

import test from 'ava';
import parse from '../parse';

test('parsign custom blocks (simplest)', t => {
  let src = `
Prologue

::Dialogue

Epilogue
`.trim();
  let nodes = parse(src).children;
  t.ok(nodes.length === 3);
  let [p1, block, p2] = nodes;

  t.ok(p1.type === 'paragraph');
  t.ok(p1.children.length === 1);
  t.ok(p1.children[0].value  === 'Prologue');

  t.ok(block.type === 'customBlock');
  t.ok(block.name === 'Dialogue');
  t.ok(block.children.length === 0);

  t.ok(p2.type === 'paragraph');
  t.ok(p2.children.length === 1);
  t.ok(p2.children[0].value  === 'Epilogue');
});


test('parsign custom blocks (with single line content)', t => {
  let src = `
Prologue

::Dialogue

  wow

Epilogue
`.trim();
  let nodes = parse(src).children;
  t.ok(nodes.length === 3);
  let [p1, block, p2] = nodes;
  t.ok(p1.type === 'paragraph');
  t.ok(p1.children.length === 1);
  t.ok(p1.children[0].value  === 'Prologue');

  t.ok(block.type === 'customBlock');
  t.ok(block.name === 'Dialogue');
  t.ok(block.children.length === 1);
  t.ok(block.children[0].type === 'paragraph');
  t.ok(block.children[0].children.length === 1);
  t.ok(block.children[0].children[0].value === 'wow');

  t.ok(p2.type === 'paragraph');
  t.ok(p2.children.length === 1);
  t.ok(p2.children[0].value  === 'Epilogue');
});

test('parsign custom blocks (with multi line content)', t => {
  let src = `
Prologue

::Dialogue

  wow

  this is incredible,
  isn't it?

Epilogue
`.trim();
  let nodes = parse(src).children;
  t.ok(nodes.length === 3);
  let [p1, block, p2] = nodes;
  t.ok(p1.type === 'paragraph');
  t.ok(p1.children.length === 1);
  t.ok(p1.children[0].value  === 'Prologue');

  t.ok(block.type === 'customBlock');
  t.ok(block.name === 'Dialogue');
  t.ok(block.children.length === 2);
  t.ok(block.children[0].type === 'paragraph');
  t.ok(block.children[0].children.length === 1);
  t.ok(block.children[0].children[0].value === 'wow');
  t.ok(block.children[1].type === 'paragraph');
  t.ok(block.children[1].children.length === 1);
  t.ok(block.children[1].children[0].value === "this is incredible,\nisn't it?");

  t.ok(p2.type === 'paragraph');
  t.ok(p2.children.length === 1);
  t.ok(p2.children[0].value  === 'Epilogue');
});
