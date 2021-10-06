import _ from 'lodash';
import getNodeType from './getNodeType.js';

const setMeta = (key = '', value, status, depth, children = [], oldValue = [], nodes = '', newValueStatus = '') => {
  const meta = {
    key,
    value,
    allNodes: [...nodes],
    oldValue,
    depth,
    status,
    newValueStatus,
    children,
    elementType: getNodeType(value).type,
    nodeType: getNodeType(value).nodeType,
  };

  return meta;
};

const getDiffsWithMeta = (obj1, obj2, depth = 1, parentNodes = []) => {
  const firstObj = _.isPlainObject(obj1) ? _.cloneDeep(obj1) : {};
  const secondObj = _.isPlainObject(obj2) ? _.cloneDeep(obj2) : {};
  const allKeys = _.sortBy(_.union(_.keys(firstObj), _.keys(secondObj)));
  const prevNodes = [...parentNodes];

  const valuesWithMeta = allKeys.map((key) => {
    const nodes = [...prevNodes, key];
    const children = getDiffsWithMeta(firstObj[key], secondObj[key], depth + 1, nodes) || [];
    const nodeType1 = getNodeType(firstObj[key]).nodeType;
    const nodeType2 = getNodeType(secondObj[key]).nodeType;

    if (!_.has(firstObj, key)) {
      return setMeta(key, secondObj[key], 'ADDED', depth, children, nodes);
    }
    if (!_.has(secondObj, key)) {
      return setMeta(key, firstObj[key], 'DELETED', depth, children, nodes);
    }
    if (_.isEqual(firstObj[key], secondObj[key])) {
      return setMeta(key, firstObj[key], 'SIMILAR', depth, children, nodes);
    }
    if (nodeType1 !== nodeType2) {
      return [setMeta(key, firstObj[key], 'DELETED', depth, children, nodes),
        setMeta(key, secondObj[key], 'ADDED', depth, children, nodes)].flat();
    }
    return setMeta(key, secondObj[key], 'UPDATED', depth, children, firstObj[key], nodes, 'PATCH');
  });

  const result = _.chain(valuesWithMeta).flatten().value();
  // console.log(JSON.stringify(result));
  return result;
};

export default getDiffsWithMeta;
