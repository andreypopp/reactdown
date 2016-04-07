/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import type {JSAST, JSASTFactory} from '../types';

export default function buildImport(
    build: JSASTFactory,
    source: string,
    localName: string,
    importedName: string = 'default'): JSAST {
  let specifier;
  if (importedName === 'default') {
    specifier = build.importDefaultSpecifier(
      build.identifier(localName));
  } else {
    specifier = build.importSpecifier(
      build.identifier(localName),
      build.identifier(importedName));
  }
  return build.importDeclaration(
    [specifier],
    build.stringLiteral(source));
}
