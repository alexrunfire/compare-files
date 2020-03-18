import path from 'path';

import gendiff from '../src';

const getAbsolutePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const getRelativePath = (fileName) => path.join('__fixtures__', fileName);

const classicResult = [
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

const plainResult = [
  "Property 'common.setting2' was deleted",
  "Property 'common.setting3' was changed from true to [complex value]",
  "Property 'common.setting6.ops' was added with value: 'vops'",
  "Property 'common.follow' was added with value: false",
  "Property 'common.setting4' was added with value: 'blah blah'",
  "Property 'common.setting5' was added with value: [complex value]",
  "Property 'group1.baz' was changed from 'bas' to 'bars'",
  "Property 'group1.nest' was changed from [complex value] to 'str'",
  "Property 'group2' was deleted",
  "Property 'group3' was added with value: [complex value]",
].join('\n');

test.each([
  [getAbsolutePath('before.json'), getRelativePath('after.json'), 'classic', classicResult],
  [getRelativePath('before.yml'), getAbsolutePath('after.yml'), 'classic', classicResult],
  [getRelativePath('before.ini'), getRelativePath('after.ini'), 'classic', classicResult],
  [getAbsolutePath('before.json'), getRelativePath('after.json'), 'plain', plainResult],
  [getRelativePath('before.yml'), getAbsolutePath('after.yml'), 'plain', plainResult],
  [getRelativePath('before.ini'), getRelativePath('after.ini'), 'plain', plainResult],
])('Find difference', (before, after, format, expected) => expect(gendiff(before, after, format)).toBe(expected));
