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

describe.each([
  [pathToBeforeJson, pathToAfterJson],
  [pathToBeforeYml, pathToAfterYml],
  [pathToBeforeIni, pathToAfterIni],
])('Compare files', (before, after) => {
  test('classic format', () => {
    const expectedRes = fs.readFileSync(getRelativePath('results/classic'), 'utf-8');
    const actualRes = gendiff(before, after, 'classic');
    expect(actualRes).toBe(expectedRes);
  });

  test('plain format', () => {
    const expectedRes = fs.readFileSync(getRelativePath('results/plain'), 'utf-8');
    const actualRes = gendiff(before, after, 'plain');
    expect(actualRes).toBe(expectedRes);
  });

  test('json format', () => {
    const expectedRes = fs.readFileSync(getRelativePath('results/json'), 'utf-8');
    const actualRes = gendiff(before, after, 'json');
    expect(actualRes).toBe(expectedRes);
  });
});
