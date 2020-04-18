import _ from 'lodash';

const buildDiff = (firstObject, secondObject) => {
  const firstObjKeys = Object.keys(firstObject);
  const secondObjKeys = Object.keys(secondObject);
  const uniqKeys = _.uniq([...firstObjKeys, ...secondObjKeys]);
  return uniqKeys.map((key) => {
    const firstObjValue = firstObject[key];
    const secondObjValue = secondObject[key];
    if (_.has(firstObject, key) && !_.has(secondObject, key)) {
      return { key, value: firstObjValue, status: 'deleted' };
    }
    if (!_.has(firstObject, key) && _.has(secondObject, key)) {
      return { key, value: secondObjValue, status: 'added' };
    }
    if (_.isObject(firstObjValue) && _.isObject(secondObjValue)) {
      return { key, children: buildDiff(firstObjValue, secondObjValue), status: 'complex' };
    }
    if (firstObjValue === secondObjValue) {
      return { key, value: firstObjValue, status: 'unchanged' };
    }
    return {
      key, currentValue: secondObjValue, previousValue: firstObjValue, status: 'changed',
    };
  });
};
export default buildDiff;
