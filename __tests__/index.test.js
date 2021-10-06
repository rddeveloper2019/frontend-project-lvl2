import path, { dirname } from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
import genDiff from '../index';
import object1 from '../__fixtures__/toEqual/parsed.js';
import parsedObject from '../src/services/parseToObject.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let fileA;
let fileB;
let result;

describe('JSON-JSON test', () => {
  test('file1.json file2.json', () => {
    fileA = getFixturePath('file1.json');
    fileB = getFixturePath('file2.json');
    result = readFile('toEqual/result');

    expect(genDiff(fileA, fileB)).toEqual(result);
  });

  test('big1.json big2.json', () => {
    fileA = getFixturePath('big1.json');
    fileB = getFixturePath('big2.json');
    result = readFile('toEqual/resultBig');

    expect(genDiff(fileA, fileB)).toEqual(result);
  });
});

describe('YAML-YAML test', () => {
  test('file1.yml file2.yaml', () => {
    fileA = getFixturePath('file1.yml');
    fileB = getFixturePath('file2.yaml');
    result = readFile('toEqual/result');

    expect(genDiff(fileA, fileB)).toEqual(result);
  });
});

describe('YAML-JSON test', () => {
  test('file1.yml file2.json', () => {
    fileA = getFixturePath('file1.yml');
    fileB = getFixturePath('file2.json');
    result = readFile('toEqual/result');

    expect(genDiff(fileA, fileB)).toEqual(result);
  });
  test('big1.yml big2.json', () => {
    fileA = getFixturePath('big1.yml');
    fileB = getFixturePath('big2.json');
    result = readFile('toEqual/resultBig');

    expect(genDiff(fileA, fileB)).toEqual(result);
  });
});

describe('YAML-JSON test with ARRAY', () => {
  test('p1.yml p2.json', () => {
    fileA = getFixturePath('p1.yml');
    fileB = getFixturePath('p2.json');
    result = readFile('toEqual/resultBigWithArray');

    expect(genDiff(fileA, fileB)).toEqual(result);
  });
});

describe('PARSER test', () => {
  test('YAML Parser', () => {
    fileA = { data: readFile('big1.yml'), type: '.yml' };

    expect(parsedObject(fileA)).toEqual(object1);
  });
});
