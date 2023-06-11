/* eslint-disable no-console, import/extensions */

import * as yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const parser = (fileData, ext) => parsers[ext](fileData);

export default parser;
