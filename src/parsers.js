#!/usr/bin/env node

const path = require('path');

const yaml = require('js-yaml');

const ini = require('ini');

const fs = require('fs');

export default (firstFilePath, secondFilePath) => {
  const firstFile = fs.readFileSync(firstFilePath, 'utf-8');
  const secondFile = fs.readFileSync(secondFilePath, 'utf-8');
  const firstFileExt = path.extname(firstFilePath);
  const secondFileExt = path.extname(firstFilePath);
  if (!(firstFileExt === secondFileExt)) {
    return 'Extensions of files must be equal';
  }
  switch (firstFileExt) {
    case '.json':
      return [JSON.parse(firstFile), JSON.parse(secondFile)];

    case '.yml':
      return [yaml.safeLoad(firstFile), yaml.safeLoad(secondFile)];

    case '.ini':
      return [ini.parse(firstFile), ini.parse(secondFile)];

    default:
      return 'Incorrect extension';
  }
};
