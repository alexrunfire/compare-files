#!/usr/bin/env node

import parser from './parsers';

import getClassic from './formatters/classic';

import getPlain from './formatters/plain';

const path = require('path');

export default (firstConfig, secondConfig, format) => {
  const getAbsolutePath = (relativePath) => path.resolve(process.cwd(), relativePath);
  const getFilePath = (pathToFile) => (path.isAbsolute(pathToFile)
    ? pathToFile : getAbsolutePath(pathToFile));
  const firstFilePath = getFilePath(firstConfig);
  const secondFilePath = getFilePath(secondConfig);
  const [firstFile, secondFile] = parser(firstFilePath, secondFilePath);
  const getDifference = () => {
    switch (format) {
      case 'classic':
        return getClassic(firstFile, secondFile);

      case 'plain':
        return getPlain(firstFile, secondFile);

      default:
        return 'The format is incorrect.';
    }
  };
  const difference = getDifference();
  console.log(difference);
  return difference;
};
