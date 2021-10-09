import fs from 'fs';
import _ from 'lodash';
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
  const firstObj = _.isPlainObject(path1) ? path1 : parseToObject(getFileData(path1));
  const secondObj = _.isPlainObject(path2) ? path2 : parseToObject(getFileData(path2));
  const diffsWithMeta = getDiffs(firstObj, secondObj);

  const diffs = selectFormatter(format, diffsWithMeta);
  console.log(diffs);
};

export default genDiff;
