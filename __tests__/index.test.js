import path from 'path';

import fs from 'fs';

import gendiff from '../src';

const getAbsolutePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const getRelativePath = (fileName) => path.join('__fixtures__', fileName);

let tapRes;
let stylishRes;
let jsonRes;
beforeAll(() => {
  tapRes = fs.readFileSync(getRelativePath('results/tap'), 'utf-8');
  stylishRes = fs.readFileSync(getRelativePath('results/stylish'), 'utf-8');
  jsonRes = fs.readFileSync(getRelativePath('results/json'), 'utf-8');
});

describe.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])('Compare files', (before, after) => {
  let pathToBefore;
  let pathToAfter;
  beforeAll(() => {
    pathToBefore = getAbsolutePath(before);
    pathToAfter = getRelativePath(after);
  });

  test('tap format', () => expect(gendiff(pathToBefore, pathToAfter, 'tap')).toBe(tapRes));

  test('stylish format', () => expect(gendiff(pathToBefore, pathToAfter, 'stylish')).toBe(stylishRes));

  test('json format', () => expect(gendiff(pathToBefore, pathToAfter, 'json')).toBe(jsonRes));
});
