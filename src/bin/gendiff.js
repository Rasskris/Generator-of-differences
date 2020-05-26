#!/usr/bin/env node

import program from 'commander';

program
  .version('1.0.0', '-V, --version', 'output usage information')
  .description('Compares two configuration files and shows a difference.')
  .option('-h, --help', 'output extra debugging')
  .option('-V, --version', 'output usage information');

program.parse(process.argv);
