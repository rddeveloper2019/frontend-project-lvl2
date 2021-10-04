#!/usr/bin/node

import program from 'commander';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const version = '1.0.0';

const getFilePath = (filepath = '') => {
  const res = path.resolve(process.cwd(), filepath);
  return res;
};

const identifyFileType = (filePath, position) => {
  const type = path.extname(filePath);
  if (type.length === 0) {
    return `Unknown type of ${position} file`;
  }
  return type;
};

const readFile = (file) => fs.readFileSync(file, 'utf-8', (err, data) => {
  if (err) return err;
  return data;
});

const firstFilePath = getFilePath(process.argv[2]);
const secondFilePath = getFilePath(process.argv[3]);

const firstFile = {
  data: readFile(firstFilePath),
  type: identifyFileType(firstFilePath, 'first'),
};

const secondFile = {
  data: readFile(secondFilePath),
  type: identifyFileType(secondFilePath, 'second'),
};

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action(() => {
    const difference = genDiff(firstFile, secondFile);
    console.log(difference);
    return difference;
  });

program.parse(process.argv);
