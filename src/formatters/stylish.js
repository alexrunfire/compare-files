#!/usr/bin/env node

import _ from 'lodash';

const makeQuotes = (value) => (_.isString(value) ? `'${value}'` : value);
const resValue = (value) => (_.isObject(value) ? '[complex value]' : makeQuotes(value));
const getChanged = (property, initialValue, endValue) => `Property '${property}' was changed from ${resValue(initialValue)} to ${resValue(endValue)}`;
const getDeleted = (property) => `Property '${property}' was deleted`;
const getAdded = (property, value) => `Property '${property}' was added with value: ${resValue(value)}`;

const getDiff = (diff, acc) => {
  const filtDiff = diff.filter(({ status }) => !(status === 'unchanged'));
  const stylishForm = filtDiff.map((item) => {
    const {
      status, key, value, previousValue,
    } = item;
    const property = [...acc, key].join('.');
    switch (status) {
      case 'complex':
        return getDiff(value, [...acc, key]);

      case 'changed':
        return getChanged(property, previousValue, value);

      case 'deleted':
        return getDeleted(property);

      case 'added':
        return getAdded(property, value);

      default:
        throw new Error('Error!');
    }
  });
  return stylishForm.join('\n');
};

export default (diff) => getDiff(diff, []);
