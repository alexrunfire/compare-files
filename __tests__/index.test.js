import path from 'path';

import gendiff from '../src';

describe('Find difference', () => {
  const getAbsolutePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
  const getRelativePath = (fileName) => path.join('__fixtures__', fileName);

  test('compare json files', () => {
    const before = getAbsolutePath('before.json');
    const after = getRelativePath('after.json');
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
    expect(gendiff(before, after)).toEqual(result);
  });

  test('compare yml files', () => {
    const before = getRelativePath('before.yml');
    const after = getAbsolutePath('after.yml');
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
    expect(gendiff(before, after)).toEqual(result);
  });
});
