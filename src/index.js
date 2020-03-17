#!/usr/bin/env node

import parser from './parsers';

const path = require('path');

const _ = require('lodash');

const makeString = (deepLevel, sign = ' ') => (deepLevel === 0 ? '' : `${sign} `.padStart(deepLevel * 4));

const stringify = (object, deepLevel) => {
  const objToArr = Object.entries(object);
  const result = objToArr.map(([key, value]) => (typeof value === 'object' ? `${makeString(deepLevel)}${key}: ${stringify(value, deepLevel + 1)}` : `${makeString(deepLevel)}${key}: ${value}`));
  return ['{', ...result, `${makeString(deepLevel - 1)}}`].join('\n');
};

const getDiff = (firstObj, secondObj, deepLevel = 1) => {
  const firstFileToArr = Object.entries(firstObj);
  const firstDiff = firstFileToArr.map(([key, value]) => {
    if (_.has(secondObj, key)) {
      const newValue = secondObj[key];
      if (typeof value === 'object') {
        if (typeof newValue === 'object') {
          return `${makeString(deepLevel)}${key}: ${getDiff(value, newValue, deepLevel + 1)}`;
        }
        return [`${makeString(deepLevel, '+')}${key}: ${newValue}`, `${makeString(deepLevel, '-')}${key}: ${stringify(value, deepLevel + 1)}`].join('\n');
      }
      if (typeof newValue === 'object') {
        return [`${makeString(deepLevel, '+')}${key}: ${stringify(newValue, deepLevel + 1)}`, `${makeString(deepLevel, '-')}${key}: ${value}`].join('\n');
      }
      if (value === newValue) {
        return `${makeString(deepLevel)}${key}: ${value}`;
      }
      return [`${makeString(deepLevel, '+')}${key}: ${newValue}`, `${makeString(deepLevel, '-')}${key}: ${value}`].join('\n');
    }
    if (typeof value === 'object') {
      return `${makeString(deepLevel, '-')}${key}: ${stringify(value, deepLevel + 1)}`;
    }
    return `${makeString(deepLevel, '-')}${key}: ${value}`;
  });
  const secondFileToArr = Object.entries(secondObj);
  const uniqElem = secondFileToArr.filter(([key]) => !(_.has(firstObj, key)));
  const secondDiff = uniqElem.map(([key, value]) => (typeof value === 'object' ? [`${makeString(deepLevel, '+')}${key}`, stringify(value, deepLevel + 1)].join(': ') : [`${makeString(deepLevel, '+')}${key}`, value].join(': ')));
  const xyi = ['{', ...firstDiff, ...secondDiff, `${makeString(deepLevel - 1)}}`].join('\n');
  return xyi;
};

export default (firstConfig, secondConfig) => {
  const getAbsolutePath = (relativePath) => path.resolve(process.cwd(), relativePath);
  const getFilePath = (pathToFile) => (path.isAbsolute(pathToFile)
    ? pathToFile : getAbsolutePath(pathToFile));
  const firstFilePath = getFilePath(firstConfig);
  const secondFilePath = getFilePath(secondConfig);
  const [firstFile, secondFile] = parser(firstFilePath, secondFilePath);
  return getDiff(firstFile, secondFile);
};
