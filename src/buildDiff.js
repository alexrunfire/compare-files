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

const buildDiff = (firstFileParsed, secondFileParsed) => {
  const getFirstDiff = () => {
    const firstFileToArr = Object.entries(firstFileParsed);
    return firstFileToArr.map(([key, value]) => {
      if (_.has(secondFileParsed, key)) {
        const newValue = secondFileParsed[key];
        if (_.isObject(value) && _.isObject(newValue)) {
          return { key, value: buildDiff(value, newValue), status: 'complex' };
        }
        return value === newValue
          ? ({ key, value: makevalue(value), status: 'unchanged' })
          : ({
            key, value: makevalue(newValue), previousValue: makevalue(value), status: 'changed',
          });
      }
      return { key, value: makevalue(value), status: 'deleted' };
    });
  };
  const getSecondDiff = () => {
    const secondFileToArr = Object.entries(secondFileParsed);
    const uniqElem = secondFileToArr.filter(([key]) => !(_.has(firstFileParsed, key)));
    return uniqElem.map(([key, value]) => ({ key, value: makevalue(value), status: 'added' }));
  };
  const firstDiff = getFirstDiff();
  const secondDiff = getSecondDiff();
  return [...firstDiff, ...secondDiff];
};
export default buildDiff;
