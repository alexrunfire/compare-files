import yaml from 'js-yaml';
import ini from 'ini';
import getFullParsing from './fullParseIni';

export default (textData, parserType) => {
  switch (parserType) {
    case '.json':
      return JSON.parse(textData);

    case '.yml':
      return yaml.safeLoad(textData);

    case '.ini':
      return getFullParsing(ini.parse(textData));

    default:
      throw new Error(`Unknown type of parser: ${parserType}!`);
  }
};
