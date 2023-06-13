/* eslint-disable no-console, import/extensions */

import _ from 'lodash';

const validateValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const generateLines = (state, key, value) => {
  if (state === 'removed') {
    return `Property '${key}' was ${state}`;
  }

  if (state === 'added') {
    const validValue = validateValue(value);
    return `Property '${key}' was ${state} with value: ${validValue}`;
  }

  if (state === 'updated') {
    const { oldValue, newValue } = value;
    const validOldValue = validateValue(oldValue);
    const validNewValue = validateValue(newValue);
    return `Property '${key}' was ${state}. From ${validOldValue} to ${validNewValue}`;
  }

  return '';
};

const getPlain = (diff) => {
  const iter = (node, pathKey) => {
    const lines = node.flatMap(({ key, value, status }) => {
      const newPathKey = [...pathKey, key];
      const currentKey = newPathKey.join('.');

      if (status === 'complex') {
        return iter(value, newPathKey);
      }

      return generateLines(status, currentKey, value);
    });

    return lines;
  };

  const result = iter(diff, []);
  const filtered = result.filter((elem) => elem !== '').join('\n');
  return filtered;
};

export default getPlain;
