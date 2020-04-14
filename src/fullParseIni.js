import _ from 'lodash';

const isNumInStr = (value) => !_.isNaN(parseInt(value, 10));

const makevalue = (value) => (isNumInStr(value) ? Number(value) : value);

const getFullParsing = (objectData) => {
  const objectToArr = Object.entries(objectData);
  return objectToArr.reduce(
    (acc, [key, value]) => (_.isObject(value)
      ? { ...acc, [key]: getFullParsing(value) }
      : { ...acc, [key]: makevalue(value, acc) }), objectData,
  );
};
export default getFullParsing;
