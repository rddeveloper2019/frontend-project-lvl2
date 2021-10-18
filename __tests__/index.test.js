import path, { dirname } from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fileA = getFixturePath('big1.json');
const fileB = getFixturePath('big2.yaml');

describe('STYLISH test', () => {
  test('big1.yml big2.json', () => {
    const result = readFile('toEqual/resultStylish');

    expect(genDiff(fileA, fileB)).toEqual(result);
  });
});

describe('PLAIN test', () => {
  test('big1.json big2.yaml', () => {
    const result = readFile('toEqual/resultPlain');

    expect(genDiff(fileA, fileB, 'plain')).toEqual(result);
  });
});

describe('JSON test', () => {
  test('big1.json big2.yaml', () => {
    const result = readFile('toEqual/resultJSON');

    expect(genDiff(fileA, fileB, 'json')).toEqual(result);
  });
});
