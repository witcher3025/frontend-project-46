/* eslint-disable no-console, import/extensions */

import * as fs from 'node:fs';
// import _ from 'lodash';
import compareFiles from '../src/compareFiles.js';

const absolutePath1 = './__fixtures__/files/file1.json';
const absolutePath2 = './__fixtures__/files/file2.json';
const filepath3 = '__fixtures__/files/file3.json';
const filepath4 = '__fixtures__/files/file4.json';

const expectedData = { plain: [] };

beforeAll(() => {
  const plainData = fs.readFileSync(('__fixtures__/data.txt'), 'utf-8');
  expectedData.plain = plainData.split('###').map((str) => str.trim());
});

test('diff between files 1-2', () => {
  const caseIndex = 0;
  const actual = compareFiles(absolutePath1, absolutePath2);
  const expected = expectedData.plain[caseIndex];
  expect(actual).toEqual(expected);
});

test('diff between files 2-4', () => {
  const caseIndex = 1;
  const actual = compareFiles(absolutePath2, filepath4);
  const expected = expectedData.plain[caseIndex];
  expect(actual).toEqual(expected);
});

test('diff between files 4-2', () => {
  const caseIndex = 2;
  const actual = compareFiles(filepath4, absolutePath2);
  const expected = expectedData.plain[caseIndex];
  expect(actual).toEqual(expected);
});

test('diff between files 1-3', () => {
  const caseIndex = 3;
  const actual = compareFiles(absolutePath1, filepath3);
  const expected = expectedData.plain[caseIndex];
  expect(actual).toEqual(expected);
});

test('diff between same files 1-1', () => {
  const caseIndex = 4;
  const actual = compareFiles(absolutePath1, absolutePath1);
  const expected = expectedData.plain[caseIndex];
  expect(actual).toEqual(expected);
});
