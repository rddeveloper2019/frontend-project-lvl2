#!/usr/bin/node

import program from 'commander';
import genDiff from '../index.js';

const version = '1.0.0';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>', 'first filepath second filepath')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const difference = genDiff(filepath1, filepath2);
    console.log(difference);
  });

program.parse(process.argv);
