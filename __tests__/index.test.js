import path from 'path';

import gendiff from '../src';

describe('Find difference', () => {
  const getAbsolutePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
  const getRelativePath = (fileName) => path.join('__fixtures__', fileName);

  test('compare json files', () => {
    const beforeJson = getAbsolutePath('before.json');
    const afterJson = getRelativePath('after.json');
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
    expect(gendiff(beforeJson, afterJson)).toEqual(result);
  });

  test('compare yml files', () => {
    const beforeYml = getRelativePath('before.yml');
    const afterYml = getAbsolutePath('after.yml');
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
    expect(gendiff(beforeYml, afterYml)).toEqual(result);
  });
});
