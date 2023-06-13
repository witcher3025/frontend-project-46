/* eslint-disable no-console, import/extensions */

import * as fs from 'node:fs';
import * as path from 'node:path';
import compareFiles from './compareFiles.js';
import parser from './parsers.js';
import getFormatting from './formatters/index.js';

const normalizePath = (filepath) => path.resolve(process.cwd(), filepath);
const getExtension = (filepath) => path.extname(filepath).slice(1);
const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileData1 = readFile(normalizePath(filepath1));
  const fileData2 = readFile(normalizePath(filepath2));

  const object1 = parser(fileData1, getExtension(filepath1));
  const object2 = parser(fileData2, getExtension(filepath2));

  const diff = compareFiles(object1, object2);

  return getFormatting(diff, formatName);
  // return compareFiles(object1, object2);
};

export default genDiff;
