const yaml = require('js-yaml');

const ini = require('ini');

export default (file, filesExt) => {
  const getParsedFile = (parser) => {
    try {
      const fileParsed = parser(file);
      return fileParsed;
    } catch (e) {
      throw new Error('Invalid data!');
    }
  };
  switch (filesExt) {
    case '.json':
      return getParsedFile(JSON.parse);

    case '.yml':
      return getParsedFile(yaml.safeLoad);

    case '.ini':
      return getParsedFile(ini.parse);

    default:
      throw new Error('Unknown extension!');
  }
};
