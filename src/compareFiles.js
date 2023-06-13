/* eslint-disable no-console, import/extensions */

import _ from 'lodash';

const compareFiles = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const compareKeys = sortedKeys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return { key, status: 'added', value: data2[key] };
    }

    if (!Object.hasOwn(data2, key)) {
      return { key, status: 'removed', value: data1[key] };
    }

    if (data1[key] === data2[key]) {
      return { key, status: 'unchanged', value: data1[key] };
    }

    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      const value = compareFiles(data1[key], data2[key]);
      return { key, status: 'complex', value };
    }

    const value = { newValue: data2[key], oldValue: data1[key] };
    return { key, status: 'updated', value };
  });

  return compareKeys;
};

export default compareFiles;
