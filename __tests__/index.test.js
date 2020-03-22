import path from 'path';

import gendiff from '../src';

const fs = require('fs');

const getAbsolutePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const getRelativePath = (fileName) => path.join('__fixtures__', fileName);

const defaultRes = fs.readFileSync(getRelativePath('results/default'), 'utf-8');
const plainRes = fs.readFileSync(getRelativePath('results/plain'), 'utf-8');
const jsonRes = fs.readFileSync(getRelativePath('results/json'), 'utf-8');

test.each([
  [getAbsolutePath('before.json'), getRelativePath('after.json'), 'default', defaultRes],
  [getRelativePath('before.yml'), getAbsolutePath('after.yml'), 'default', defaultRes],
  [getRelativePath('before.ini'), getRelativePath('after.ini'), 'default', defaultRes],
  [getAbsolutePath('before.json'), getRelativePath('after.json'), 'plain', plainRes],
  [getRelativePath('before.yml'), getAbsolutePath('after.yml'), 'plain', plainRes],
  [getRelativePath('before.ini'), getRelativePath('after.ini'), 'plain', plainRes],
  [getAbsolutePath('before.json'), getRelativePath('after.json'), 'JSON', jsonRes],
  [getRelativePath('before.yml'), getAbsolutePath('after.yml'), 'JSON', jsonRes],
  [getRelativePath('before.ini'), getRelativePath('after.ini'), 'JSON', jsonRes],
])('Find difference', (before, after, format, expected) => expect(gendiff(before, after, format)).toBe(expected));
