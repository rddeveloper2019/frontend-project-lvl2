import path, { dirname } from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let fileA;
let fileB;
let result;

describe('genDiff JSON-JSON test', () => {
  test('a.json b.json', () => {
    fileA = { data: readFile('a.json'), type: '.json' };
    fileB = { data: readFile('b.json'), type: '.json' };
    result = readFile('toEqual/testResult');
    expect(genDiff(fileA, fileB)).toEqual(result);
  });

  test('file1.json file2.json', () => {
    fileA = { data: readFile('file1.json'), type: '.json' };
    fileB = { data: readFile('file2.json'), type: '.json' };
    result = readFile('toEqual/result');

    expect(genDiff(fileA, fileB)).toEqual(result);
  });

  test('a.json only', () => {
    fileA = { data: readFile('a.json'), type: '.json' };
    result = readFile('toEqual/a-only');
    expect(genDiff(fileA)).toEqual(result);
  });
});
