import path from 'path';

import gendiff from '../src';

const getAbsolutePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const getRelativePath = (fileName) => path.join('__fixtures__', fileName);

const result = [
  '{',
  '    common: {',
  '        setting1: Value 1',
  '      - setting2: 200',
  '      + setting3: {',
  '            key: value',
  '        }',
  '      - setting3: true',
  '        setting6: {',
  '            key: value',
  '          + ops: vops',
  '        }',
  '      + follow: false',
  '      + setting4: blah blah',
  '      + setting5: {',
  '            key5: value5',
  '        }',
  '    }',
  '    group1: {',
  '      + baz: bars',
  '      - baz: bas',
  '        foo: bar',
  '      + nest: str',
  '      - nest: {',
  '            key: value',
  '        }',
  '    }',
  '  - group2: {',
  '        abc: 12345',
  '    }',
  '  + group3: {',
  '        fee: 100500',
  '    }',
  '}',
].join('\n');

test.each([
  [getAbsolutePath('before.json'), getRelativePath('after.json'), result],
  [getRelativePath('before.yml'), getAbsolutePath('after.yml'), result],
  [getRelativePath('before.ini'), getRelativePath('after.ini'), result],
])('Find difference', (before, after, expected) => expect(gendiff(before, after)).toBe(expected));
