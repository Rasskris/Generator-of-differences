#!/usr/bin/env node

import program from 'commander';

program
  .version('1.0.0', '-V, --version', 'output usage information')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action();

program.parse(process.argv);
