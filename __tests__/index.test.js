import path from 'path';

import gendiff from '../src';

describe('Find difference', () => {
  const getAbsolutePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
  const getRelativePath = (fileName) => path.join('__fixtures__', fileName);

  test('Functionality', () => {
    const before = getAbsolutePath('before1.json');
    const after = getRelativePath('after1.json');
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

  test('Empty files', () => {
    const before = getRelativePath('before2.json');
    const after = getAbsolutePath('after2.json');
    const result = '{\n}';
    expect(gendiff(before, after)).toEqual(result);
  });
});
