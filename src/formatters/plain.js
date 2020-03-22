#!/usr/bin/env node

const _ = require('lodash');

const isRequireQuotes = (value) => (_.isString(value)) && (value !== '[complex value]');
const makeQuotes = (value) => (isRequireQuotes(value) ? `'${value}'` : value);

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
      if (_.isObject(value)) {
        return _.isObject(newValue)
          ? getDiff(value, newValue, [...acc, key])
          : getChanged(property, '[complex value]', newValue);
      }
      return _.isObject(newValue)
        ? getChanged(property, value, '[complex value]')
        : getChanged(property, value, newValue);
    }
    return getDeleted(property);
  });
  const uniqElem = secondFileArr.filter(([key]) => !(_.has(firstFile, key)));
  const secondDiff = uniqElem.map(([key, value]) => (
    _.isObject(value)
      ? getAdded([...acc, key].join('.'), '[complex value]')
      : getAdded([...acc, key].join('.'), value)));
  return [...firstDiff, ...secondDiff].join('\n');
};

export default (firstFile, secondFile) => getDiff(firstFile, secondFile);
