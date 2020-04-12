import _ from 'lodash';

const makeSpaces = (deepLevel, sign = ' ') => (deepLevel === 0
  ? '' : `${sign} `.padStart(deepLevel * 4));

const stringify = (value, deepLevel) => {
  if (!_.isObject(value)) {
    return value;
  }
  const valToArr = Object.entries(value);
  const result = valToArr.map(([key, newValue]) => (
    _.isObject(newValue)
      ? `${makeSpaces(deepLevel)}${key}: ${stringify(newValue, deepLevel + 1)}`
      : `${makeSpaces(deepLevel)}${key}: ${newValue}`));
  return ['{', ...result, `${makeSpaces(deepLevel - 1)}}`].join('\n');
};

const getDiff = (diff, deepLevel) => {
  const tapForm = diff.map((item) => {
    const {
      status, key, children, value, previousValue,
    } = item;
    switch (status) {
      case 'complex':
        return `${makeSpaces(deepLevel)}${key}: ${getDiff(children, deepLevel + 1)}`;

      case 'unchanged':
        return `${makeSpaces(deepLevel)}${key}: ${value}`;

      case 'changed':
        return [`${makeSpaces(deepLevel, '+')}${key}: ${stringify(value, deepLevel + 1)}`,
          `${makeSpaces(deepLevel, '-')}${key}: ${stringify(previousValue, deepLevel + 1)}`].join('\n');

      case 'deleted':
        return `${makeSpaces(deepLevel, '-')}${key}: ${stringify(value, deepLevel + 1)}`;

      case 'added':
        return [`${makeSpaces(deepLevel, '+')}${key}`, stringify(value, deepLevel + 1)].join(': ');

      default:
        throw new Error(`Invalid object status: ${status}!`);
    }
  });
  return ['{', ...tapForm, `${makeSpaces(deepLevel - 1)}}`].join('\n');
};

export default (diff) => getDiff(diff, 1);
