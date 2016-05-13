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
      let nextValue = func(value[key], key);
      if (nextValue !== undefined) {
        result[key] = nextValue;
      }
    }
  }
  return result;
}

export function filterUndefined(value: Object): Object {
  return mapValue(value, value => value);
}

export function hasIndent(line: string, size: number): boolean {
  for (let i = 0; i < size; i++) {
    if (line.charAt(i) !== ' ') {
      return false;
    }
  }
  return true;
}
