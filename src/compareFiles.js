/* eslint-disable no-console, import/extensions */

import _ from 'lodash';

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

const compareFiles = (object1, object2) => {
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
