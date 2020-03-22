#!/usr/bin/env node

const _ = require('lodash');

const isNumInStr = (value) => _.isString(value) && !(_.isNaN(Number(value)));

const valuesToNum = (value) => {
  const toArr = Object.entries(value);
  return toArr.reduce(
    (acc, [key, val]) => (isNumInStr(val) ? { ...acc, [key]: Number(val) } : acc), value,
  );
};

const makeNum = (value) => {
  if (_.isObject(value)) {
    return valuesToNum(value);
  }
  return isNumInStr(value) ? Number(value) : value;
};

const makeElement = (key, value, status = []) => ({ [key]: makeNum(value), message: status });


const isRequireQuotes = (value) => (_.isString(value)) && (value !== '[complex value]');
const makeQuotes = (value) => (isRequireQuotes(value) ? `'${value}'` : value);

const getChanged = (value) => `was changed from ${makeQuotes(value)}`;

const getDiff = (firstFile, secondFile) => {
  const firstFileToArr = Object.entries(firstFile);
  const firstDiff = firstFileToArr.map(([key, value]) => {
    if (_.has(secondFile, key)) {
      const newValue = secondFile[key];
      if (_.isObject(value)) {
        return _.isObject(newValue)
          ? makeElement(key, getDiff(value, newValue))
          : makeElement(key, newValue, getChanged('[complex value]'));
      }
      return value === newValue
        ? makeElement(key, value)
        : makeElement(key, newValue, getChanged(value));
    }
    return makeElement(key, value, 'was deleted');
  });
  const secondFileToArr = Object.entries(secondFile);
  const uniqElem = secondFileToArr.filter(([key]) => !(_.has(firstFile, key)));
  const secondDiff = uniqElem.map(([key, value]) => makeElement(key, value, 'was added'));
  return [...firstDiff, ...secondDiff];
};

export default (firstFile, secondFile) => JSON.stringify(getDiff(firstFile, secondFile), null, '  ');
