#!/usr/bin/env node

import parser from './parsers';

const path = require('path');

const _ = require('lodash');

export default (firstConfig, secondConfig) => {
  const getAbsolutePath = (relativePath) => path.resolve(process.cwd(), relativePath);
  const getFilePath = (pathToFile) => (path.isAbsolute(pathToFile)
    ? pathToFile : getAbsolutePath(pathToFile));
  const firstFilePath = getFilePath(firstConfig);
  const secondFilePath = getFilePath(secondConfig);
  const [firstFile, secondFile] = parser(firstFilePath, secondFilePath);
  const firstFileToArr = Object.entries(firstFile);
  const secondFileToArr = Object.entries(secondFile);
  const getElemToSt = (key, value, indicator = ' ') => `  ${indicator} ${[key, value].join(': ')}`;
  const firstDiff = firstFileToArr.reduce((acc, item) => {
    const [key, value] = item;
    if (_.has(secondFile, key)) {
      const newValue = secondFile[key];
      if (newValue === value) {
        return [...acc, getElemToSt(key, value)];
      }
      return [...acc, getElemToSt(key, newValue, '+'), getElemToSt(key, value, '-')];
    }
    return [...acc, getElemToSt(key, value, '-')];
  }, []);
  const resultDiff = secondFileToArr.reduce(
    (acc, [key, value]) => (_.has(firstFile, key) ? acc : [...acc, getElemToSt(key, value, '+')]),
    firstDiff,
  );
  const resultInArr = ['{', ...resultDiff, '}'];
  const result = resultInArr.join('\n');
  console.log(result);
  return result;
};
