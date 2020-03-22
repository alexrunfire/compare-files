#!/usr/bin/env node

const _ = require('lodash');

const makeQuotes = (value) => (_.isString(value) ? `'${value}'` : value);

const resValue = (value) => (_.isObject(value) ? '[complex value]' : makeQuotes(value));

const getChanged = (property, initialValue, endValue) => `Property '${property}' was changed from ${resValue(initialValue)} to ${resValue(endValue)}`;

const getDeleted = (property) => `Property '${property}' was deleted`;
const getAdded = (property, value) => `Property '${property}' was added with value: ${resValue(value)}`;

const getDiff = (firstFile, secondFile, acc = []) => {
  const firstFileArr = Object.entries(firstFile);
  const secondFileArr = Object.entries(secondFile);
  const firstArrFilt = firstFileArr.filter(
    ([key, value]) => !(_.has(secondFile, key) && value === secondFile[key]),
  );
  const firstDiff = firstArrFilt.map(([key, value]) => {
    const property = [...acc, key].join('.');
    if (_.has(secondFile, key)) {
      const newValue = secondFile[key];
      return _.isObject(value) && _.isObject(newValue)
        ? getDiff(value, newValue, [...acc, key])
        : getChanged(property, value, newValue);
    }
    return getDeleted(property);
  });
  const uniqElem = secondFileArr.filter(([key]) => !(_.has(firstFile, key)));
  const secondDiff = uniqElem.map(([key, value]) => getAdded([...acc, key].join('.'), value));
  return [...firstDiff, ...secondDiff].join('\n');
};

export default (firstFile, secondFile) => getDiff(firstFile, secondFile);
