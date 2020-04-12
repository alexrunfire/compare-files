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
  const firstFileExt = path.extname(firstConfig);
  const secondFileExt = path.extname(secondConfig);
  const firstFileParsed = parse(firstFileData, firstFileExt);
  const secondFileParsed = parse(secondFileData, secondFileExt);
  const diff = buildDiff(firstFileParsed, secondFileParsed);
  const format = getFormat(dataFormat);
  return format(diff);
};
