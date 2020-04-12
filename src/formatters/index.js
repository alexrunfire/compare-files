import getTap from './tap';
import getStylish from './stylish';
import getJSON from './json';

const formatters = { tap: getTap, stylish: getStylish, json: getJSON };

export default (dataFormat) => formatters[dataFormat];
