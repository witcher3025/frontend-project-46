/* eslint-disable no-console, import/extensions */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const filepath1 = './__fixtures__/files/file1.json';
const filepath2 = './__fixtures__/files/file2.json';
const filepath3 = '__fixtures__/files/file3.yaml';
const filepath4 = '__fixtures__/files/file4.yml';

const cases = [
  [0, filepath1, filepath2],
  [1, filepath2, filepath4],
  [2, filepath4, filepath2],
  [3, filepath1, filepath3],
  [4, filepath1, filepath1],
];

const expectedData = { plain: [] };

beforeAll(() => {
  const plainData = readFile('data.txt');
  expectedData.plain = plainData.split('###').map((str) => str.trim());
});

describe.each(cases)('', (caseIndex, file1, file2) => {
  test(`diff ${caseIndex + 1}`, () => {
    const actual = genDiff(file1, file2);
    const expected = expectedData.plain[caseIndex];

    expect(actual).toEqual(expected);
  });
});
