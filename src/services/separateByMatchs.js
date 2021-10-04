import _ from 'lodash';

const mtrx = (key, value, status, nestingLevel) => ({
  data: [key, value],
  status,
  nestingLevel,
});

const separateByMatchs = (obj1, obj2, nestingLevel) => {
  const firstObj = _.isPlainObject(obj1) ? _.cloneDeep(obj1) : {};
  const secondObj = _.isPlainObject(obj2) ? _.cloneDeep(obj2) : {};
  const allKeys = _.union(_.keys(firstObj), _.keys(secondObj));
  const separated = [];

  allKeys.forEach((key) => {
    if (_.isPlainObject(firstObj[key]) || _.isPlainObject(secondObj[key])) {
      separated.push(separateByMatchs(firstObj[key], secondObj[key], nestingLevel + 1));
    }

    if (!_.has(firstObj, key) && _.has(secondObj, key)) {
      separated.push(mtrx(key, secondObj[key], 'right', nestingLevel));
      return;
    }

    if (_.has(firstObj, key) && !_.has(secondObj, key)) {
      separated.push(mtrx(key, firstObj[key], 'left', nestingLevel));
      return;
    }

    if (_.isEqual(firstObj[key], secondObj[key])) {
      separated.push(mtrx(key, firstObj[key], 'both', nestingLevel));
      return;
    }
    separated.push(mtrx(key, firstObj[key], 'left', nestingLevel));
    separated.push(mtrx(key, secondObj[key], 'right', nestingLevel));
  });

  // ^ Sort by key name

  return _.chain(separated).sortBy((el) => el.data[0]).value();
};

export default separateByMatchs;
