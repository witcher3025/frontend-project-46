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
const filepath3 = '__fixtures__/files/file3.yml';

const cases = [
  [0, filepath1, filepath2],
  [1, filepath1, filepath3],
];

const expectedData = { toJson: [], toPlain: [], toStylish: [] };

beforeAll(() => {
  const jsonData = readFile('json data.txt');
  const plainData = readFile('plain data.txt');
  const stylishData = readFile('stylish data.txt');

  expectedData.toJson = jsonData.split('###').map((str) => str.trim());
  expectedData.toPlain = plainData.split('###').map((str) => str.trim());
  expectedData.toStylish = stylishData.split('###').map((str) => str.trim());
});

describe.each(cases)('', (caseIndex, file1, file2) => {
  test(`diff stylish ${caseIndex + 1}`, () => {
    const actual = genDiff(file1, file2, 'stylish');
    const expected = expectedData.toStylish[caseIndex];

    expect(actual).toEqual(expected);
  });
});

describe.each(cases)('', (caseIndex, file1, file2) => {
  test(`diff plain ${caseIndex + 1}`, () => {
    const actual = genDiff(file1, file2, 'plain');
    const expected = expectedData.toPlain[caseIndex];

    expect(actual).toEqual(expected);
  });
});

describe.each(cases)('', (caseIndex, file1, file2) => {
  test(`diff json ${caseIndex + 1}`, () => {
    const actual = genDiff(file1, file2, 'json');
    const expected = expectedData.toJson[caseIndex];

    expect(actual).toEqual(expected);
  });
});
