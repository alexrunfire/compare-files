import _ from 'lodash';

const buildDiff = (firstObject, secondObject) => {
  const firstObjKeys = Object.keys(firstObject);
  const secondObjKeys = Object.keys(secondObject);
  const uniqKeys = _.uniq([...firstObjKeys, ...secondObjKeys]);
  return uniqKeys.map((key) => {
    const secondValue = secondObject[key];
    if (_.has(firstObject, key)) {
      const firstValue = firstObject[key];
      if (_.has(secondObject, key)) {
        if (_.isObject(firstValue) && _.isObject(secondValue)) {
          return { key, value: buildDiff(firstValue, secondValue), status: 'complex' };
        }
        return firstValue === secondValue
          ? ({ key, value: firstValue, status: 'unchanged' })
          : ({
            key, value: secondValue, previousValue: firstValue, status: 'changed',
          });
      }
      return { key, value: firstValue, status: 'deleted' };
    }
    return { key, value: secondValue, status: 'added' };
  });
};
export default buildDiff;
