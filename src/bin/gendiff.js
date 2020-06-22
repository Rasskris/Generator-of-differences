#!/usr/bin/env node

import program from 'commander';
import genDiff from '../index.js';

program
  .version('1.0.0', '-V, --version', 'output usage information')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.format));
  });

program.parse(process.argv);
