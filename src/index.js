import path from 'path';
import fs from 'fs';
import buildDiff from './buildDiff';
import parse from './parse';
import getFormat from './formatters';

const getAbsolutePath = (relativePath) => path.resolve(process.cwd(), relativePath);
const getFilePath = (pathToFile) => (path.isAbsolute(pathToFile)
  ? pathToFile : getAbsolutePath(pathToFile));

export default (firstConfig, secondConfig, format) => {
  const firstFilePath = getFilePath(firstConfig);
  const secondFilePath = getFilePath(secondConfig);
  const firstFile = fs.readFileSync(firstFilePath, 'utf-8');
  const secondFile = fs.readFileSync(secondFilePath, 'utf-8');
  const firstFileExt = path.extname(firstConfig);
  const secondFileExt = path.extname(secondConfig);
  const firstFileParsed = parse(firstFile, firstFileExt);
  const secondFileParsed = parse(secondFile, secondFileExt);
  const diff = buildDiff(firstFileParsed, secondFileParsed);
  const formatter = getFormat(format);
  return formatter(diff);
};
