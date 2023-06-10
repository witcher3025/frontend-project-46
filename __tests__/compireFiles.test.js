/* eslint-disable no-console, import/extensions */

import * as fs from 'node:fs';
// import _ from 'lodash';
import compareFiles from '../src/compareFiles.js';

const filepath1 = './__fixtures__/files/file1.json';
const filepath2 = './__fixtures__/files/file2.json';
const filepath3 = '__fixtures__/files/file3.json';
const filepath4 = '__fixtures__/files/file4.json';

const cases = [
  [0, filepath1, filepath2],
  [1, filepath2, filepath4],
  [2, filepath4, filepath2],
  [3, filepath1, filepath3],
  [4, filepath1, filepath1],
];

const expectedData = { plain: [] };

beforeAll(() => {
  const plainData = fs.readFileSync(('__fixtures__/data.txt'), 'utf-8');
  expectedData.plain = plainData.split('###').map((str) => str.trim());
});

describe.each(cases)('', (caseIndex, file1, file2) => {
  test(`diff ${caseIndex + 1}`, () => {
    const actual = compareFiles(file1, file2);
    const expected = expectedData.plain[caseIndex];

    expect(actual).toEqual(expected);
  });
});
