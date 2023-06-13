/* eslint-disable no-console, import/extensions */

import _ from 'lodash';

const compareFiles = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const compareKeys = sortedKeys.map((key) => {
    const node = { key };

    if (!Object.hasOwn(data1, key)) {
      node.status = 'added';
      node.value = data2[key];
    } else if (!Object.hasOwn(data2, key)) {
      node.status = 'removed';
      node.value = data1[key];
    } else if (data1[key] === data2[key]) {
      node.status = 'unchanged';
      node.value = data1[key];
    } else if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      node.status = 'complex';
      node.value = compareFiles(data1[key], data2[key]);
    } else {
      node.status = 'updated';
      node.value = { newValue: data2[key], oldValue: data1[key] };
    }

    return node;
  });

  return compareKeys;
};

export default compareFiles;
