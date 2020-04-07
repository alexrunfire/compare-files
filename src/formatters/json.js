#!/usr/bin/env node

import _ from 'lodash';

const isNumInStr = (value) => _.isString(value) && !(_.isNaN(Number(value)));

const valuesToNum = (value) => {
  const toArr = Object.entries(value);
  return toArr.reduce(
    (acc, [key, val]) => (isNumInStr(val) ? { ...acc, [key]: Number(val) } : acc), value,
  );
};

const makevalue = (value) => {
  if (_.isObject(value)) {
    return valuesToNum(value);
  }
  return isNumInStr(value) ? Number(value) : value;
};

const getDiff = (diff) => {
  const newDiff = diff.map((item) => {
    const { value, status } = item;
    if (status === 'complex') {
      return { ...item, value: getDiff(value) };
    }
    const iValue = makevalue(value);
    if (_.has(item, 'previousValue')) {
      const { previousValue } = item;
      return { ...item, value: iValue, previousValue: makevalue(previousValue) };
    }
    return { ...item, value: iValue };
  });
  return newDiff;
};
export default (diff) => JSON.stringify(getDiff(diff), null, '  ');
