#!/usr/bin/env node

const _ = require('lodash');

const makeDeep = (deepLevel, sign = ' ') => (deepLevel === 0
  ? '' : `${sign} `.padStart(deepLevel * 4));

const stringify = (object, deepLevel) => {
  const objToArr = Object.entries(object);
  const result = objToArr.map(([key, value]) => (
    typeof value === 'object'
      ? `${makeDeep(deepLevel)}${key}: ${stringify(value, deepLevel + 1)}`
      : `${makeDeep(deepLevel)}${key}: ${value}`));
  return ['{', ...result, `${makeDeep(deepLevel - 1)}}`].join('\n');
};

const getDiff = (firstFile, secondFile, deepLevel = 1) => {
  const firstFileToArr = Object.entries(firstFile);
  const firstDiff = firstFileToArr.map(([key, value]) => {
    if (_.has(secondFile, key)) {
      const newValue = secondFile[key];
      if (typeof value === 'object') {
        return typeof newValue === 'object'
          ? `${makeDeep(deepLevel)}${key}: ${getDiff(value, newValue, deepLevel + 1)}`
          : [`${makeDeep(deepLevel, '+')}${key}: ${newValue}`,
            `${makeDeep(deepLevel, '-')}${key}: ${stringify(value, deepLevel + 1)}`].join('\n');
      }
      if (typeof newValue === 'object') {
        return [
          `${makeDeep(deepLevel, '+')}${key}: ${stringify(newValue, deepLevel + 1)}`,
          `${makeDeep(deepLevel, '-')}${key}: ${value}`,
        ].join('\n');
      }
      return value === newValue
        ? `${makeDeep(deepLevel)}${key}: ${value}`
        : [`${makeDeep(deepLevel, '+')}${key}: ${newValue}`,
          `${makeDeep(deepLevel, '-')}${key}: ${value}`].join('\n');
    }
    return typeof value === 'object'
      ? `${makeDeep(deepLevel, '-')}${key}: ${stringify(value, deepLevel + 1)}`
      : `${makeDeep(deepLevel, '-')}${key}: ${value}`;
  });
  const secondFileToArr = Object.entries(secondFile);
  const uniqElem = secondFileToArr.filter(([key]) => !(_.has(firstFile, key)));
  const secondDiff = uniqElem.map(([key, value]) => (
    typeof value === 'object'
      ? [`${makeDeep(deepLevel, '+')}${key}`, stringify(value, deepLevel + 1)].join(': ')
      : [`${makeDeep(deepLevel, '+')}${key}`, value].join(': ')));
  return ['{', ...firstDiff, ...secondDiff, `${makeDeep(deepLevel - 1)}}`].join('\n');
};

export default (firstFile, secondFile) => getDiff(firstFile, secondFile);
