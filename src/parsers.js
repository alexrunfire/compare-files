import yaml from 'js-yaml';
import ini from 'ini';

export default (stringData, dataType) => {
  switch (dataType) {
    case '.json':
      return JSON.parse(stringData);

    case '.yml':
      return yaml.safeLoad(stringData);

    case '.ini':
      return ini.parse(stringData);

    default:
      throw new Error('Unknown extension!');
  }
};
