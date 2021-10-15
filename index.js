// import _ from 'lodash';
import getFileData from './src/getFileData.js';
import getDiffs from './src/getDiffs.js';
import selectFormatter from './src/formatters/index.js';

const genDiff = (path1, path2, format = 'stylish') => {
  const firstObj = getFileData(path1);
  const secondObj = getFileData(path2);
  const diffsWithMeta = getDiffs(firstObj, secondObj);
  const diffs = selectFormatter(format, diffsWithMeta);

  return diffs;
};

export default genDiff;
