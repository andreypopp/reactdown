/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

// TODO: More robust regexpes required!
const PARSE_REF_RE = /^([a-zA-Z0-9\._\-\/]+)(\?([a-zA-Z0-9_]+))?$/;
const PARSE_NAMED_REF_RE = /^([a-zA-Z0-9_]+)=([a-zA-Z0-9_\.\-\/]+)(\?([a-zA-Z0-9_]+))?$/;

export type ComponentRef = {
  source: string;
  name: ?string;
};

export class ComponentReference {

  source: string;
  name: ?string;

  constructor(source: string, name: ?string) {
    this.source = source;
    this.name = name;
  }
}

export function parse(ref: string): ?ComponentRef {
  let match = PARSE_REF_RE.exec(ref);
  if (!match) {
    return null;
  }
  let [_everything, source, _nothing, name = 'default'] = match;
  return new ComponentReference(source, name);
}

export function parseNamed(ref: string): ?{id: string; ref: ComponentRef} {
  let match = PARSE_NAMED_REF_RE.exec(ref);
  if (!match) {
    return null;
  }
  let [_everything, id, source, _nothing, name = 'default'] = match;
  return {id, ref: new ComponentReference(source, name)};
}

export function resolve(ref: string | ?ComponentRef): any {
  if (typeof ref === 'string') {
    ref = parse(ref);
  }
  if (ref == null) {
    return null;
  }
  // $FlowIssue: not a flow issue, we are just being smart here
  return require(ref.source)[ref.name];
}
