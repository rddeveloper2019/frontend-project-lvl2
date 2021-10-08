import _ from 'lodash';

const getDiffs = (objectBefore, objectAfter) => {
  const obj1 = _.isPlainObject(objectBefore) ? _.cloneDeep(objectBefore) : {};
  const obj2 = _.isPlainObject(objectAfter) ? _.cloneDeep(objectAfter) : {};
  const keys = _.sortBy(_.union(_.keys(objectBefore), _.keys(objectAfter)));
  const valuesWithMeta = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return {
        itemName: key,
        itemValue: obj2[key],
        status: 'ADDED',
      };
    }
    if (!_.has(obj2, key)) {
      return {
        itemName: key,
        itemValue: obj1[key],
        status: 'DELETED',
      };
    }

    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        itemName: key,
        status: 'HAS_CHILDREN',
        children: getDiffs(obj1[key], obj2[key]),
      };
    }

    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        itemName: key,
        itemValue: obj2[key],
        oldValue: obj1[key],
        status: 'MODIFIED',
      };
    }

    return {
      itemName: key,
      itemValue: obj1[key],
      status: 'SIMILAR',

    };
  });

  const result = _.chain(valuesWithMeta).flatten().value();
  // console.log(JSON.stringify(result));
  return result;
};

export default getDiffs;
