/* eslint-disable no-console, import/extensions */

import _ from 'lodash';

const compareFiles = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.sortBy(_.union(keys1, keys2));

  const compareKeys = unionKeys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return { key, value: data2[key], status: 'added' };
    }

    if (!Object.hasOwn(data2, key)) {
      return { key, value: data1[key], status: 'deleted' };
    }

    if (data1[key] === data2[key]) {
      return { key, value: data1[key], status: 'unchanged' };
    }

    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, value: compareFiles(data1[key], data2[key]), status: 'nested' };
    }

    return { key, value: { oldValue: data1[key], newValue: data2[key] }, status: 'changed' };
  });

  return compareKeys;
};

export default compareFiles;
