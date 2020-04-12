import _ from 'lodash';

const buildDiff = (firstObject, secondObject) => {
  const firstObjKeys = Object.keys(firstObject);
  const secondObjKeys = Object.keys(secondObject);
  const commonKeys = _.intersection(firstObjKeys, secondObjKeys);
  const addedItems = _.difference(secondObjKeys, firstObjKeys)
    .map((key) => ({ key, value: secondObject[key], status: 'added' }));
  const deletedItems = _.difference(firstObjKeys, secondObjKeys)
    .map((key) => ({ key, value: firstObject[key], status: 'deleted' }));
  const unchangedItems = commonKeys.filter((key) => firstObject[key] === secondObject[key])
    .map((key) => ({ key, value: firstObject[key], status: 'unchanged' }));
  const complexItems = commonKeys
    .filter((key) => _.isObject(firstObject[key]) && _.isObject(secondObject[key]))
    .map((key) => ({ key, children: buildDiff(firstObject[key], secondObject[key]), status: 'complex' }));
  const changedItems = commonKeys
    .filter((key) => !(_.isObject(firstObject[key]) && _.isObject(secondObject[key]))
    && firstObject[key] !== secondObject[key])
    .map((key) => ({
      key, value: secondObject[key], previousValue: firstObject[key], status: 'changed',
    }));
  return [...complexItems, ...unchangedItems, ...changedItems, ...addedItems, ...deletedItems];
};
export default buildDiff;
