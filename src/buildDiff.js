import _ from 'lodash';

const buildDiff = (firstObject, secondObject) => {
  const firstObjKeys = Object.keys(firstObject);
  const secondObjKeys = Object.keys(secondObject);
  const uniqKeys = _.uniq([...firstObjKeys, ...secondObjKeys]);
  return uniqKeys.map((key) => {
    let item;
    const firstObjValue = firstObject[key];
    const secondObjValue = secondObject[key];
    if (_.isObject(firstObjValue) && _.isObject(secondObjValue)) {
      item = { key, children: buildDiff(firstObjValue, secondObjValue), status: 'complex' };
    } else
    if (firstObjValue === secondObjValue) {
      item = { key, value: firstObjValue, status: 'unchanged' };
    } else
    if (!_.has(firstObject, key) && _.has(secondObject, key)) {
      item = { key, value: secondObjValue, status: 'added' };
    } else
    if (_.has(firstObject, key) && !_.has(secondObject, key)) {
      item = { key, value: firstObjValue, status: 'deleted' };
    } else {
      item = {
        key, value: secondObjValue, previousValue: firstObjValue, status: 'changed',
      };
    }
    return item;
  });
};
export default buildDiff;
