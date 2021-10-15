import fs from 'fs';
import path from 'path';
import parse from './parsers.js';

const getFileData = (filepath) => {
  const filePath = path.resolve(filepath);
  const readData = fs.readFileSync(filePath, 'utf-8');
  const parserType = path.extname(filepath).slice(1);
  return parse(readData, parserType);
};

export default getFileData;
