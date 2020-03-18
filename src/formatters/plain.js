#!/usr/bin/env node

const _ = require('lodash');

const isString = (value) => (typeof value === 'string') && (value !== '[complex value]');
const makeQuotes = (value) => (isString(value) ? `'${value}'` : value);

const getChanged = (property, initialValue, endValue) => {
  const startVal = makeQuotes(initialValue);
  const lastVal = makeQuotes(endValue);
  return `Property '${property}' was changed from ${startVal} to ${lastVal}`;
};
const getDeleted = (property) => `Property '${property}' was deleted`;
const getAdded = (property, value) => {
  const newValue = makeQuotes(value);
  return `Property '${property}' was added with value: ${newValue}`;
};

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
      if (typeof value === 'object') {
        return typeof newValue === 'object'
          ? getDiff(value, newValue, [...acc, key])
          : getChanged(property, '[complex value]', newValue);
      }
      return typeof newValue === 'object'
        ? getChanged(property, value, '[complex value]')
        : getChanged(property, value, newValue);
    }
    return getDeleted(property);
  });
  const uniqElem = secondFileArr.filter(([key]) => !(_.has(firstFile, key)));
  const secondDiff = uniqElem.map(([key, value]) => (
    typeof value === 'object'
      ? getAdded([...acc, key].join('.'), '[complex value]')
      : getAdded([...acc, key].join('.'), value)));
  return [...firstDiff, ...secondDiff].join('\n');
};

export default (firstFile, secondFile) => getDiff(firstFile, secondFile);
