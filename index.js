import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './src/services/parsers.js';
import getDiffs from './src/getDiffs.js';
import selectFormatter from './src/formatters/index.js';

const getFileData = (filepath) => {
  if (!filepath) throw new Error(`getFileData: invalid filepath <${filepath}>`);
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
  const firstObj = _.isPlainObject(path1) ? path1 : parse(getFileData(path1));
  const secondObj = _.isPlainObject(path2) ? path2 : parse(getFileData(path2));

  const diffsWithMeta = getDiffs(firstObj, secondObj);
  const diffs = selectFormatter(format, diffsWithMeta);

  return diffs;
};

export default genDiff;
