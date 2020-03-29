#!/usr/bin/env node

import parse from './parsers';

import getTap from './formatters/tap';

import getStylish from './formatters/stylish';

import getJSON from './formatters/json';

const path = require('path');

const fs = require('fs');

const _ = require('lodash');

const getAbsolutePath = (relativePath) => path.resolve(process.cwd(), relativePath);
const getFilePath = (pathToFile) => (path.isAbsolute(pathToFile)
  ? pathToFile : getAbsolutePath(pathToFile));

export default (firstConfig, secondConfig, format) => {
  const firstFilePath = getFilePath(firstConfig);
  const secondFilePath = getFilePath(secondConfig);
  const firstFile = fs.readFileSync(firstFilePath, 'utf-8');
  const secondFile = fs.readFileSync(secondFilePath, 'utf-8');
  const firstFileExt = path.extname(firstConfig);
  const secondFileExt = path.extname(secondConfig);
  const filesExt = _.uniq([firstFileExt, secondFileExt]).join('');
  const firstFileParsed = parse(firstFile, filesExt);
  const secondFileParsed = parse(secondFile, filesExt);
  switch (format) {
    case 'tap':
      return getTap(firstFileParsed, secondFileParsed);

    case 'stylish':
      return getStylish(firstFileParsed, secondFileParsed);

    case 'json':
      return getJSON(firstFileParsed, secondFileParsed);

    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};
