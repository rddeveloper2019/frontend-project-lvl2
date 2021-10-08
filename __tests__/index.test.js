import path, { dirname } from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
import genDiff from '../index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let fileA;
let fileB;
let result;

describe('STYLISH test', () => {
  test('big1.yml big2.json', () => {
    fileA = getFixturePath('big1.yml');
    fileB = getFixturePath('big2.json');
    result = readFile('toEqual/resultStylish');

    expect(genDiff(fileA, fileB)).toEqual(result);
  });
});

describe('PLAIN test', () => {
  test('big1.json big2.yaml', () => {
    fileA = getFixturePath('big1.json');
    fileB = getFixturePath('big2.yaml');
    result = readFile('toEqual/resultPlain');

    expect(genDiff(fileA, fileB, 'plain')).toEqual(result);
  });
});

describe('JSON test', () => {
  test('big1.json big2.yaml', () => {
    fileA = getFixturePath('big1.json');
    fileB = getFixturePath('big2.yaml');
    result = readFile('toEqual/resultJSON');

    expect(genDiff(fileA, fileB, 'json')).toEqual(result);
  });
});
