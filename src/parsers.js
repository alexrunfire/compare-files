#!/usr/bin/env node

const path = require('path');

const yaml = require('js-yaml');

const fs = require('fs');

export default (firstFilePath, secondFilePath) => {
  const firstFile = fs.readFileSync(firstFilePath);
  const secondFile = fs.readFileSync(secondFilePath);
  const fileType = path.extname(firstFilePath);
  if (fileType === '.json') {
    const firstFileJson = JSON.parse(firstFile);
    const secondFileJson = JSON.parse(secondFile);
    return [firstFileJson, secondFileJson];
  }
  const firstFileYml = yaml.safeLoad(firstFile);
  const secondFileYml = yaml.safeLoad(secondFile);
  return [firstFileYml, secondFileYml];
};
