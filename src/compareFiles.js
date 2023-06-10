/* eslint-disable no-console, import/extensions */

import * as fs from 'node:fs';
import * as path from 'node:path';
import _ from 'lodash';

const normalizePath = (filepath) => {
  const workingDir = process.cwd();
  return path.resolve(workingDir, filepath);
};

const createObject = (filepath) => {
  const fileData = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(fileData);
};

const compare = (acc, key, object1, object2) => {
  if (!Object.hasOwn(object1, key)) {
    acc.push(`  + ${key}: ${object2[key]}`);
  } else if (!Object.hasOwn(object2, key)) {
    acc.push(`  - ${key}: ${object1[key]}`);
  } else if (object1[key] !== object2[key]) {
    acc.push(`  - ${key}: ${object1[key]}`);
    acc.push(`  + ${key}: ${object2[key]}`);
  } else {
    acc.push(`    ${key}: ${object1[key]}`);
  }
  return acc;
};

const compareFiles = (filepath1, filepath2) => {
  const path1 = normalizePath(filepath1);
  const path2 = normalizePath(filepath2);

  const object1 = createObject(path1);
  const object2 = createObject(path2);

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  const result = _.union(keys1, keys2)
    .sort()
    .reduce((acc, key) => compare(acc, key, object1, object2), []);

  return [
    '{',
    ...result,
    '}',
  ].join('\n');
};

export default compareFiles;
