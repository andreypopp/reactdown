/**
 * @copyright 2016-present, Reactdown team
 * @flow
 */

import invariant from 'invariant';

import {
  ComponentReference as Reference,
  parse as parseReference
} from './ComponentRef';

export class ValidationError extends Error {

  isValidationError: boolean;

  constructor(message: string) {
    super(message);
    this.isValidationError = true;
  }
}

export class Node {

  validate(_value: any) {
    let message = `${this.constructor.name}.validate(value) is not implemented`;
    throw new ValidationError(message);
  }
}

class AnyNode extends Node {

  validate(value: any) {
    if (value == null) {
      throw new ValidationError(`expected a value but got: ${value === null ? 'null' : 'undefined'}`);
    }
    return value;
  }
}

export let any = new AnyNode();

class MappingNode extends Node {

  valueNode: Node;

  constructor(valueNode: Node = any) {
    super();
    this.valueNode = valueNode;
  }

  validate(value: any) {
    if (!(value !== null && typeof value === 'object' && !Array.isArray(value))) {
      throw new ValidationError(`expected mapping but got: ${typeof value}`);
    }
    let result = {};
    let keys = Object.keys(value);
    for (let i = 0; i < keys.length; i++) {
      result[keys[i]] = this.valueNode.validate(value[keys[i]]);
    }
    return result;
  }
}

export function mapping(valueNode: Node) {
  return new MappingNode(valueNode);
}

class ObjectNode extends Node {

  spec: {[name: string]: Node};
  specKeys: Array<string>;
  defaults: Object;

  constructor(spec: {[name: string]: Node}, defaults: Object = {}) {
    super();
    this.spec = spec;
    this.specKeys = Object.keys(spec);
    this.defaults = defaults;
  }

  validate(value: any) {
    if (!(value !== null && typeof value === 'object' && !Array.isArray(value))) {
      throw new ValidationError(`expected mapping but got: ${typeof value}`);
    }

    let result = {};
    for (let i = 0; i < this.specKeys.length; i++) {
      let key = this.specKeys[i];
      if (value[key] === undefined) {
        if (this.defaults[key] !== undefined) {
          result[key] = this.defaults[key];
        } else {
          throw new ValidationError(`expected a value for key: ${key}`);
        }
      } else {
        result[key] = this.spec[key].validate(value[key]);
      }
    }

    let keys = Object.keys(value);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (this.spec[key] === undefined) {
        if (this.defaults[key] !== undefined) {
          result[key] = this.defaults[key];
        } else {
          throw new ValidationError(`found an unexpected key: ${key}`);
        }
      }
    }

    return result;
  }
}

export function object(spec: {[name: string]: Node}, defaults: {[name: string]: any}) {
  return new ObjectNode(spec, defaults);
}

class SequenceNode extends Node {

  valueNode: Node;

  constructor(valueNode: Node = any) {
    super();
    this.valueNode = valueNode;
  }

  validate(value: any) {
    if (!Array.isArray(value)) {
      throw new ValidationError(`expected sequence but got: ${typeof value}`);
    }
    let result: Array<any> = [];
    for (let i = 0; i < value.length; i++) {
      result[i] = this.valueNode.validate(value[i]);
    }
    return result;
  }
}

export function sequence(valueNode: Node) {
  return new SequenceNode(valueNode);
}

class MaybeNode extends Node {

  valueNode: Node;

  constructor(valueNode: Node) {
    super();
    this.valueNode = valueNode;
  }

  validate(value: any) {
    if (value == null) {
      return null;
    }
    return this.valueNode.validate(value);
  }
}

export function maybe(valueNode: Node) {
  return new MaybeNode(valueNode);
}

class OneOfNode extends Node {

  nodes: Array<Node>;

  constructor(nodes: Array<Node>) {
    super();
    this.nodes = nodes;
  }

  validate(value: any) {
    let errors = [];
    for (let i = 0; i < this.nodes.length; i++) {
      try {
        return this.nodes[i].validate(value);
      } catch (error) {
        if (error.isValidationError) {
          errors.push(error);
          continue;
        } else {
          throw error;
        }
      }
    }
    invariant(
      errors.length > 0,
      'Impossible happened'
    );
    throw new ValidationError(errors.map(error => error.message).join(', '));
  }
}

export function oneOf(...nodes: Array<Node>) {
  return new OneOfNode(nodes);
}

class StringNode extends Node {

  validate(value: any) {
    if (typeof value !== 'string') {
      throw new ValidationError(`expected string but got: ${typeof value}`);
    }
    return value;
  }
}

export let string = new StringNode();

class NumberNode extends Node {

  validate(value: any) {
    if (typeof value !== 'number') {
      throw new ValidationError(`expected number but got: ${typeof value}`);
    }
    return value;
  }
}

export let number = new NumberNode();

class BooleanNode extends Node {

  validate(value: any) {
    if (typeof value !== 'boolean') {
      throw new ValidationError(`expected boolean but got: ${typeof value}`);
    }
    return value;
  }
}

export let boolean = new BooleanNode();

class ReferenceNode extends Node {

  validate(value: any) {
    if (value instanceof Reference) {
      return value;
    }
    if (typeof value !== 'string') {
      throw new ValidationError(`expected string but got: ${typeof value}`);
    }
    return parseReference(value);
  }
}

export let reference = new ReferenceNode();

export function validate(schema: Node, value: any): any {
  return schema.validate(value);
}
