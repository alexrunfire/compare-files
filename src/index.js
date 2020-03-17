#!/usr/bin/env node

import parser from './parsers';

const path = require('path');

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

const getDiff = (firstObj, secondObj, deepLevel = 1) => {
  const firstFileToArr = Object.entries(firstObj);
  const firstDiff = firstFileToArr.map(([key, value]) => {
    if (_.has(secondObj, key)) {
      const newValue = secondObj[key];
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
  const secondFileToArr = Object.entries(secondObj);
  const uniqElem = secondFileToArr.filter(([key]) => !(_.has(firstObj, key)));
  const secondDiff = uniqElem.map(([key, value]) => (
    typeof value === 'object'
      ? [`${makeDeep(deepLevel, '+')}${key}`, stringify(value, deepLevel + 1)].join(': ')
      : [`${makeDeep(deepLevel, '+')}${key}`, value].join(': ')));
  return ['{', ...firstDiff, ...secondDiff, `${makeDeep(deepLevel - 1)}}`].join('\n');
};

export default (firstConfig, secondConfig) => {
  const getAbsolutePath = (relativePath) => path.resolve(process.cwd(), relativePath);
  const getFilePath = (pathToFile) => (path.isAbsolute(pathToFile)
    ? pathToFile : getAbsolutePath(pathToFile));
  const firstFilePath = getFilePath(firstConfig);
  const secondFilePath = getFilePath(secondConfig);
  const [firstFile, secondFile] = parser(firstFilePath, secondFilePath);
  const difference = getDiff(firstFile, secondFile);
  console.log(difference);
  return difference;
};
