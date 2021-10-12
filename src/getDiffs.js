import _ from 'lodash';

const getDiffs = (objectBefore, objectAfter) => {
  const obj1 = _.isPlainObject(objectBefore) ? objectBefore : {};
  const obj2 = _.isPlainObject(objectAfter) ? objectAfter : {};
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
        status: 'SUBOBJECTS',
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

  return valuesWithMeta;
};

export default getDiffs;
