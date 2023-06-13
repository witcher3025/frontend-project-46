/* eslint-disable no-console, import/extensions */

import _ from 'lodash';

const validateValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const getPlain = (diff) => {
  const iter = (node, pathKey) => {
    const lines = node.flatMap(({ key, value, status }) => {
      const newPathKey = [...pathKey, key];
      const currentKey = newPathKey.join('.');

      if (status === 'complex') {
        return iter(value, newPathKey);
      }

      if (status === 'updated') {
        const { oldValue, newValue } = value;
        const validOldValue = validateValue(oldValue);
        const validNewValue = validateValue(newValue);
        return `Property '${currentKey}' was ${status}. From ${validOldValue} to ${validNewValue}`;
      }

      if (status === 'added') {
        const validValue = validateValue(value);
        return `Property '${currentKey}' was ${status} with value: ${validValue}`;
      }

      if (status === 'removed') {
        return `Property '${currentKey}' was ${status}`;
      }

      return [];
    });

    return lines;
  };

  return iter(diff, []).join('\n');
};

export default getPlain;
