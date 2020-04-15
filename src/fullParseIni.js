import _ from 'lodash';
import ini from 'ini';

const isNumInStr = (value) => !_.isNaN(parseInt(value, 10));

const makevalue = (value) => (isNumInStr(value) ? Number(value) : value);

const getIniParsing = (objectData) => {
  const objectToArr = Object.entries(objectData);
  return objectToArr.reduce(
    (acc, [key, value]) => (_.isObject(value)
      ? { ...acc, [key]: getIniParsing(value) }
      : { ...acc, [key]: makevalue(value, acc) }), objectData,
  );
};
export default (textData) => getIniParsing(ini.parse(textData));
