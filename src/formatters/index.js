/* eslint-disable no-console, import/extensions */

import getJson from './json.js';
import getPlain from './plain.js';
import getStylish from './stylish.js';

const formatters = {
  json: getJson,
  plain: getPlain,
  stylish: getStylish,
};

const getFormatting = (diff, formatName) => formatters[formatName](diff);

export default getFormatting;
