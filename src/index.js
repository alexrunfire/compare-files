#!/usr/bin/env node

import parse from './parsers';

import getClassic from './formatters/classic';

import getPlain from './formatters/plain';

import getJSON from './formatters/json';

const path = require('path');

const fs = require('fs');

const _ = require('lodash');

export default (firstConfig, secondConfig, format) => {
  const getAbsolutePath = (relativePath) => path.resolve(process.cwd(), relativePath);
  const getFilePath = (pathToFile) => (path.isAbsolute(pathToFile)
    ? pathToFile : getAbsolutePath(pathToFile));
  const firstFilePath = getFilePath(firstConfig);
  const secondFilePath = getFilePath(secondConfig);
  const firstFile = fs.readFileSync(firstFilePath, 'utf-8');
  const secondFile = fs.readFileSync(secondFilePath, 'utf-8');
  const firstFileExt = path.extname(firstFilePath);
  const secondFileExt = path.extname(secondFilePath);
  const filesExt = _.uniq([firstFileExt, secondFileExt]).join('');
  const parcedFiles = parse(firstFile, secondFile, filesExt);
  const [firstFileParced, secondFileParced] = parcedFiles;
  switch (format) {
    case 'classic':
      return getClassic(firstFileParced, secondFileParced);

    case 'plain':
      return getPlain(firstFileParced, secondFileParced);

    case 'json':
      return getJSON(firstFileParced, secondFileParced);

    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};
