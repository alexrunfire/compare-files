#!/usr/bin/env node

const path = require('path');

const yaml = require('js-yaml');

const ini = require('ini');

const fs = require('fs');

export default (firstFilePath, secondFilePath) => {
  const firstFile = fs.readFileSync(firstFilePath, 'utf-8');
  const secondFile = fs.readFileSync(secondFilePath, 'utf-8');
  const fileType = path.extname(firstFilePath);
  if (fileType === '.json') {
    const firstFileJson = JSON.parse(firstFile);
    const secondFileJson = JSON.parse(secondFile);
    return [firstFileJson, secondFileJson];
  }
  if (fileType === '.yml') {
    const firstFileYml = yaml.safeLoad(firstFile);
    const secondFileYml = yaml.safeLoad(secondFile);
    return [firstFileYml, secondFileYml];
  }
  const firstFileIni = ini.parse(firstFile);
  const secondFileIni = ini.parse(secondFile);
  return [firstFileIni, secondFileIni];
};
