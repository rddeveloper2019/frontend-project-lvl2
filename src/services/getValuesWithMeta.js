import _ from 'lodash';

const checkValueType = (data) => {
  if (_.isPlainObject(data)) return { type: 'Object', nodeType: 'Node' };
  if (_.isArray(data)) return { type: 'Simple', nodeType: 'List' };
  return { type: 'Simple', nodeType: 'List' };
};

const setMeta = (key = '', value, status, depth, children = [], oldValue = [], nodes = '', newValueStatus = '') => {
  const meta = {
    key,
    value,
    parentNodes: [...nodes],
    oldValue,
    depth,
    status,
    newValueStatus,
    children,
    elementType: checkValueType(value).type,
    nodeType: checkValueType(value).nodeType,
  };

  return meta;
};

const getValuesWithMeta = (obj1, obj2, depth = 1, parentNode = []) => {
  const firstObj = _.isPlainObject(obj1) ? _.cloneDeep(obj1) : {};
  const secondObj = _.isPlainObject(obj2) ? _.cloneDeep(obj2) : {};
  const allKeys = _.sortBy(_.union(_.keys(firstObj), _.keys(secondObj)));
  const prevNodes = [...parentNode];

  const valuesWithMeta = allKeys.map((key) => {
    const nodes = [...prevNodes, key];
    const children = getValuesWithMeta(firstObj[key], secondObj[key], depth + 1, nodes) || [];
    const nodeType1 = checkValueType(firstObj[key]).nodeType;
    const nodeType2 = checkValueType(secondObj[key]).nodeType;
    const type1 = checkValueType(firstObj[key]).type === 'Array';
    const type2 = checkValueType(secondObj[key]).type === 'Array';

    // ^ setMeta (key, value, status, depth,
    // ^          children = [], oldValue = [], newValueStatus = '')

    if (!_.has(firstObj, key)) {
      return setMeta(key, secondObj[key], 'ADDED', depth, children, prevNodes);
    }
    if (!_.has(secondObj, key)) {
      return setMeta(key, firstObj[key], 'DELETED', depth, children, prevNodes);
    }
    if (_.isEqual(firstObj[key], secondObj[key])) {
      return setMeta(key, firstObj[key], 'SIMILAR', depth, children, prevNodes);
    }
    if (nodeType1 !== nodeType2 || type1 === 'Array' || type2 === 'Array') {
      return [setMeta(key, firstObj[key], 'DELETED', depth, children, prevNodes),
        setMeta(key, secondObj[key], 'ADDED', depth, children, prevNodes)].flat();
    }
    return setMeta(key, secondObj[key], 'CORRECTED', depth, children, firstObj[key], prevNodes, 'UPDATED');
  });

  const result = _.chain(valuesWithMeta).flatten().value();
  // console.log(JSON.stringify(result));
  return result;
};

export default getValuesWithMeta;
