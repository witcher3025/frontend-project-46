/* eslint-disable no-console, import/extensions */

import _ from 'lodash';

const chars = {
  added: '+ ',
  deleted: '- ',
  unchanged: '  ',
};

const padLine = (depth) => `  ${' '.repeat(4).repeat(depth - 1)}`;
const padBracket = (depth) => `${' '.repeat(4).repeat(depth)}`;
const getLine = (key, value, char, depth) => `${padLine(depth)}${char}${key}: ${value}`;
const wrapBrackets = (body, depth) => `{\n${body}\n${padBracket(depth)}}`;

const prepareValue = (node, depth) => {
  if (!_.isObject(node)) {
    return node;
  }

  const result = Object
    .entries(node)
    .map(([key, val]) => {
      const updateDepth = depth + 1;
      const newValue = prepareValue(val, updateDepth);
      return getLine(key, newValue, chars.unchanged, updateDepth);
    });

  return wrapBrackets(result.join('\n'), depth);
};

const getStylish = (diff) => {
  const iter = (node, depth) => {
    const lines = node.flatMap(({ key, value, status }) => {
      const updateDepth = depth + 1;

      if (status === 'nested') {
        return getLine(key, iter(value, updateDepth), chars.unchanged, updateDepth);
      }

      if (status === 'changed') {
        const oldValue = prepareValue(value.oldValue, updateDepth);
        const newValue = prepareValue(value.newValue, updateDepth);

        return [
          getLine(key, oldValue, chars.deleted, updateDepth),
          getLine(key, newValue, chars.added, updateDepth),
        ];
      }

      return getLine(key, prepareValue(value, updateDepth), chars[status], updateDepth);
    });

    return wrapBrackets(lines.join('\n'), depth);
  };

  return iter(diff, 0);
};

export default getStylish;
