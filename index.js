import fs from 'fs';
import path from 'path';
import stylish from './src/stylizers/stylish.js';
import parseToObject from './src/services/parseToObject.js';
import getValuesWithMeta from './src/services/getValuesWithMeta.js';

const getFileData = (filepath) => {
  const filePathB = path.resolve(filepath);

  return {
    data: fs.readFileSync(filePathB, 'utf-8', (err, data) => {
      if (err) return err;
      return data;
    }),
    type: path.extname(filepath),
  };
};

const stylize = (style, data) => {
  switch (style) {
    case ('stylish'):
      return stylish(data);
    default:
      return 'Unknown format';
  }
};

const genDiff = (path1, path2, style = 'stylish') => {
  const firstObj = parseToObject(getFileData(path1));
  const secondObj = parseToObject(getFileData(path2));
  const diffsWithMeta = getValuesWithMeta(firstObj, secondObj);

  return stylize(style, diffsWithMeta);
};

export default genDiff;
