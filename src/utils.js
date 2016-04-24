/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

export function mapValue<A, B>(
    value: {[key: string]: A},
    func: (value: A, key: string) => B
    ): {[key: string]: B} {
  let result = {};
  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      result[key] = func(value[key], key);
    }
  }
  return result;
}

export function hasIndent(line: string, size: number): boolean {
  for (let i = 0; i < size; i++) {
    if (line.charAt(i) !== ' ') {
      return false;
    }
  }
  return true;
}
