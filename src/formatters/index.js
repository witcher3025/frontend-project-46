/* eslint-disable no-console, import/extensions */

import getStylish from './stylish.js';
import getPlain from './plain.js';

const formatters = {
  stylish: getStylish,
  plain: getPlain,
};

const getFormatting = (diff, formatName) => formatters[formatName](diff);

export default getFormatting;
