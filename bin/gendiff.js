#!/usr/bin/node

import program from 'commander';

const version = '1.0.0';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format');

program.parse(process.argv);
