import fs from 'fs';
import path from 'path';
import parseToObject from './src/services/parseToObject.js';
import getDiffs from './src/services/getDiffs.js';
import selectFormatter from './src/formatters/index.js';

const getFileData = (filepath) => {
  const filePath = path.resolve(filepath);

  return {
    data: fs.readFileSync(filePath, 'utf-8', (err, data) => {
      if (err) return err;
      return data;
    }),
    type: path.extname(filepath),
  };
};

const genDiff = (path1, path2, format = 'stylish') => {
  const firstObj = parseToObject(getFileData(path1));
  const secondObj = parseToObject(getFileData(path2));
  const diffsWithMeta = getDiffs(firstObj, secondObj);
  return selectFormatter(format, diffsWithMeta);
};

export default genDiff;
