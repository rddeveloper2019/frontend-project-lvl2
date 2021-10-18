// import _ from 'lodash';
import getFileData from './getFileData.js';
import getDiffs from './getDiffs.js';
import selectFormatter from './formatters/index.js';
import parse from './parsers.js';

const genDiff = (path1, path2, format = 'stylish') => {
  const fileData1 = getFileData(path1);
  const fileData2 = getFileData(path2);

  const firstObj = parse(fileData1);
  const secondObj = parse(fileData2);

  const diffsWithMeta = getDiffs(firstObj, secondObj);
  const diffs = selectFormatter(format, diffsWithMeta);

  return diffs;
};

export default genDiff;
