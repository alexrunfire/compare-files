import path from 'path';

import gendiff from '../src';

const getAbsolutePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const getRelativePath = (fileName) => path.join('__fixtures__', fileName);

const result = [
  '{',
  '    host: hexlet.io',
  '  + timeout: 20',
  '  - timeout: 50',
  '  - proxy: 123.234.53.22',
  '    name: noname',
  '  - follow: false',
  '  + verbose: true',
  '}',
].join('\n');

test.each([
  [getAbsolutePath('before.json'), getRelativePath('after.json'), result],
  [getRelativePath('before.yml'), getAbsolutePath('after.yml'), result],
  [getRelativePath('before.ini'), getRelativePath('after.ini'), result],
])('Find difference', (before, after, expected) => expect(gendiff(before, after)).toBe(expected));
