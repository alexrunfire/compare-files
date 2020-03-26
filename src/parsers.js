const yaml = require('js-yaml');

const ini = require('ini');

export default (firstFile, secondFile, filesExt) => {
  const getParcedFiles = (parcer) => {
    try {
      const firstFileParced = parcer(firstFile);
      const secondFileParced = parcer(secondFile);
      return [firstFileParced, secondFileParced];
    } catch (e) {
      throw new Error('Invalid data!');
    }
  };
  switch (filesExt) {
    case '.json':
      return getParcedFiles(JSON.parse);

    case '.yml':
      return getParcedFiles(yaml.safeLoad);

    case '.ini':
      return getParcedFiles(ini.parse);

    default:
      throw new Error('Unknown extension!');
  }
};
