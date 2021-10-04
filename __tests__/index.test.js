import path, { dirname } from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff JSON test', () => {
  const fileA = readFile('a.json');
  const fileB = readFile('b.json');
  const noExtNameFile = readFile('noextname');

  test('a.json b.json', () => {
    const result = readFile('testResult');
    expect(genDiff(fileA, fileB)).toEqual(result);
  });

  test('a.json only', () => {
    const result = '{\n- a: only a\n- ab: not similar-a\n- c: similar\n}';
    expect(genDiff(fileA)).toEqual(result);
  });

  test('no-ext-name file', () => {
    const result = '{\n}';
    expect(genDiff(noExtNameFile)).toEqual(result);
  });
});
