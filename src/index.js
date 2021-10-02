import _ from 'lodash';

const getResultString = (separatedArray) => {
  const temp = [];
  _.cloneDeep(separatedArray).forEach((item) => {
    if (Array.isArray(item[0])) {
      item.forEach((el) => temp.push(el));
      return;
    }
    temp.push(item);
  });

  let resultString = '{\n';
  _.sortBy(temp, (el) => el[1]).forEach((element) => {
    resultString += `  ${element[0]} ${element[1]}: ${element[2]}\n`;
  });
  resultString += '}';

  return resultString;
};

const getSeparatedByKey = (firstObj, secondObj, key) => {
  if (!_.has(firstObj, key) && _.has(secondObj, key)) {
    return ['+', key, secondObj[key]];
  }

  if (_.has(firstObj, key) && !_.has(secondObj, key)) {
    return ['-', key, firstObj[key]];
  }

  if (_.isEqual(firstObj[key], secondObj[key])) {
    return [' ', key, firstObj[key]];
  }

  return [
    ['-', key, firstObj[key]],
    ['+', key, secondObj[key]],
  ];
};

const genDiff = (first, second) => {
  const firstObj = !first ? {} : JSON.parse(first);
  const secondObj = !second ? {} : JSON.parse(second);
  const allKeys = Object.keys(
    Object.assign(_.cloneDeep(firstObj), _.cloneDeep(secondObj)),
  );

  const separated = [];
  allKeys.forEach((key) => {
    separated.push(getSeparatedByKey(firstObj, secondObj, key));
  });
  const difference = getResultString(separated);

  console.log(difference);
  return difference;
};

export default genDiff;
