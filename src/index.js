// import fs from 'fs';
import parseToObject from './services/parseToObject.js';
import separateByMatchs from './services/separateByMatchs.js';
import stringifyResult from './services/stringifyResult.js';

const genDiff = (firstFile = {}, secondFile = {}) => {
  const firstObj = parseToObject(firstFile);
  const secondObj = parseToObject(secondFile);

  const separatedData = separateByMatchs(firstObj, secondObj, 1);
  const summaryOfDifferences = stringifyResult(separatedData);

  // fs.writeFile('newfile.txt', summaryOfDifferences, (err) => {
  //   if (err) throw err;
  //   console.log('File is created successfully.');
  // });

  return summaryOfDifferences;
};

export default genDiff;
