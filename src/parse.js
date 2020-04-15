import yaml from 'js-yaml';

import parseIni from './fullParseIni';

const parsers = { json: JSON.parse, yml: yaml.safeLoad, ini: parseIni };

export default (textData, format) => parsers[format](textData);
