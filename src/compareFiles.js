/* eslint-disable no-console, import/extensions */

import _ from 'lodash';

const compareFiles = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const compareKeys = sortedKeys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      const node = { key, status: 'added', value: data2[key] };
      return node;
    }

    if (!Object.hasOwn(data2, key)) {
      const node = { key, status: 'removed', value: data1[key] };
      return node;
    }

    if (data1[key] === data2[key]) {
      const node = { key, status: 'unchanged', value: data1[key] };
      return node;
    }

    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      const value = compareFiles(data1[key], data2[key]);
      const node = { key, status: 'complex', value };
      return node;
    }

    const value = { newValue: data2[key], oldValue: data1[key] };
    const node = { key, status: 'updated', value };
    return node;
  }, []);

  return compareKeys;
};

export default compareFiles;
