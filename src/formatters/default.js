#!/usr/bin/env node

const _ = require('lodash');

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

const getDiff = (firstFile, secondFile, deepLevel = 1) => {
  const makeItem = (iKey, iValue, iNewValue) => {
    if (_.isObject(iValue) && _.isObject(iNewValue)) {
      return `${makeDeep(deepLevel)}${iKey}: ${getDiff(iValue, iNewValue, deepLevel + 1)}`;
    }
    return iValue === iNewValue
      ? `${makeDeep(deepLevel)}${iKey}: ${iValue}`
      : [`${makeDeep(deepLevel, '+')}${iKey}: ${stringify(iNewValue, deepLevel + 1)}`,
        `${makeDeep(deepLevel, '-')}${iKey}: ${stringify(iValue, deepLevel + 1)}`].join('\n');
  };
  const firstFileToArr = Object.entries(firstFile);
  const firstDiff = firstFileToArr.map(([key, value]) => {
    if (_.has(secondFile, key)) {
      const newValue = secondFile[key];
      return makeItem(key, value, newValue);
    }
    return `${makeDeep(deepLevel, '-')}${key}: ${stringify(value, deepLevel + 1)}`;
  });
  const secondFileToArr = Object.entries(secondFile);
  const uniqElem = secondFileToArr.filter(([key]) => !(_.has(firstFile, key)));
  const secondDiff = uniqElem.map(([key, value]) => [`${makeDeep(deepLevel, '+')}${key}`, stringify(value, deepLevel + 1)].join(': '));
  return ['{', ...firstDiff, ...secondDiff, `${makeDeep(deepLevel - 1)}}`].join('\n');
};

export default (firstFile, secondFile) => getDiff(firstFile, secondFile);
