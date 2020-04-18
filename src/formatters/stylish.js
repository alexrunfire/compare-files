import _ from 'lodash';

const makeQuotes = (value) => (_.isString(value) ? `'${value}'` : value);
const resValue = (value) => (_.isObject(value) ? '[complex value]' : makeQuotes(value));

const getDiff = (diff, acc) => {
  const filtDiff = diff.filter(({ status }) => !(status === 'unchanged'));
  const stylishForm = filtDiff.map((item) => {
    const {
      status, key, children, value, currentValue, previousValue,
    } = item;
    const property = [...acc, key].join('.');
    switch (status) {
      case 'complex':
        return getDiff(children, [...acc, key]);

      case 'changed':
        return `Property '${property}' was changed from ${resValue(previousValue)} to ${resValue(currentValue)}`;

      case 'deleted':
        return `Property '${property}' was deleted`;

      case 'added':
        return `Property '${property}' was added with value: ${resValue(value)}`;

      default:
        throw new Error(`Invalid object status: ${status}!`);
    }
  });
  return stylishForm.join('\n');
};

export default (diff) => getDiff(diff, []);
