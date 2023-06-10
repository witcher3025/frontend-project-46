#!/usr/bin/env node

/* eslint-disable no-console, import/extensions */

import { Command } from 'commander';
import genDiff from '../src/genDiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0')
  .argument('<filepath1>', 'path to file1')
  .argument('<filepath2>', 'path to file2')
  .option('-f, --style <type>', 'output format')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2);
    console.log(result);
  });

program.parse();
