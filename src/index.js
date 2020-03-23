#!/usr/bin/env node

import parser from './parsers';

import getDefault from './formatters/default';

import getPlain from './formatters/plain';

import getJSON from './formatters/json';

const path = require('path');

const _ = require('lodash');

export default (firstConfig, secondConfig, format) => {
  const getAbsolutePath = (relativePath) => path.resolve(process.cwd(), relativePath);
  const getFilePath = (pathToFile) => (path.isAbsolute(pathToFile)
    ? pathToFile : getAbsolutePath(pathToFile));
  const firstFilePath = getFilePath(firstConfig);
  const secondFilePath = getFilePath(secondConfig);
  const parcedFiles = parser(firstFilePath, secondFilePath);
  if (_.isString(parcedFiles)) {
    return parcedFiles;
  }
  const [firstFile, secondFile] = parcedFiles;
  const getDifference = () => {
    switch (format) {
      case 'default':
        return getDefault(firstFile, secondFile);

      case 'plain':
        return getPlain(firstFile, secondFile);

      case 'JSON':
        return getJSON(firstFile, secondFile);

      default:
        return 'The format is incorrect.';
    }
  };
  const difference = getDifference();
  console.log(difference);
  return difference;
};
