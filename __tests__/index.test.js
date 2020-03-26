import path from 'path';

import fs from 'fs';

import gendiff from '../src';

const getAbsolutePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const getRelativePath = (fileName) => path.join('__fixtures__', fileName);

const pathToBeforeJson = getAbsolutePath('before.json');
const pathToAfterJson = getRelativePath('after.json');
const pathToBeforeYml = getRelativePath('before.yml');
const pathToAfterYml = getAbsolutePath('after.yml');
const pathToBeforeIni = getAbsolutePath('before.ini');
const pathToAfterIni = getRelativePath('after.ini');

const classicRes = fs.readFileSync(getRelativePath('results/classic'), 'utf-8');
const plainRes = fs.readFileSync(getRelativePath('results/plain'), 'utf-8');
const jsonRes = fs.readFileSync(getRelativePath('results/json'), 'utf-8');

describe.each([
  [pathToBeforeJson, pathToAfterJson],
  [pathToBeforeYml, pathToAfterYml],
  [pathToBeforeIni, pathToAfterIni],
])('Compare files', (before, after) => {
  test('classic format', () => expect(gendiff(before, after, 'classic')).toBe(classicRes));

  test('plain format', () => expect(gendiff(before, after, 'plain')).toBe(plainRes));

  test('json format', () => expect(gendiff(before, after, 'json')).toBe(jsonRes));
});
