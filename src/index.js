import path from 'path';
import fs from 'fs';
import buildDiff from './buildDiff';
import parse from './parse';
import getFormat from './formatters';

export default (firstConfig, secondConfig, dataFormat) => {
  const firstFilePath = path.resolve(firstConfig);
  const secondFilePath = path.resolve(secondConfig);
  const firstFileData = fs.readFileSync(firstFilePath, 'utf-8');
  const secondFileData = fs.readFileSync(secondFilePath, 'utf-8');
  const firstFileFormat = path.extname(firstConfig).slice(1);
  const secondFileFormat = path.extname(secondConfig).slice(1);
  const firstFileParsed = parse(firstFileData, firstFileFormat);
  const secondFileParsed = parse(secondFileData, secondFileFormat);
  const diff = buildDiff(firstFileParsed, secondFileParsed);
  const format = getFormat(dataFormat);
  return format(diff);
};
