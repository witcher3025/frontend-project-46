/* eslint-disable no-console, import/extensions */

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as yaml from 'js-yaml';
import compareFiles from './compareFiles.js';

const normalizePath = (filepath) => {
  const workingDir = process.cwd();
  return path.resolve(workingDir, filepath);
};

const getExtension = (filepath) => path.extname(filepath).slice(1);

const createObject = (filepath) => {
  const fileData = fs.readFileSync(filepath, 'utf-8');
  if (getExtension(filepath) === 'yaml') {
    return yaml(fileData, { json: true });
  }

  return JSON.parse(fileData);
};

const genDiff = (filepath1, filepath2) => {
  const object1 = createObject(normalizePath(filepath1));
  const object2 = createObject(normalizePath(filepath2));
  return compareFiles(object1, object2);
};

export default genDiff;
