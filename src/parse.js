import yaml from 'js-yaml';
import ini from 'ini';

export default (textData, formatType) => {
  switch (formatType) {
    case '.json':
      return JSON.parse(textData);

    case '.yml':
      return yaml.safeLoad(textData);

    case '.ini':
      return ini.parse(textData);

    default:
      throw new Error(`Unknown type of format: ${formatType}!`);
  }
};
