import path, { dirname } from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
import genDiff from '../index';
import selectFormatter from '../src/formatters/index.js';
import { getKeywords } from '../src/formatters/plain.js';
import { getMarker } from '../src/formatters/stylish.js';

import parse from '../src/services/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fileA = getFixturePath('big1.json');
const fileB = getFixturePath('big2.yaml');
const invalid = 'INVALID';
const blankObj = {};

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

describe('Blank obj test', () => {
  test('blank objects', () => {
    expect(genDiff(blankObj, blankObj)).toEqual('{\n}');
  });
});

describe('FORMATS & SELECTORS & TYPES tests', () => {
  test('selectFormatter', () => {
    expect(() => selectFormatter(invalid, {})).toThrow(`Invalid file extension <${invalid}`);
  });
  test('selectMarker', () => {
    expect(() => getMarker(invalid)).toThrow(`Invalid marker selector  <${invalid}>`);
  });
  test('selectKeywords', () => {
    expect(() => getKeywords(invalid, 'data')).toThrow(`Invalid keyword selector <${invalid}>`);
  });
  test('parse', () => {
    expect(() => parse({ data: 'data', type: invalid })).toThrow(`parseObjects: invalid parser type <${invalid}>`);
  });
});

describe('FALSY tests', () => {
  const falsies = [null, undefined, ''];
  falsies.forEach((falsy) => {
    test('selectFormatter', () => {
      expect(() => selectFormatter(falsy, {})).toThrow(`Invalid file extension <${falsy}>`);
    });
    test('selectMarker', () => {
      expect(() => getMarker(falsy)).toThrow(`Invalid marker selector  <${falsy}>`);
    });
    test('selectKeywords', () => {
      expect(() => getKeywords('DELETED', falsy)).toThrow(`required  path not received: <${falsy}>`);
    });
    test('parse', () => {
      expect(() => parse({ data: 'data', type: falsy })).toThrow(`parseObjects: invalid parser type <${falsy}>`);
    });
    test('genDiff', () => {
      expect(() => genDiff(falsy, falsy)).toThrow(`getFileData: invalid filepath <${falsy}>`);
    });
  });
});
