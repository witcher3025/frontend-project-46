/* eslint-disable no-console, import/extensions */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const plainFilepath1 = './__fixtures__/files_plane/file1.json';
const plainFilepath2 = './__fixtures__/files_plane/file2.json';
const plainFilepath3 = '__fixtures__/files_plane/file3.yaml';
const plainFilepath4 = '__fixtures__/files_plane/file4.yml';

const plainCases = [
  [0, plainFilepath1, plainFilepath2],
  [1, plainFilepath2, plainFilepath4],
  [2, plainFilepath4, plainFilepath2],
  [3, plainFilepath1, plainFilepath3],
  [4, plainFilepath1, plainFilepath1],
];

const nestedFilepath1 = './__fixtures__/files_nested/file1.json';
const nestedFilepath2 = './__fixtures__/files_nested/file2.json';
const nestedFilepath3 = '__fixtures__/files_nested/file3.yml';

const nestedCases = [
  [0, nestedFilepath1, nestedFilepath2],
  [1, nestedFilepath1, nestedFilepath3],
];

const expectedData = { nested: [], plain: [] };

beforeAll(() => {
  const plainData = readFile('plane.txt');
  const nestedData = readFile('nested.txt');
  expectedData.plain = plainData.split('###').map((str) => str.trim());
  expectedData.nested = nestedData.split('###').map((str) => str.trim());
});

describe.each(plainCases)('', (caseIndex, file1, file2) => {
  test(`plain diff ${caseIndex + 1}`, () => {
    const actual = genDiff(file1, file2);
    const expected = expectedData.plain[caseIndex];

    expect(actual).toEqual(expected);
  });
});

describe.each(nestedCases)('', (caseIndex, file1, file2) => {
  test(`nested diff ${caseIndex + 1}`, () => {
    const actual = genDiff(file1, file2);
    const expected = expectedData.nested[caseIndex];

    expect(actual).toEqual(expected);
  });
});
