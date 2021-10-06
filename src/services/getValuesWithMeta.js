import _ from 'lodash';

const checkValueType = (data) => {
  if (_.isPlainObject(data)) return { type: 'Object', nodeType: 'Node' };
  if (_.isArray(data)) return { type: 'Simple', nodeType: 'List' };
  return { type: 'Simple', nodeType: 'List' };
};

const setMeta = (key, value, status, nestingLevel, children = [], oldValue = [], newValueStatus = '') => ({
  key,
  value,
  oldValue,
  nestingLevel,
  status,
  newValueStatus,
  children,
  elementType: checkValueType(value).type,
  nodeType: checkValueType(value).nodeType,
}

);

const getValuesWithMeta = (obj1, obj2, nestingLevel = 1) => {
  const firstObj = _.isPlainObject(obj1) ? _.cloneDeep(obj1) : {};
  const secondObj = _.isPlainObject(obj2) ? _.cloneDeep(obj2) : {};
  const allKeys = _.sortBy(_.union(_.keys(firstObj), _.keys(secondObj)));

  const valuesWithMeta = allKeys.map((key) => {
    const children = getValuesWithMeta(firstObj[key], secondObj[key], nestingLevel + 1) || [];
    const nodeType1 = checkValueType(firstObj[key]).nodeType;
    const nodeType2 = checkValueType(secondObj[key]).nodeType;
    const type1 = checkValueType(firstObj[key]).type === 'Array';
    const type2 = checkValueType(secondObj[key]).type === 'Array';

    // ^ setMeta (key, value, status, nestingLevel,
    // ^          children = [], oldValue = [], newValueStatus = '')

    if (!_.has(firstObj, key)) {
      return setMeta(key, secondObj[key], 'ADDED', nestingLevel, children);
    }
    if (!_.has(secondObj, key)) {
      return setMeta(key, firstObj[key], 'DELETED', nestingLevel, children);
    }
    if (_.isEqual(firstObj[key], secondObj[key])) {
      return setMeta(key, firstObj[key], 'SIMILAR', nestingLevel, children);
    }
    if (nodeType1 !== nodeType2 || type1 === 'Array' || type2 === 'Array') {
      return [setMeta(key, firstObj[key], 'DELETED', nestingLevel, children),
        setMeta(key, secondObj[key], 'ADDED', nestingLevel, children)].flat();
    }
    return setMeta(key, secondObj[key], 'CORRECTED', nestingLevel, children, firstObj[key], 'UPDATED');
  });

  const result = _.chain(valuesWithMeta).flatten().value();
  return result;
};

export default getValuesWithMeta;
