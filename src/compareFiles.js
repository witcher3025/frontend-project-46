/* eslint-disable no-console, import/extensions */

import _ from 'lodash';

const compareFiles = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const compareKeys = keys.map((key) => {
    const node = { key };

    if (!Object.hasOwn(data1, key)) {
      node.value = data2[key];
      node.status = 'added';
    } else if (!Object.hasOwn(data2, key)) {
      node.value = data1[key];
      node.status = 'deleted';
    } else if (data1[key] === data2[key]) {
      node.value = data1[key];
      node.status = 'unchanged';
    } else if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      node.value = compareFiles(data1[key], data2[key]);
      node.status = 'nested';
    } else {
      node.value = { oldValue: data1[key], newValue: data2[key] };
      node.status = 'changed';
    }

    return node;
  });

  return compareKeys;
};

export default compareFiles;
