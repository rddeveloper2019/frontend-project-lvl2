import path, { dirname } from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
import genDiff from '../index';
import selectFormatter from '../src/formatters/index.js';
import { getMarker, getKeywords } from '../src/services/markers';
import parse from '../src/services/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let fileA;
let fileB;
let result;
const blankObj = {};

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

describe('Blank obj test', () => {
  test('blank objects', () => {
    expect(genDiff(blankObj, blankObj)).toEqual('{\n}');
  });
});

describe('FORMATS & SELECTORS & TYPES tests', () => {
  test('selectFormatter', () => {
    const invalid = 'INVALID';
    expect(() => selectFormatter(invalid, {})).toThrow(`Invalid file extension <${invalid}`);
  });
  test('selectMarker', () => {
    const invalid = 'INVALID';
    expect(() => getMarker(invalid)).toThrow(`Invalid marker selector  <${invalid}>`);
  });
  test('selectKeywords', () => {
    const invalid = 'INVALID';
    expect(() => getKeywords(invalid, 'data')).toThrow(`Invalid keyword selector <${invalid}>`);
  });
  test('parse', () => {
    const invalid = 'INVALID';
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
