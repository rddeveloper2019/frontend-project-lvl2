import _ from 'lodash';
import getNodeType from './getNodeType.js';

const setMeta = (key = '', value, status, depth, children = [], nodes = '', oldValue = [], additional = '') => {
  const meta = {
    key,
    value,
    nodeList: [...nodes],
    oldValue,
    depth,
    status,
    additional,
    children,
    elementType: getNodeType(value).type,
    nodeType: getNodeType(value).nodeType,
  };

  return meta;
};

const getDiffsWithMeta = (obj1, obj2, depth = 1, prevNodes = []) => {
  const firstObj = _.isPlainObject(obj1) ? _.cloneDeep(obj1) : {};
  const secondObj = _.isPlainObject(obj2) ? _.cloneDeep(obj2) : {};
  const allKeys = _.sortBy(_.union(_.keys(firstObj), _.keys(secondObj)));
  const nodeList = [...prevNodes];

  const valuesWithMeta = allKeys.map((key) => {
    const setNodes = (status) => [...nodeList, { key: status }];

    const setChildren = (status) => getDiffsWithMeta(firstObj[key], secondObj[key], depth + 1, setNodes(status)) || [];

    const nodeType1 = getNodeType(firstObj[key]).nodeType;
    const nodeType2 = getNodeType(secondObj[key]).nodeType;

    if (!_.has(firstObj, key)) {
      return setMeta(key, secondObj[key], 'ADDED', depth, setChildren('ADDED'), setNodes('ADDED'));
    }
    if (!_.has(secondObj, key)) {
      return setMeta(key, firstObj[key], 'DELETED', depth, setChildren('DELETED'), setNodes('DELETED'));
    }
    if (_.isEqual(firstObj[key], secondObj[key])) {
      return setMeta(key, firstObj[key], 'SIMILAR', depth, setChildren('SIMILAR'), setNodes('SIMILAR'));
    }
    if (nodeType1 !== nodeType2) {
      return [setMeta(key, firstObj[key], 'DELETED', depth, setChildren('DELETED'), setNodes('DELETED'), [], 'MODIFIED'),
        setMeta(key, secondObj[key], 'ADDED', depth, setChildren('ADDED'), setNodes('ADDED'), [], 'MODIFIED')].flat();
    }
    return setMeta(key, secondObj[key], 'UPDATED', depth, setChildren('UPDATED'), setNodes('UPDATED'), firstObj[key], 'PATCHED');
  });

  const result = _.chain(valuesWithMeta).flatten().value();
  // console.log(JSON.stringify(result));
  return result;
};

export default getDiffsWithMeta;
