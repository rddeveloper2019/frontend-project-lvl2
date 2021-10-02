#!/usr/bin/node

import program from 'commander';
import path from 'path';
import fs from 'fs';
import getDifference from '../src/index.js';

const version = '1.0.0';

const getFilePath = (filepath = '') => {
  const res = path.resolve(process.cwd(), filepath);
  return res;
};

const checkAndReadFile = (file) => {
  if (path.extname(file).length === 0) {
    return '';
  }
  return fs.readFileSync(file, 'utf-8', (err, data) => {
    if (err) return err;
    return data;
  });
};

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action(() => {
    const file1 = getFilePath(process.argv[2]);
    const file2 = getFilePath(process.argv[3]);

    getDifference(checkAndReadFile(file1), checkAndReadFile(file2));
  });

program.parse(process.argv);
