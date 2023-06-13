/* eslint-disable no-console, import/extensions */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const getFilePath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, '..', '__fixtures__', filename);
};

const readFile = (filename) => fs.readFileSync(getFilePath(filename), 'utf-8');

describe.each(['stylish', 'plain', 'json'])('output format %s', (format) => {
  const result = readFile(`${format} data.txt`);

  test.each(['json', 'yaml'])('file %s', (ext) => {
    const filename1 = getFilePath(`file1.${ext}`);
    const filename2 = getFilePath(`file2.${ext}`);

    expect(genDiff(filename1, filename2, format)).toEqual(result);
  });
});
