import parseToObject from './services/parseToObject.js';
import separateByMatchs from './services/separateByMatchs.js';
import stringifyResult from './services/stringifyResult.js';

const genDiff = (firstFile, secondFile) => {
  const firstObj = parseToObject(firstFile);
  const secondObj = parseToObject(secondFile);

  const separatedData = separateByMatchs(firstObj, secondObj, 1);
  const stringifiedData = stringifyResult(separatedData);

  return stringifiedData;
};

export default genDiff;
