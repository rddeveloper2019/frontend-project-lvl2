#!/usr/bin/node

import program from 'commander';
import genDiff from '../src/index.js';

const version = '1.0.0';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>', 'first filepath, second filepath')
  .option('-f, --format [type]', 'Output formats: "stylish", "plain", "json" ', 'stylish')
  .action((filepath1, filepath2) => {
    const { format } = program.opts();
    const difference = genDiff(filepath1, filepath2, format);

    console.log(difference);
  });

program.parse(process.argv);
