// import fs from 'fs';
import parseToObject from './services/parseToObject.js';
import getValuesWithMeta from './services/getValuesWithMeta.js';
import stylish from './stylizers/stylish.js';

const genDiff = (firstFile = {}, secondFile = {}) => {
  const firstObj = parseToObject(firstFile);
  const secondObj = parseToObject(secondFile);

  const valuesWithMeta = getValuesWithMeta(firstObj, secondObj);
  const result = stylish(valuesWithMeta);
  console.log(result);
  // separateByMatchs(firstObj, secondObj);

  // const summaryOfDifferences = stringifyResult(separatedData);

  // fs.writeFile('newfile.txt', summaryOfDifferences, (err) => {
  //   if (err) throw err;
  //   console.log('File is created successfully.');
  // });
  // console.log(separatedData);
  // return summaryOfDifferences;
};

export default genDiff;
