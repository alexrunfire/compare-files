#!/usr/bin/env node

import _ from 'lodash';

const makeDeep = (deepLevel, sign = ' ') => (deepLevel === 0
  ? '' : `${sign} `.padStart(deepLevel * 4));

const stringify = (value, deepLevel) => {
  if (!_.isObject(value)) {
    return value;
  }
  const valToArr = Object.entries(value);
  const result = valToArr.map(([key, newValue]) => (
    _.isObject(newValue)
      ? `${makeDeep(deepLevel)}${key}: ${stringify(newValue, deepLevel + 1)}`
      : `${makeDeep(deepLevel)}${key}: ${newValue}`));
  return ['{', ...result, `${makeDeep(deepLevel - 1)}}`].join('\n');
};

const getDiff = (diff, deepLevel) => {
  const tapForm = diff.map((item) => {
    const {
      status, key, value, previousValue,
    } = item;
    switch (status) {
      case 'complex':
        return `${makeDeep(deepLevel)}${key}: ${getDiff(value, deepLevel + 1)}`;

      case 'unchanged':
        return `${makeDeep(deepLevel)}${key}: ${value}`;

      case 'changed':
        return [`${makeDeep(deepLevel, '+')}${key}: ${stringify(value, deepLevel + 1)}`,
          `${makeDeep(deepLevel, '-')}${key}: ${stringify(previousValue, deepLevel + 1)}`].join('\n');

      case 'deleted':
        return `${makeDeep(deepLevel, '-')}${key}: ${stringify(value, deepLevel + 1)}`;

      case 'added':
        return [`${makeDeep(deepLevel, '+')}${key}`, stringify(value, deepLevel + 1)].join(': ');

      default:
        throw new Error('Error!');
    }
  });
  return ['{', ...tapForm, `${makeDeep(deepLevel - 1)}}`].join('\n');
};

export default (diff) => getDiff(diff, 1);
