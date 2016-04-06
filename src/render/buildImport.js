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
    specifier = build.importDefaultSpecifier(localName);
  } else {
    specifier = build.importSpecifier(localName, importedName);
  }
  return build.importDeclaration([specifier], source);
}
