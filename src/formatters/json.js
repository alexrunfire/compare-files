import _ from 'lodash';

const isNumInStr = (value) => _.isString(value) && !(_.isNaN(Number(value)));

const makevalue = (value) => (isNumInStr(value) ? Number(value) : value);

export default (diff) => JSON.stringify(diff, (key, value) => makevalue(value), '  ');
